"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const PROJECT_PREFIX = "/projects/";

/**
 * 메인에 지금 보이는 프로젝트의 slug.
 * - 상세 페이지면 그 프로젝트.
 * - 홈처럼 카드가 여러 장 보이면 화면 가운데에 가장 가까운 카드([data-project-slug]).
 * 왼쪽 목차와 오른쪽 타임라인이 같은 값을 써서 같은 항목을 강조합니다.
 */
export function useActiveProject(): string | null {
  const pathname = usePathname();
  const routeActive = pathname.startsWith(PROJECT_PREFIX) ? decodeURIComponent(pathname.slice(PROJECT_PREFIX.length)) : null;
  const [inView, setInView] = useState<string | null>(null);

  useEffect(() => {
    if (routeActive) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-project-slug]"));
    if (cards.length === 0) {
      setInView(null);
      return;
    }
    let frame = 0;
    const pick = () => {
      frame = 0;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      let best: { slug: string; distance: number } | null = null;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= window.innerHeight || r.right <= 0 || r.left >= window.innerWidth) continue;
        const ex = Math.min(Math.max(cx, r.left), r.right);
        const ey = Math.min(Math.max(cy, r.top), r.bottom);
        const distance = Math.hypot(ex - cx, ey - cy);
        if (!best || distance < best.distance) best = { slug: card.dataset.projectSlug ?? "", distance };
      }
      setInView(best?.slug ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    pick();
    // 세로 스크롤과 캐러셀의 가로 스크롤을 모두 잡습니다.
    document.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      document.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname, routeActive]);

  return routeActive ?? inView;
}

/** 강조된 항목이 사이드바 밖에 있으면 사이드바 안에서만 살짝 스크롤합니다. (넓은 화면에서만) */
export function useRevealActive(container: React.RefObject<HTMLElement | null>, active: string | null) {
  useEffect(() => {
    if (!active || !window.matchMedia("(min-width: 1024px)").matches) return;
    const el = container.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [container, active]);
}
