import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.woori.today"),
  icons: {
    icon: "/_assets/docs/icon.png",
    apple: "/_assets/docs/apple-icon.png",
  },
  title: { default: "문서양식 | woori.today", template: "%s | 문서양식" },
  description: "브라우저에서 문서 양식을 작성하고 미리보기, 복사, 인쇄할 수 있습니다.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
