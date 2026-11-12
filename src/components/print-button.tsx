import { FileDown } from "lucide-react";
import type { Lang } from "@/lib/lang";

/** 미리 만들어 둔 PDF 파일 주소 (npm run pdf 로 다시 만듭니다) */
export function pdfHref(lang: Lang) {
  return `/portfolio-${lang}.pdf`;
}
export const PDF_FILENAME = "MINKYEONG-KIM-portfolio.pdf";

/** 인쇄 창 없이 PDF 파일을 바로 내려받습니다. */
export function PrintButton({ label, lang }: { label: string; lang: Lang }) {
  return (
    <a
      href={pdfHref(lang)}
      download={PDF_FILENAME}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-extrabold text-paper transition hover:opacity-85"
    >
      <FileDown className="h-4 w-4" />
      {label}
    </a>
  );
}
