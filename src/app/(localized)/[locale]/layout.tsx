import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/template-schema";
import { localeLanguageTags } from "@/lib/urls";
import "../../globals.css";

type LocaleRootLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.woori.today"),
  icons: {
    icon: "/_assets/docs/icon.png",
    apple: "/_assets/docs/apple-icon.png",
  },
  title: { default: "woori.today", template: "%s" },
  robots: { index: true, follow: true },
};

export default async function LocaleRootLayout({ children, params }: LocaleRootLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html lang={localeLanguageTags[locale as Locale]}>
      <body>{children}</body>
    </html>
  );
}
