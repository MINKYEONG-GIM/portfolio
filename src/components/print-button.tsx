"use client";

import { FileDown } from "lucide-react";

/** 브라우저 인쇄 창을 열어 PDF 로 저장하게 합니다. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-extrabold text-paper transition hover:opacity-85"
    >
      <FileDown className="h-4 w-4" />
      {label}
    </button>
  );
}
