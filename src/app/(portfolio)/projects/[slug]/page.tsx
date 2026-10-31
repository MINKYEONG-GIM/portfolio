import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { ProjectFigures, ProjectInfoTable, ProjectSections, hasContentsOf, principlesOf } from "@/components/project-body";
import { getContent, neighborsOf, statusOf, visibleProjects } from "@/data/content";
import { isAdmin } from "@/lib/hub-auth";
import { t } from "@/data/i18n";
import { getLang } from "@/lib/lang";

type Params = { slug: string };

/** 언어 쿠키를 읽으므로 요청마다 그립니다. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const [lang, admin] = await Promise.all([getLang(), isAdmin()]);
  const project = visibleProjects(getContent(lang).projects, admin).find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.subtitle };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [lang, admin] = await Promise.all([getLang(), isAdmin()]);
  const ui = t(lang);
  const { parts, projects: allProjects } = getContent(lang);
  const projects = visibleProjects(allProjects, admin);
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const part = parts[project.part - 1];
  const { prev, next } = neighborsOf(projects, project.slug);
  const status = statusOf(project, ui.status);
  const P = ui.project;

  const principles = principlesOf(project);
  const hasContents = hasContentsOf(project);
  const tabs = [
    { id: "purpose", label: P.tabs.purpose, show: true },
    { id: "result", label: P.tabs.result, show: project.metrics.length > 0 },
    { id: "background", label: P.tabs.background, show: Boolean(project.background) },
    { id: "contents", label: P.tabs.contents, show: hasContents },
    { id: "role", label: P.tabs.role, show: true },
    { id: "principles", label: P.tabs.principles, show: Boolean(principles) },
    { id: "features", label: P.tabs.features, show: Boolean(project.features) }
  ].filter((tab) => tab.show);

  return (
    <article className={`part-${project.part} grid gap-12`}>
      <header className="grid gap-5">
        <nav className="flex flex-wrap items-center gap-1 text-sm font-bold text-muted">
          <Link href="/" className="hover:text-ink">
            {P.home}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/#part-${project.part}`} className="hover:text-ink">
            {part.code} {part.short}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink">{project.title}</span>
        </nav>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`pill ${status === ui.status.done ? "pill-green" : "pill-red"}`}>{status}</span>
            <span className="pill pill-gray">{part.short}</span>
          </div>
          <h1 className="ko-keep mt-3 text-3xl font-black leading-tight text-ink sm:text-4xl">{project.title}</h1>
          <p className="ko-keep mt-3 max-w-3xl text-lg font-semibold leading-8 text-ink">{project.subtitle}</p>
        </div>

        <ProjectFigures project={project} priority />

        <ProjectInfoTable project={project} P={P} />

        <div className="no-scrollbar flex overflow-x-auto border-b-2 border-ink">
          {tabs.map((tab) => (
            <a key={tab.id} href={`#${tab.id}`} className="ko-keep shrink-0 px-4 py-3 text-base font-extrabold text-ink hover:bg-surface">
              {tab.label}
            </a>
          ))}
        </div>
      </header>

      {project.draft ? (
        <p className="ko-keep border border-dashed border-ink bg-surface px-5 py-4 text-base font-bold leading-7 text-ink">
          {ui.admin.draftOnlyAdmin} {P.draftNotice}
        </p>
      ) : null}

      <ProjectSections project={project} ui={ui} lang={lang} />

      <nav className="oy-grid grid-cols-1 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="bg-paper p-5 transition hover:bg-surface">
            <span className="inline-flex items-center gap-1 text-sm font-extrabold text-muted">
              <ArrowLeft className="h-3.5 w-3.5" /> {P.prev}
            </span>
            <p className="ko-keep mt-2 text-base font-extrabold text-ink">{prev.title}</p>
          </Link>
        ) : (
          <span className="bg-surface" />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="bg-paper p-5 text-right transition hover:bg-surface">
            <span className="inline-flex items-center gap-1 text-sm font-extrabold text-muted">
              {P.next} <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <p className="ko-keep mt-2 text-base font-extrabold text-ink">{next.title}</p>
          </Link>
        ) : (
          <span className="bg-surface" />
        )}
      </nav>
    </article>
  );
}
