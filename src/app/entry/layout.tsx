import type { Metadata } from "next";
import type { ReactNode } from "react";

/** 허브는 검색엔진에 노출하지 않고, 공개 포트폴리오의 머리글·꼬리글도 쓰지 않습니다. */
export const metadata: Metadata = {
  title: "Entry",
  robots: { index: false, follow: false, nocache: true }
};

export default function EntryLayout({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-12 sm:px-6">{children}</main>;
}
