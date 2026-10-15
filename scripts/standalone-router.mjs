import { spawn } from "node:child_process";
import { createServer, request } from "node:http";

const port = Number(process.env.PORT ?? 3004);
const internalPort = Number(process.env.NEXT_INTERNAL_PORT ?? 3005);
const hostname = process.env.HOSTNAME ?? "0.0.0.0";
const nextServer = spawn(process.execPath, ["server.js"], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: String(internalPort), HOSTNAME: "127.0.0.1" },
  stdio: "inherit",
});

const server = createServer((incoming, outgoing) => {
  const originalUrl = incoming.url ?? "/";
  const rewrittenUrl = originalUrl.replace(
    /^\/(ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi)\/docs(?=\/|\?|$)/,
    "/docs/$1",
  );
  const upstream = request({
    hostname: "127.0.0.1",
    port: internalPort,
    method: incoming.method,
    path: rewrittenUrl,
    headers: { ...incoming.headers, host: incoming.headers.host ?? `${hostname}:${port}` },
  }, (response) => {
    outgoing.writeHead(response.statusCode ?? 502, response.headers);
    response.pipe(outgoing);
  });
  upstream.on("error", () => {
    if (!outgoing.headersSent) outgoing.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    outgoing.end("Application server unavailable");
  });
  incoming.pipe(upstream);
});

server.listen(port, hostname);

function shutdown() {
  server.close();
  nextServer.kill("SIGTERM");
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
nextServer.on("exit", (code) => {
  if (code !== null && code !== 0) process.exitCode = code;
  server.close();
});
