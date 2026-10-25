import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, KeyRound, LogOut } from "lucide-react";
import { JOBS } from "@/data/jobs";
import { PROFILE } from "@/data/projects";
import { hubPasswordConfigured, isHubAuthenticated, signInToHub, signOutOfHub } from "@/lib/hub-auth";

export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";
  const ok = await signInToHub(String(formData.get("password") ?? ""));
  redirect(ok ? "/entry" : "/entry?e=1");
}

async function logout() {
  "use server";
  await signOutOfHub();
  redirect("/entry");
}

export default async function EntryPage({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams;
  const authed = await isHubAuthenticated();

  if (!authed) {
    return (
      <div className="mx-auto w-full max-w-sm border border-line bg-paper p-8">
        <KeyRound className="h-6 w-6 text-ink" />
        <h1 className="mt-4 text-2xl font-black text-ink">비밀번호</h1>
        {hubPasswordConfigured() ? (
          <form action={login} className="mt-5 grid gap-3">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              autoFocus
              required
              aria-label="비밀번호"
              className="h-12 border border-line bg-paper px-4 text-base text-ink outline-none focus:border-ink"
            />
            {e ? <p className="text-sm font-bold text-[color:var(--price)]">비밀번호가 맞지 않습니다.</p> : null}
            <button type="submit" className="h-12 bg-ink text-base font-extrabold text-paper">
              들어가기
            </button>
          </form>
        ) : (
          <p className="ko-keep mt-4 text-sm font-semibold leading-6 text-muted">
            환경변수 HUB_PASSWORD 가 설정되지 않았습니다. 로컬은 .env.local, Vercel 은 Environment Variables 에 넣어 주세요.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-muted">MAIN</p>
          <h1 className="mt-2 text-3xl font-black text-ink">{PROFILE.name} · 직무별 포트폴리오</h1>
          <p className="ko-keep mt-2 text-base font-semibold text-muted">직무를 고르면 그 직무용 공개 화면이 새 탭에서 열립니다.</p>
        </div>
        <form action={logout}>
          <button type="submit" className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-sm font-bold text-muted hover:text-ink">
            <LogOut className="h-4 w-4" /> 잠그기
          </button>
        </form>
      </div>
      <div className="oy-grid grid-cols-1 sm:grid-cols-2">
        {JOBS.map((job) =>
          job.href ? (
            <Link key={job.key} href={job.href} target="_blank" rel="noopener" className="group flex flex-col gap-2 bg-paper p-6 transition hover:bg-surface">
              <span className="flex items-center justify-between">
                <span className="pill pill-green">{job.status}</span>
                <ArrowUpRight className="h-5 w-5 text-muted group-hover:text-ink" />
              </span>
              <span className="text-2xl font-black text-ink">{job.label}</span>
              <span className="ko-keep text-sm font-semibold leading-6 text-muted">{job.description}</span>
            </Link>
          ) : (
            <div key={job.key} className="flex flex-col gap-2 bg-surface p-6">
              <span>
                <span className="pill pill-gray">{job.status}</span>
              </span>
              <span className="text-2xl font-black text-muted">{job.label}</span>
              <span className="ko-keep text-sm font-semibold leading-6 text-muted">{job.description}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
