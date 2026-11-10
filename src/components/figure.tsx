"use client";

import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProjectImage } from "@/data/projects";

/** 설명 글이 달린 그림 한 장. 클릭하면 화면 가득 확대해서 보여 줍니다. */
export function Figure({ image, priority = false }: { image: ProjectImage; priority?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <figure className={`overflow-hidden rounded-2xl border border-line bg-surface ${image.height > image.width * 1.2 ? "mx-auto w-full max-w-xl" : ""}`}>
        <button type="button" onClick={() => setOpen(true)} aria-label={image.alt} className="group relative block w-full cursor-zoom-in">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1152px) 1120px, 100vw"
            priority={priority}
            className="h-auto w-full"
          />
          <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper opacity-80 shadow transition group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>
        {image.caption ? <figcaption className="ko-keep border-t border-line px-5 py-3 text-sm font-bold text-ink">{image.caption}</figcaption> : null}
      </figure>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={image.caption ?? image.alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center gap-3 bg-black/85 p-3 sm:p-6"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={typeof document !== "undefined" && document.documentElement.lang === "en" ? "Close" : "닫기"}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            quality={90}
            className="h-auto max-h-[86vh] w-auto max-w-full rounded-lg bg-white object-contain"
          />
          {image.caption ? <p className="ko-keep max-w-4xl text-center text-sm font-bold leading-6 text-white">{image.caption}</p> : null}
        </div>
      ) : null}
    </>
  );
}
