/** 홈이 준비되는 동안 보여 주는 뼈대 화면. */
export default function HomeLoading() {
  return (
    <div className="grid gap-10" aria-busy="true" aria-live="polite">
      <div className="h-48 animate-pulse rounded-3xl bg-surface" />
      <div className="grid gap-4">
        <div className="h-8 w-2/3 animate-pulse rounded bg-surface" />
        <div className="h-36 animate-pulse rounded-2xl bg-surface" />
        <div className="h-36 animate-pulse rounded-2xl bg-surface" />
      </div>
    </div>
  );
}
