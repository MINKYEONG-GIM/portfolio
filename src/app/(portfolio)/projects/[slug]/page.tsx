import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { ArchitectureDiagram, Block, CatalogList, FeatureSections, InsightList, MetricGrid, SectionTitle, StepFlow, SystemDiagram, VisionSteps } from "@/components/project-sections";
import { HarnessDiagram } from "@/components/harness-diagram";
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

  /** 설계 원칙: 프로젝트의 insights(설계 원칙) 또는 시스템 구조의 원칙 */
  const principles = project.insights ?? project.system?.principles ?? null;
  /** 프로젝트마다 다른 내용(시스템 구조·스킬 목록·진행·비전)은 '내용' 한 섹션에 모읍니다. */
  const hasContents = Boolean(project.system || project.architecture || project.catalog || project.steps || project.vision);
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

        {project.image ? (
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 1152px) 1120px, 100vw"
              priority
              className="h-auto w-full"
            />
            {project.image.caption ? <figcaption className="ko-keep border-t border-line px-5 py-3 text-sm font-bold text-ink">{project.image.caption}</figcaption> : null}
          </figure>
        ) : null}

        {project.images?.map((extra) => (
          <figure key={extra.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image src={extra.src} alt={extra.alt} width={extra.width} height={extra.height} sizes="(min-width: 1152px) 1120px, 100vw" className="h-auto w-full" />
            {extra.caption ? <figcaption className="ko-keep border-t border-line px-5 py-3 text-sm font-bold text-ink">{extra.caption}</figcaption> : null}
          </figure>
        ))}

        <table className="oy-table">
          <tbody>
            <tr>
              <th scope="row">{P.period}</th>
              <td className="font-bold">{project.period}</td>
            </tr>
            <tr>
              <th scope="row">{P.area}</th>
              <td>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, index) => (
                    <span key={tag} className={`pill ${["pill-red", "pill-blue", "pill-purple"][index % 3]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
            {project.stack ? (
              <tr>
                <th scope="row">{P.stack}</th>
                <td className="font-semibold">{project.stack.join(" · ")}</td>
              </tr>
            ) : null}
          </tbody>
        </table>

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

      <Block>
        <SectionTitle id="purpose" eyebrow="PURPOSE" title={P.titles.purpose} />
        <p className="ko-keep max-w-4xl text-xl font-bold leading-9 text-ink">{project.purpose}</p>
      </Block>

      {project.metrics.length > 0 ? (
        <Block>
          <SectionTitle id="result" eyebrow="RESULT" title={P.titles.result} />
          <MetricGrid metrics={project.metrics} />
        </Block>
      ) : null}

      {project.background ? (
        <Block>
          <SectionTitle id="background" eyebrow="BACKGROUND" title={P.titles.background} />
          <p className="ko-keep max-w-4xl whitespace-pre-line text-base leading-8 text-ink">{project.background}</p>
        </Block>
      ) : null}

      {hasContents ? (
        <Block>
          <SectionTitle id="contents" eyebrow="CONTENTS" title={P.titles.contents} />

          {project.system ? (
            <section className="grid gap-5">
              <h3 className="ko-keep border-l-4 border-ink pl-3 text-xl font-extrabold text-ink">{P.titles.architecture}</h3>
              <SystemDiagram system={project.system} ui={ui} showPrinciples={false} />
            </section>
          ) : project.architecture ? (
            <section className="grid gap-5">
              <h3 className="ko-keep border-l-4 border-ink pl-3 text-xl font-extrabold text-ink">{P.titles.architectureSimple}</h3>
              <ArchitectureDiagram {...project.architecture} flowLabel={P.dataFlow} />
            </section>
          ) : null}

          {project.catalog ? (
            <section className="grid gap-5">
              <h3 className="ko-keep border-l-4 border-ink pl-3 text-xl font-extrabold text-ink">{project.catalog.title}</h3>
              <CatalogList items={project.catalog.items} triggerLabel={P.trigger} />
            </section>
          ) : null}

          {project.steps ? (
            <section className="grid gap-5">
              <h3 className="ko-keep border-l-4 border-ink pl-3 text-xl font-extrabold text-ink">{P.titles.process}</h3>
              <StepFlow steps={project.steps} />
            </section>
          ) : null}

          {project.vision ? (
            <section className="grid gap-5">
              <h3 className="ko-keep border-l-4 border-ink pl-3 text-xl font-extrabold text-ink">{P.titles.vision}</h3>
              <p className="ko-keep max-w-4xl text-base leading-8 text-ink">{project.vision.lead}</p>
              <div className="border border-line bg-paper p-3 sm:p-5">
                <HarnessDiagram jobs={project.vision.jobs} lang={lang} />
              </div>
              <h4 className="ko-keep text-lg font-extrabold text-ink">{P.titles.visionHow}</h4>
              <VisionSteps steps={project.vision.steps} />
              <p className="ko-keep bg-surface px-5 py-4 text-base font-semibold leading-7 text-ink">{project.vision.note}</p>
            </section>
          ) : null}
        </Block>
      ) : null}

      <Block>
        <SectionTitle id="role" eyebrow="ROLE" title={P.titles.role} />
        {project.roleLead ? <p className="ko-keep max-w-4xl text-lg font-bold leading-8 text-ink">{project.roleLead}</p> : null}
        <ol className="grid gap-0 border-t border-line">
          {project.roles.map((role, index) => (
            <li key={role} className="ko-keep flex gap-4 border-b border-line px-2 py-4 text-base leading-7 text-ink">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-black text-paper">{index + 1}</span>
              {role}
            </li>
          ))}
        </ol>
      </Block>

      {principles ? (
        <Block>
          <SectionTitle id="principles" eyebrow="PRINCIPLES" title={P.titles.principles} />
          <InsightList insights={principles} label={P.principleLabel} />
        </Block>
      ) : null}

      {project.features ? (
        <Block>
          <SectionTitle id="features" eyebrow="CORE FEATURES" title={P.titles.features} />
          <FeatureSections features={project.features} />
        </Block>
      ) : null}

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
