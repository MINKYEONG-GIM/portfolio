import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { PROFILE } from "@/data/projects";

export const metadata: Metadata = {
  title: {
    default: `${PROFILE.name} Portfolio`,
    template: `%s · ${PROFILE.name} Portfolio`
  },
  description: PROFILE.tagline
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen font-sans">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
