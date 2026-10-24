import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("mobile layout", () => {
  it("keeps the document catalog, editor, and locale controls within a narrow viewport", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain(".site-header{height:60px;padding:0 12px;gap:9px;justify-content:flex-start}");
    expect(css).toContain(".site-header>.brand{margin-right:auto}");
    expect(css).toContain(".document-grid{grid-template-columns:1fr;gap:8px}");
    expect(css).toContain(".workspace{grid-template-columns:1fr;gap:12px}");
    expect(css).toContain(".related-grid{grid-template-columns:1fr}");
    expect(css).toContain(".language-picker select{width:140px;max-width:140px");
    expect(css).toContain(".repeating-table-scroll{max-width:100%;overflow-x:auto}");
  });
});
