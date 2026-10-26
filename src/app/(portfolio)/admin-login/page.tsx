import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { adminLogin } from "@/app/actions";
import { t } from "@/data/i18n";
import { hubPasswordConfigured, isAdmin } from "@/lib/hub-auth";
import { getLang } from "@/lib/lang";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ e?: string; back?: string }> }) {
  const { e, back } = await searchParams;
  const [lang, admin] = await Promise.all([getLang(), isAdmin()]);
  if (admin) redirect(back && back.startsWith("/") ? back : "/");
  const ui = t(lang);
  const target = back && back.startsWith("/") && !back.startsWith("//") ? back : "/";

  return (
    <div className="mx-auto w-full max-w-sm border-2 border-ink bg-paper p-8">
      <LockKeyhole className="h-6 w-6 text-ink" />
      <h1 className="mt-4 text-2xl font-black text-ink">{ui.admin.title}</h1>
      <p className="ko-keep mt-2 text-sm font-semibold leading-6 text-muted">{ui.admin.hint}</p>
      {hubPasswordConfigured() ? (
        <form action={adminLogin} className="mt-5 grid gap-3">
          <input type="hidden" name="back" value={target} />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            required
            aria-label={ui.hub.password}
            placeholder={ui.hub.password}
            className="h-12 border border-line bg-paper px-4 text-base text-ink outline-none focus:border-ink"
          />
          {e ? <p className="text-sm font-bold text-[color:var(--price)]">{ui.hub.wrong}</p> : null}
          <button type="submit" className="h-12 bg-ink text-base font-extrabold text-paper">
            {ui.hub.enter}
          </button>
        </form>
      ) : (
        <p className="ko-keep mt-4 text-sm font-semibold leading-6 text-muted">{ui.hub.notConfigured}</p>
      )}
      <Link href={target} className="mt-5 inline-block text-sm font-bold text-muted hover:text-ink">
        ← {ui.admin.back}
      </Link>
    </div>
  );
}
