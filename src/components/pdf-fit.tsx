"use client";

import { useEffect } from "react";

/**
 * PDF 파일을 만들 때(/print?pdf=1)만 동작합니다.
 * 사람이 문서를 편집하듯 쪽마다 남는 높이를 재서
 *  1) 쪽에 조금 안 들어가는 그림은 줄여서 넣고,
 *  2) 그래도 안 들어가면 그 앞에서 쪽을 나누고,
 *  3) 쪽 아래가 비면 그 쪽의 그림을 키워서 채웁니다.
 * 끝나면 <html data-pdf-ready="1"> 을 붙입니다 (scripts/make-pdf.mjs 가 이 뒤에 저장).
 */

const MM = 96 / 25.4;
/**
 * 가로 A4 에서 위아래 여백(10mm)을 뺀 높이.
 * 화면에서 잰 높이와 실제 인쇄 높이가 한 줄쯤 어긋나는 경우가 있어 40px 을 여유로 남깁니다
 * (여유를 줄이면 쪽 끝의 한두 줄이 다음 쪽으로 넘어가 거의 빈 쪽이 생깁니다).
 */
const PAGE = Math.floor(190 * MM) - 40;
const ATOMIC =
  "figure, tr, li, p, h1, h2, h3, h4, dl, .oy-title, .oy-band, .rounded-2xl, .print-header-2, .print-header-text, .print-header-title, .print-info, .print-groups-2, .print-first";
const HEADING = "h2, h3, h4, .oy-title, .oy-band, thead tr, .print-header-title";
const RECURSE_DISPLAY = new Set(["block", "grid", "table", "table-row-group", "table-header-group", "flow-root"]);

type Box = { top: number; bottom: number };

function box(el: Element): Box {
  const rect = el.getBoundingClientRect();
  return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
}

function visible(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.height > 0.5 && getComputedStyle(el).display !== "none";
}

/** 쪽 사이에서 갈라지면 안 되는 덩어리를 문서 순서대로 모읍니다. */
function collect(parent: Element, out: HTMLElement[]) {
  for (const child of Array.from(parent.children) as HTMLElement[]) {
    // 표의 열 너비 정의(colgroup)는 표 전체 높이로 잡혀 표 통째로 다음 쪽으로 밀리게 하므로 건너뜁니다
    if (child.tagName === "COLGROUP" || child.tagName === "COL") continue;
    if (!visible(child)) continue;
    const style = getComputedStyle(child);
    const multiColumn = style.display === "grid" && style.gridTemplateColumns.trim().split(/\s+/).length > 1;
    if (multiColumn) {
      // 여러 단으로 나뉜 격자: 한 쪽에 들어가면 한 덩어리, 길면 줄(행) 단위로 나눠 따로 다룹니다
      if (child.getBoundingClientRect().height <= PAGE * 0.8 || child.matches(ATOMIC)) out.push(child);
      else splitRows(child).forEach((row) => out.push(row));
      continue;
    }
    if (child.matches(ATOMIC) || !RECURSE_DISPLAY.has(style.display) || child.children.length === 0) {
      out.push(child);
      continue;
    }
    collect(child, out);
  }
}

/** 긴 격자를 줄마다 별도 격자로 쪼개서, 줄 사이에서 쪽을 나눌 수 있게 합니다. */
function splitRows(grid: HTMLElement): HTMLElement[] {
  const rows: HTMLElement[][] = [];
  let lastTop = Number.NEGATIVE_INFINITY;
  for (const item of Array.from(grid.children) as HTMLElement[]) {
    const top = Math.round(item.getBoundingClientRect().top);
    if (Math.abs(top - lastTop) > 2) rows.push([]);
    rows[rows.length - 1].push(item);
    lastTop = top;
  }
  if (rows.length < 2) return [grid];
  const result: HTMLElement[] = [grid];
  let previous = grid;
  for (const row of rows.slice(1)) {
    const clone = grid.cloneNode(false) as HTMLElement;
    clone.removeAttribute("id");
    row.forEach((item) => clone.appendChild(item));
    previous.after(clone);
    clone.style.setProperty("margin-top", "0", "important");
    previous = clone;
    result.push(clone);
  }
  return result;
}

function images(units: HTMLElement[]) {
  return units.flatMap((unit) => Array.from(unit.querySelectorAll<HTMLImageElement>("figure img")));
}

/** 그림마다 지금 높이를 기억해 둡니다 (화면과 인쇄에서 같은 크기가 되도록 픽셀로 고정). */
const sized = new Map<HTMLImageElement, number>();

function setHeight(img: HTMLImageElement, wanted: number) {
  const ratio = Number(img.getAttribute("width")) / Number(img.getAttribute("height")) || img.naturalWidth / img.naturalHeight || 1;
  const frame = img.closest("figure") ?? img.parentElement!;
  const height = Math.floor(Math.min(wanted, frame.clientWidth / ratio));
  img.style.setProperty("height", `${height}px`, "important");
  img.style.setProperty("width", `${Math.floor(height * ratio)}px`, "important");
  img.style.setProperty("max-height", "none", "important");
  sized.set(img, height);
}

