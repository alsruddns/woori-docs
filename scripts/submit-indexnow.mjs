import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tsImport } from "tsx/esm/api";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";
export const SITE_ORIGIN = "https://www.woori.today";
export const INDEXNOW_HOST = "www.woori.today";
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const registryPath = "src/lib/registry.ts";

const { documents, locales } = await tsImport("../src/lib/registry.ts", import.meta.url);
const { docsUrl } = await tsImport("../src/lib/urls.ts", import.meta.url);

function getIndexNowKey() {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key) throw new Error("INDEXNOW_KEY is required");
  return key;
}

function gitOutput(...args) {
  return execFileSync("git", args, { cwd: projectRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

export function createIndexNowUrls(definitions = documents, changedSlugs = null) {
  const publicDocs = definitions.filter(({ isPublic }) => isPublic);
  const selectedDocs = changedSlugs === null ? publicDocs : publicDocs.filter(({ slug }) => changedSlugs.has(slug));
  return [...new Set([
    ...locales.map((locale) => docsUrl(locale)),
    ...selectedDocs.flatMap(({ slug, supportedLocales }) => locales.filter((locale) => supportedLocales.includes(locale)).map((locale) => docsUrl(locale, slug))),
  ])];
}

async function getChangedSlugs(baseSha) {
  if (!baseSha) return null;
  try {
    const changedPaths = gitOutput("diff", "--name-only", `${baseSha}...HEAD`).split(/\r?\n/).filter(Boolean);
    const ignoredPaths = [".github/workflows/deploy.yml", "scripts/submit-indexnow.mjs"];
    if (changedPaths.some((path) => path !== registryPath && !ignoredPaths.includes(path))) return null;
    if (!changedPaths.includes(registryPath)) return new Set();

    const previousRoot = await mkdtemp(join(tmpdir(), "woori-docs-indexnow-"));
    try {
      const previousPath = join(previousRoot, registryPath);
      await mkdir(dirname(previousPath), { recursive: true });
      await writeFile(previousPath, gitOutput("show", `${baseSha}:${registryPath}`), "utf8");
      const previousModule = await tsImport(pathToFileURL(previousPath).href, pathToFileURL(join(previousRoot, "indexnow-parent.mjs")).href);
      const metadata = ({ slug, category, title, description, keywords, isPublic, supportedLocales }) =>
        JSON.stringify({ slug, category, title, description, keywords, isPublic, supportedLocales });
      const previousBySlug = new Map(previousModule.documents.map((doc) => [doc.slug, metadata(doc)]));
      return new Set(documents.filter((doc) => previousBySlug.get(doc.slug) !== metadata(doc)).map(({ slug }) => slug));
    } finally {
      await rm(previousRoot, { recursive: true, force: true });
    }
  } catch (error) {
    console.warn(`Could not compare the registry with ${baseSha}; submitting all public documents.`, error.message);
    return null;
  }
}

export async function submitIndexNow({ dryRun = process.env.INDEXNOW_DRY_RUN === "true", baseSha = process.env.INDEXNOW_BASE_SHA } = {}) {
  const changedSlugs = await getChangedSlugs(baseSha);
  const key = getIndexNowKey();
  const body = {
    host: INDEXNOW_HOST,
    key,
    keyLocation: `${SITE_ORIGIN}/${key}.txt`,
    urlList: createIndexNowUrls(documents, changedSlugs),
  };
  if (dryRun) {
    console.log(JSON.stringify(body, null, 2));
    return body;
  }

  console.log(`Checking IndexNow key file: ${body.keyLocation}`);
  const keyResponse = await fetch(body.keyLocation);
  if (!keyResponse.ok) throw new Error(`IndexNow key file is not reachable: HTTP ${keyResponse.status} ${keyResponse.statusText}`);
  if ((await keyResponse.text()).trim() !== key) throw new Error("IndexNow key file content does not match INDEXNOW_KEY.");

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const details = (await response.text()).trim();
    throw new Error(`IndexNow submission failed: HTTP ${response.status} ${response.statusText}${details ? `: ${details.slice(0, 2000)}` : ""}`);
  }
  console.log(`Submitted ${body.urlList.length} URLs to IndexNow (HTTP ${response.status}).`);
  return body;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  submitIndexNow().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
