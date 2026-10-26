import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { PROFILE } from "@/data/projects";

export const metadata: Metadata = {
  title: {
    default: "프로젝트 리스트",
    template: "%s · 프로젝트 리스트"
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
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