/** 쪽 맨 위에 올 요소: 부모의 첫 요소이면 부모까지 올라가 위 여백을 없앱니다. */
function breakBefore(unit: HTMLElement, root: Element) {
  let target = unit;
  while (target.parentElement && target.parentElement !== root) {
    const parent: HTMLElement = target.parentElement;
    const first = (Array.from(parent.children) as HTMLElement[]).find(visible);
    if (first !== target) break;
    target = parent;
  }
  target.style.breakBefore = "page";
  target.style.setProperty("margin-top", "0", "important");
  return target;
}

function paginate(root: HTMLElement) {
  const debug = new URLSearchParams(location.search).has("debug");
  const units: HTMLElement[] = [];
  collect(root, units);

  let pageTop = box(units[0]).top;
  let pageUnits: HTMLElement[] = [];
  const natural = new Map<HTMLImageElement, number>();
  const heightOf = (img: HTMLImageElement) => sized.get(img) ?? img.getBoundingClientRect().height;
  const log: string[] = [];
  let pageNo = 1;

  /** 쪽 아래가 비면 그 쪽의 그림을 키우고, 그래도 남으면 덩어리 사이 간격을 조금씩 넓혀 채웁니다. */
  const fill = () => {
    const spareNow = () => PAGE - (Math.max(...pageUnits.map((unit) => box(unit).bottom)) - pageTop);
    const figs = images(pageUnits);
    for (let round = 0; round < 6 && figs.length; round++) {
      const spare = spareNow();
      if (spare < 14 && spare >= 0) break;
      // 가로로 나란히 놓인 그림은 한 줄로 셉니다
      const rows = new Set(figs.map((img) => Math.round(box(img).top))).size;
      const delta = spare / rows;
      let changed = false;
      for (const img of figs) {
        const now = heightOf(img);
        if (!natural.has(img)) natural.set(img, now);
        const base = natural.get(img)!;
        // 키울 때는 원래 크기의 1.7배까지, 줄일 때는 원래 크기까지만
        const next = delta > 0 ? Math.min(base * 1.7, now + delta) : Math.max(Math.min(base, now), now + delta);
        if (Math.abs(next - now) < 1) continue;
        setHeight(img, next);
        if (Math.abs(heightOf(img) - now) >= 1) changed = true;
      }
      if (!changed) break;
    }
    const spare = spareNow();
    const gaps = pageUnits.slice(1).filter((unit) => unit.tagName !== "TR");
    if (spare > 14 && gaps.length) {
      const extra = Math.min(22, (spare - 6) / gaps.length);
      gaps.forEach((unit) => {
        const current = parseFloat(getComputedStyle(unit).marginTop) || 0;
        unit.style.setProperty("margin-top", `${current + extra}px`, "important");
      });
      // 간격이 겹쳐 계산과 달라져 넘치면 되돌립니다
      if (spareNow() < 0) gaps.forEach((unit) => unit.style.removeProperty("margin-top"));
    }
  };


  for (let index = 0; index < units.length; index++) {
    const unit = units[index];
    if (pageUnits.length === 0) {
      pageTop = box(unit).top;
      pageUnits.push(unit);
      if (unit.matches(".print-first")) pageUnits = []; // 표지는 한 쪽을 통째로 씁니다
      continue;
    }
    const afterCover = units[index - 1]?.matches(".print-first");

    // 목차·전체 요약·프로젝트마다 새 쪽에서 시작합니다 (제목과 내용이 늘 같은 쪽에서 시작)
    const sectionOf = (el: Element) => el.closest(".print-page");
    if (!afterCover && sectionOf(unit) !== sectionOf(units[index - 1])) {
      fill();
      log.push(`p${pageNo}:${Math.round(((Math.max(...pageUnits.map((u) => box(u).bottom)) - pageTop) / PAGE) * 100)}`);
      pageNo++;
      const target = breakBefore(unit, root);
      pageTop = box(target).top;
      pageUnits = [unit];
      continue;
    }

    let fits = !afterCover && box(unit).bottom - pageTop <= PAGE;

    // 조금 넘치면 이 쪽의 그림들을 줄여서 같은 쪽에 넣어 봅니다
    if (!fits && !afterCover) {
      const figs = images([...pageUnits, unit]);
      const over = box(unit).bottom - pageTop - PAGE;
      if (figs.length) {
        const before = figs.map(heightOf);
        figs.forEach((img, i) => {
          if (!natural.has(img)) natural.set(img, before[i]);
        });
        const rows = new Set(figs.map((img) => Math.round(box(img).top))).size;
        const cut = over / rows + 2;
        const ok = figs.every((img, i) => before[i] - cut >= Math.max(natural.get(img)! * 0.6, 130));
        if (ok) {
          figs.forEach((img, i) => setHeight(img, before[i] - cut));
          fits = box(unit).bottom - pageTop <= PAGE;
          if (!fits) figs.forEach((img, i) => setHeight(img, before[i]));
        }
      }
    }

    // 쪽에 제목만 있는 상태라면 제목만 남기고 나누지 않습니다 (제목과 본문은 같은 쪽에)
    if (!fits && !afterCover && pageUnits.every((item) => item.matches(HEADING))) {
      // 그림을 옆 글 높이까지 줄여 봅니다 (더 줄여도 덩어리 높이가 줄지 않으면 멈춤)
      for (const img of images([unit])) {
        if (!natural.has(img)) natural.set(img, heightOf(img));
        while (box(unit).bottom - pageTop > PAGE && heightOf(img) - 16 >= natural.get(img)! * 0.5) {
          const before = box(unit).bottom;
          setHeight(img, heightOf(img) - 16);
          if (box(unit).bottom >= before - 1) break;
        }
      }
      fits = true;
    }

    if (fits) {
      pageUnits.push(unit);
      continue;
    }

    // 제목만 쪽 아래에 남지 않게, 제목 앞에서 나눕니다
    let start = index;
    // 프로젝트 끝의 한 줄 안내만 빈 쪽에 혼자 남지 않게, 바로 앞 덩어리와 함께 넘깁니다
    if (unit.matches(".print-note") && pageUnits.length > 1 && pageUnits[pageUnits.length - 1] === units[index - 1]) {
      pageUnits.pop();
      start--;
    }
    while (start > 0 && pageUnits.length > 1 && units[start - 1].matches(HEADING) && pageUnits[pageUnits.length - 1] === units[start - 1]) {
      pageUnits.pop();
      start--;
    }
    // 작은 섹션(예: 역할과 기여)이 두 쪽으로 갈라지면, 섹션 제목부터 통째로 다음 쪽으로 넘깁니다
    if (!afterCover) {
      const section = units[start].closest("section");
      if (section && root.contains(section) && !section.matches(".print-page")) {
        const first = pageUnits.findIndex((item) => section.contains(item));
        const sectionBox = box(section);
        const keepsEnough = first > 0 && box(pageUnits[first - 1]).bottom - pageTop >= PAGE * 0.6;
        if (first > 0 && keepsEnough && sectionBox.bottom - sectionBox.top <= PAGE * 0.42) {
          start -= pageUnits.length - first;
          pageUnits.length = first;
        }
      }
    }
    if (!afterCover) fill();
    if (debug) log.push(`[${pageUnits.map((u) => `${u.tagName}.${(u.className.toString().split(" ")[0] || "")}:${Math.round(box(u).top - pageTop)}-${Math.round(box(u).bottom - pageTop)}`).join(",")}]`);
    log.push(`p${pageNo}:${Math.round(((Math.max(...pageUnits.map((u) => box(u).bottom)) - pageTop) / PAGE) * 100)}`);
    pageNo++;
    const target = breakBefore(units[start], root);
    if (debug) {
      const mark = document.createElement("div");
      mark.textContent = `▶ p${pageNo} (앞쪽 ${log[log.length - 1]}) ${units[start].tagName}.${units[start].className.toString().slice(0, 40)} → ${target.tagName} parent:${getComputedStyle(target.parentElement!).display}`;
      mark.style.cssText = "position:absolute;font:10px monospace;color:#c00;white-space:nowrap;background:#ff0";
      target.prepend(mark);
    }
    pageTop = box(target).top;
    pageUnits = units.slice(start, index + 1);
  }
  fill();
  document.documentElement.dataset.pdfLog = log.join(" ");
}

