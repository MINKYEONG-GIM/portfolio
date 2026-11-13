/**
 * /deck 슬라이드에 프로젝트 내용을 순서대로 채우는 인라인 스크립트.
 * (React 하이드레이션을 기다리지 않고 페이지가 다 불러와지면 바로 실행되도록 일반 <script> 로 넣습니다)
 *
 * 프로젝트마다 숨겨 둔 덩어리(.dk-blk)를 1장 → 2장의 오른쪽 칸(.dk-flow)에 차례로 넣고,
 * 칸이 차면 같은 머리글을 단 다음 장(전체 폭)을 만들어 이어 넣습니다.
 *  - data-wide 덩어리(그림·표·도식)는 좁은 오른쪽 칸에 넣지 않고 전체 폭 장으로 넘깁니다.
 *  - data-head 덩어리(소제목)는 바로 뒤 덩어리와 같은 장에 있도록 함께 넘깁니다.
 * 끝나면 쪽 번호를 매기고 <html data-pdf-ready="1"> 을 붙입니다.
 */
function layoutDeck() {
  const overflows = (region: HTMLElement) => region.scrollHeight > region.clientHeight + 1;
  const isWide = (region: HTMLElement) => region.classList.contains("dk-flow-wide");

  document.querySelectorAll<HTMLElement>(".dk-project").forEach((project) => {
    const pool = project.querySelector<HTMLElement>(".dk-pool");
    const proto = project.querySelector<HTMLElement>(".dk-proto");
    if (!pool || !proto) return;
    const regions = Array.from(project.querySelectorAll<HTMLElement>(".dk-slide:not(.dk-proto) .dk-flow"));
    let lastSlide = (regions[regions.length - 1]?.closest(".dk-slide") as HTMLElement) ?? proto;
    let current = 0;
    const newRegion = () => {
      const slide = proto.cloneNode(true) as HTMLElement;
      slide.classList.remove("dk-proto");
      lastSlide.after(slide);
      lastSlide = slide;
      const region = slide.querySelector<HTMLElement>(".dk-flow")!;
      regions.push(region);
      return region;
    };
    const regionAt = (index: number) => regions[index] ?? newRegion();

    (Array.from(pool.children) as HTMLElement[]).forEach((block) => {
      const wide = block.hasAttribute("data-wide");
      while (wide && !isWide(regionAt(current))) current++;
      let region = regionAt(current);
      region.appendChild(block);
      if (!overflows(region) || region.children.length === 1) return;
      // 다음 장으로: 바로 앞 소제목도 함께
      const carry: HTMLElement[] = [block];
      let prev = block.previousElementSibling as HTMLElement | null;
      while (prev && prev.hasAttribute("data-head") && region.children.length > carry.length) {
        carry.unshift(prev);
        prev = prev.previousElementSibling as HTMLElement | null;
      }
      current++;
      while (wide && !isWide(regionAt(current))) current++;
      region = regionAt(current);
      carry.forEach((item) => region.appendChild(item));
    });
    project.querySelectorAll<HTMLElement>(".dk-slide.dk-cont:not(.dk-proto)").forEach((slide) => {
      if (!slide.querySelector(".dk-flow")?.children.length) slide.remove();
    });
    proto.remove();
    pool.remove();
  });

  document.querySelectorAll<HTMLElement>(".dk-slide").forEach((slide, index) => {
    const no = slide.querySelector(".dk-page-no");
    if (no) no.textContent = String(index + 1).padStart(2, "0");
  });
  const over = Array.from(document.querySelectorAll<HTMLElement>(".dk-flow")).filter(overflows);
  document.documentElement.dataset.deckOverflow = String(over.length);
  document.documentElement.dataset.pdfReady = "1";
}

const SCRIPT = `(function(){var run=${layoutDeck.toString()};function go(){(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){if(!document.documentElement.dataset.pdfReady)run();});}if(document.readyState==="complete")go();else window.addEventListener("load",go);})();`;

export function DeckFlow() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
