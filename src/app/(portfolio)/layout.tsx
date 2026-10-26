import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { getContent } from "@/data/content";
import { getLang } from "@/lib/lang";

/** 공개 포트폴리오(서비스기획) 화면의 공통 틀. 허브로 가는 링크는 어디에도 두지 않습니다. */
export default async function PortfolioLayout({ children }: { children: ReactNode }) {
  const lang = await getLang();
  const { parts, profile, projects } = getContent(lang);
  return (
    <>
      <SiteHeader lang={lang} parts={parts} projectCount={projects.length} profileName={profile.name} tagline={profile.tagline} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      <SiteFooter lang={lang} profileName={profile.name} tagline={profile.tagline} />
    </>
  );
}