export function PdfFit() {
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const root = document.querySelector<HTMLElement>(".print-root");
      if (!root) return;
      // 인쇄 때의 쪽 너비(297mm - 좌우 여백 22mm)와 똑같이 맞춰 놓고 잽니다
      root.style.width = "275mm";
      root.style.margin = "0";
      document.body.style.margin = "0";
      const imgs = Array.from(document.images);
      imgs.forEach((img) => {
        img.loading = "eager";
      });
      await Promise.all(
        imgs.map((img) => (img.complete && img.naturalWidth > 0 ? null : new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; })))
      );
      // 인쇄할 때 다른 해상도 파일로 바뀌어 빠지는 일이 없도록, 지금 불러온 파일로 고정합니다
      const figs = Array.from(document.querySelectorAll<HTMLImageElement>("figure img"));
      await Promise.all(
        figs.map((img) => {
          const current = img.currentSrc || img.src;
          img.removeAttribute("srcset");
          img.removeAttribute("sizes");
          if (img.src === current) return null;
          return new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; img.src = current; });
        })
      );
      figs.forEach((img) => {
        const limit = parseFloat(getComputedStyle(img).maxHeight);
        setHeight(img, Number.isFinite(limit) ? limit : 104 * MM);
      });
      await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (cancelled) return;
      try {
        paginate(root);
      } finally {
        document.documentElement.dataset.pdfReady = "1";
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
