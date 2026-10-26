import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, KeyRound, LogOut } from "lucide-react";
import { LangToggle } from "@/components/lang-toggle";
import { getContent } from "@/data/content";
import { t } from "@/data/i18n";
import { JOBS } from "@/data/jobs";
import { hubPasswordConfigured, isHubAuthenticated, signInToHub, signOutOfHub } from "@/lib/hub-auth";
import { getLang } from "@/lib/lang";

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
  const lang = await getLang();
  const ui = t(lang).hub;
  const { profile } = getContent(lang);
  const authed = await isHubAuthenticated();

  if (!authed) {
    return (
      <div className="mx-auto w-full max-w-sm border border-line bg-paper p-8">
        <div className="flex items-center justify-between">
          <KeyRound className="h-6 w-6 text-ink" />
          <LangToggle lang={lang} />
        </div>
        <h1 className="mt-4 text-2xl font-black text-ink">{ui.password}</h1>
        {hubPasswordConfigured() ? (
          <form action={login} className="mt-5 grid gap-3">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              autoFocus
              required
              aria-label={ui.password}
              className="h-12 border border-line bg-paper px-4 text-base text-ink outline-none focus:border-ink"
            />
            {e ? <p className="text-sm font-bold text-[color:var(--price)]">{ui.wrong}</p> : null}
            <button type="submit" className="h-12 bg-ink text-base font-extrabold text-paper">
              {ui.enter}
            </button>
          </form>
        ) : (
          <p className="ko-keep mt-4 text-sm font-semibold leading-6 text-muted">{ui.notConfigured}</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-muted">{ui.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black text-ink">{ui.title(profile.name)}</h1>
          <p className="ko-keep mt-2 text-base font-semibold text-muted">{ui.hint}</p>
        </div>
        <div className="flex items-center gap-2">
          <LangToggle lang={lang} />
          <form action={logout}>
            <button type="submit" className="inline-flex items-center gap-1.5 border border-line px-3 py-2 text-sm font-bold text-muted hover:text-ink">
              <LogOut className="h-4 w-4" /> {ui.lock}
            </button>
          </form>
        </div>
      </div>
      <div className="oy-grid grid-cols-1 sm:grid-cols-2">
        {JOBS.map((job) =>
          job.href ? (
            <Link key={job.key} href={job.href} target="_blank" rel="noopener" className="group flex flex-col gap-2 bg-paper p-6 transition hover:bg-surface">
              <span className="flex items-center justify-between">
                <span className="pill pill-green">{ui.live}</span>
                <ArrowUpRight className="h-5 w-5 text-muted group-hover:text-ink" />
              </span>
              <span className="text-2xl font-black text-ink">{job.label[lang]}</span>
              <span className="ko-keep text-sm font-semibold leading-6 text-muted">{job.description[lang]}</span>
            </Link>
          ) : (
            <div key={job.key} className="flex flex-col gap-2 bg-surface p-6">
              <span>
                <span className="pill pill-gray">{ui.planned}</span>
              </span>
              <span className="text-2xl font-black text-muted">{job.label[lang]}</span>
              <span className="ko-keep text-sm font-semibold leading-6 text-muted">{job.description[lang]}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
