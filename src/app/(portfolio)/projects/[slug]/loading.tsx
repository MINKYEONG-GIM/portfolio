/**
 * 상세 페이지가 준비되는 동안 바로 보여 주는 뼈대 화면.
 * 개발 서버에서는 첫 진입 시 컴파일 때문에 몇 초 걸리는데, 그동안 "눌렀는데 반응이 없다"로 보이지 않게 합니다.
 */
export default function ProjectLoading() {
  return (
    <div className="grid gap-8" aria-busy="true" aria-live="polite">
      <div className="h-4 w-40 animate-pulse rounded bg-surface" />
      <div className="grid gap-3">
        <div className="h-6 w-24 animate-pulse rounded-full bg-surface" />
        <div className="h-10 w-3/4 animate-pulse rounded bg-surface" />
        <div className="h-6 w-2/3 animate-pulse rounded bg-surface" />
      </div>
      <div className="grid gap-2">
        <div className="h-12 animate-pulse rounded bg-surface" />
        <div className="h-12 animate-pulse rounded bg-surface" />
        <div className="h-12 animate-pulse rounded bg-surface" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="h-28 animate-pulse rounded bg-surface" />
        <div className="h-28 animate-pulse rounded bg-surface" />
        <div className="h-28 animate-pulse rounded bg-surface" />
      </div>
    </div>
  );
}
