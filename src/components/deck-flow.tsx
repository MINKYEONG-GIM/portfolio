/**
 * /deck 슬라이드에 프로젝트 내용을 채우는 인라인 스크립트.
 * (React 하이드레이션을 기다리지 않고 페이지가 다 불러와지면 바로 실행되도록 일반 <script> 로 넣습니다)
 *
 * 모든 프로젝트가 같은 순서: 표지 → 개요 → 상세 내용(최대 DETAIL_LIMIT 장) → 부록
 *  - 개요: .dk-pool-ov 덩어리를 개요 장 오른쪽 칸에 넣고, 넘치면 글자를 조금씩 줄입니다.
 *  - 상세 내용: .dk-pool-detail 덩어리를 2단(왼쪽 → 오른쪽) 장에 차례로 넣고, 칸이 차면 다음 장을 만듭니다.
 *    data-head 덩어리(소제목)는 바로 뒤 덩어리와 같은 칸에 있도록 함께 넘깁니다.
 *    장 수가 넘치면 data-fit 단계를 올려(그림·간격·글자를 줄여) 처음부터 다시 배치합니다.
 * 끝나면 쪽 번호를 매기고 <html data-pdf-ready="1"> 을 붙입니다.
 */
function layoutDeck() {
  const DETAIL_LIMIT = 2;
  const LEVELS = 6;
  const overflows = (region: HTMLElement) => region.scrollHeight > region.clientHeight + 1;

  const fits: string[] = [];
  document.querySelectorAll<HTMLElement>(".dk-project").forEach((project) => {
    const proto = project.querySelector<HTMLElement>(".dk-proto");
    const overview = project.querySelector<HTMLElement>(".dk-slide:not(.dk-pcover):not(.dk-proto):not(.dk-appendix)");
    const ovPool = project.querySelector<HTMLElement>(".dk-pool-ov");
    const pool = project.querySelector<HTMLElement>(".dk-pool-detail");
    if (!proto || !overview || !ovPool || !pool) return;

    // 상세 내용
    const blocks = Array.from(pool.children) as HTMLElement[];
    const layout = () => {
      blocks.forEach((block) => pool.appendChild(block));
      project.querySelectorAll(".dk-clone").forEach((slide) => slide.remove());
      const regions: HTMLElement[] = [];
      let lastSlide = overview;
      let current = 0;
      const regionAt = (index: number) => {
        while (!regions[index]) {
          const slide = proto.cloneNode(true) as HTMLElement;
          slide.classList.remove("dk-proto");
          slide.classList.add("dk-clone");
          lastSlide.after(slide);
          lastSlide = slide;
          regions.push(...Array.from(slide.querySelectorAll<HTMLElement>(".dk-flow")));
        }
        return regions[index];
      };
      blocks.forEach((block) => {
        let region = regionAt(current);
        region.appendChild(block);
        if (!overflows(region) || region.children.length === 1) return;
        // 다음 칸으로: 바로 앞 소제목도 함께
        const carry: HTMLElement[] = [block];
        let prev = block.previousElementSibling as HTMLElement | null;
        while (prev && prev.hasAttribute("data-head") && region.children.length > carry.length) {
          carry.unshift(prev);
          prev = prev.previousElementSibling as HTMLElement | null;
        }
        current++;
        region = regionAt(current);
        carry.forEach((item) => region.appendChild(item));
      });
      project.querySelectorAll<HTMLElement>(".dk-clone").forEach((slide) => {
        if (!Array.from(slide.querySelectorAll(".dk-flow")).some((flow) => flow.children.length)) slide.remove();
      });
      return project.querySelectorAll(".dk-clone").length;
    };
    // 가장 적게 줄여서 DETAIL_LIMIT 장 안에 드는 단계를 찾고, 끝까지 안 되면 장 수가 가장 적은 단계 중 가장 덜 줄인 단계로
    const counts: number[] = [];
    let chosen = -1;
    for (let level = 0; level <= LEVELS; level++) {
      project.dataset.fit = String(level);
      counts.push(layout());
      if (counts[level] <= DETAIL_LIMIT) {
        chosen = level;
        break;
      }
    }
    if (chosen < 0) {
      chosen = counts.indexOf(Math.min(...counts));
      project.dataset.fit = String(chosen);
      layout();
    }

    // 개요
    const ovRegions = Array.from(overview.querySelectorAll<HTMLElement>(".dk-flow"));
    const ovBlocks = Array.from(ovPool.children) as HTMLElement[];
    for (const zoom of [1, 0.95, 0.9, 0.86, 0.82, 0.78]) {
      ovBlocks.forEach((block) => {
        block.style.zoom = String(zoom);
        ovPool.appendChild(block);
      });
      let current = 0;
      ovBlocks.forEach((block) => {
        ovRegions[current].appendChild(block);
        if (overflows(ovRegions[current]) && current < ovRegions.length - 1 && ovRegions[current].children.length > 1) ovRegions[++current].appendChild(block);
      });
      if (!ovRegions.some(overflows)) break;
    }

    fits.push(project.dataset.fit + "/" + project.querySelectorAll(".dk-clone").length);
    proto.remove();
    pool.remove();
    ovPool.remove();
  });

  document.querySelectorAll<HTMLElement>(".dk-slide").forEach((slide, index) => {
    const no = slide.querySelector(".dk-page-no");
    if (no) no.textContent = String(index + 1).padStart(2, "0");
  });
  const over = Array.from(document.querySelectorAll<HTMLElement>(".dk-flow")).filter(overflows);
  document.documentElement.dataset.deckOverflow = String(over.length);
  document.documentElement.dataset.deckFit = fits.join(" ");
  document.documentElement.dataset.pdfReady = "1";
}

const SCRIPT = `(function(){var run=${layoutDeck.toString()};function go(){(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){if(!document.documentElement.dataset.pdfReady)run();});}if(document.readyState==="complete")go();else window.addEventListener("load",go);})();`;

export function DeckFlow() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
