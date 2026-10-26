import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { t } from "@/data/i18n";
import { getContent } from "@/data/content";
import { getLang } from "@/lib/lang";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const ui = t(lang);
  return {
    title: { default: ui.siteTitle, template: `%s · ${ui.siteTitle}` },
    description: getContent(lang).profile.tagline
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
