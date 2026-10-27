import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("mobile layout", () => {
  it("keeps the document catalog, editor, and locale controls within a narrow viewport", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    expect(css).toContain("@media(max-width:700px)");
    expect(css).toContain(".site-header{display:grid;grid-template-columns:minmax(0,1fr) 36px minmax(0,min(190px,42vw));gap:14px;justify-content:initial}");
    expect(css).toContain(".site-header{display:grid;grid-template-columns:minmax(0,1fr) 36px 140px;height:60px;padding:0 12px;gap:9px;justify-content:initial}");
    expect(css).toContain(".site-header>.brand{margin-right:0}");
    expect(css).toContain(".language-picker{width:140px;min-width:0}");
    expect(css).toContain(".document-grid{grid-template-columns:1fr;gap:8px}");
    expect(css).toContain(".workspace{grid-template-columns:1fr;gap:12px}");
    expect(css).toContain(".related-grid{grid-template-columns:1fr}");
    expect(css).toContain(".language-picker select{display:block;width:100%;min-width:0;max-width:100%");
    expect(css).toContain(".repeating-table-scroll{max-width:100%;overflow-x:auto}");
    expect(css).toContain(".sidebar.docs-sidebar{position:fixed;inset:0 auto 0 0");
    expect(css).toContain("width:min(340px,calc(100vw - 48px))");
    expect(css).toContain(".docs-sidebar.drawer-open{transform:translateX(0)}");
    expect(css).toContain(".sidebar.docs-sidebar{visibility:hidden;pointer-events:none}.sidebar.docs-sidebar.drawer-open{visibility:visible;pointer-events:auto}");
    expect(css).toContain(".template-field-grid{grid-template-columns:minmax(0,1fr);gap:10px}");
    expect(css).toContain("@media(max-width:380px){.brand img{width:88px}.brand span{display:none}}");
  });
});
