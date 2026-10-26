"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLang } from "@/app/actions";
import type { Lang } from "@/lib/lang";

/** KO | EN 전환. 쿠키를 바꾸고 현재 화면을 다시 그립니다. */
export function LangToggle({ lang }: { lang: Lang }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(next: Lang) {
    if (next === lang) return;
    startTransition(async () => {
      await setLang(next);
      router.refresh();
    });
  }

  return (
    <div className="inline-flex border border-line text-xs font-black" role="group" aria-label="Language">
      {(["ko", "en"] as Lang[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => choose(option)}
          disabled={pending}
          aria-pressed={option === lang}
          className={`px-2.5 py-1.5 transition ${option === lang ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
