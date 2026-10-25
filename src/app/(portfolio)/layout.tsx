import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";

/** 공개 포트폴리오(서비스기획) 화면의 공통 틀. 허브로 가는 링크는 어디에도 두지 않습니다. */
export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <SiteFooter />
    </>
  );
}
