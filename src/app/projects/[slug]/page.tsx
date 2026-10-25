import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ArchitectureDiagram, Block, CatalogList, FeatureSections, InsightList, MetricGrid, SectionTitle, StepFlow, VisionSteps } from "@/components/project-sections";
import { HarnessDiagram } from "@/components/harness-diagram";
import { PARTS, PROJECTS, findProject, neighbors } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.subtitle };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const part = PARTS[project.part - 1];
  const { prev, next } = neighbors(project.slug);

  return (
    <article className={`part-${project.part} grid gap-14`}>
      <header className="grid gap-6">
        <Link href={`/#part-${project.part}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          {part.code} · {part.title}
        </Link>
        <div>
          <h1 className="ko-keep text-3xl font-black leading-tight text-ink sm:text-5xl">{project.title}</h1>
          <p className="ko-keep mt-4 max-w-3xl text-lg leading-8 text-muted">{project.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="tone-soft tone-text rounded-full px-3 py-1.5">{project.period}</span>
          {project.status ? <span className="tone-bg rounded-full px-3 py-1.5 text-white">{project.status}</span> : null}
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1.5 text-muted">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {project.draft ? (
        <p className="ko-keep rounded-2xl border border-dashed border-line bg-surface px-5 py-4 text-sm font-semibold leading-6 text-muted">
          내용을 채워 가는 섹션입니다. 구성만 먼저 잡아 두고 진행하면서 성과·역할·자료를 보강합니다.
        </p>
      ) : null}

      <Block>
        <SectionTitle eyebrow="PURPOSE" title="프로젝트 목적" />
        <p className="ko-keep max-w-3xl text-lg font-semibold leading-8 text-ink">{project.purpose}</p>
      </Block>

      {project.metrics.length > 0 ? (
        <Block>
          <SectionTitle eyebrow="RESULT" title="성과" />
          <MetricGrid metrics={project.metrics} />
        </Block>
      ) : null}

      {project.background ? (
        <Block>
          <SectionTitle eyebrow="BACKGROUND" title="프로젝트 배경" />
          <p className="ko-keep max-w-3xl text-base leading-7 text-muted">{project.background}</p>
        </Block>
      ) : null}

      {project.architecture ? (
        <Block>
          <SectionTitle eyebrow="ARCHITECTURE" title="구조" />
          <ArchitectureDiagram {...project.architecture} />
        </Block>
      ) : null}

      {project.features ? (
        <Block>
          <SectionTitle eyebrow="CORE FEATURES" title="핵심 기능 세 가지" />
          <FeatureSections features={project.features} />
        </Block>
      ) : null}

      {project.catalog ? (
        <Block>
          <SectionTitle eyebrow="CATALOG" title={project.catalog.title} />
          <CatalogList items={project.catalog.items} />
        </Block>
      ) : null}

      <Block>
        <SectionTitle eyebrow="ROLE" title="역할과 기여" />
        {project.roleLead ? <p className="ko-keep max-w-3xl text-base font-semibold leading-7 text-ink">{project.roleLead}</p> : null}
        <ul className="grid gap-2">
          {project.roles.map((role) => (
            <li key={role} className="ko-keep flex gap-3 rounded-2xl border border-line bg-paper px-4 py-3 text-sm leading-6 text-ink">
              <span className="tone-bg mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
              {role}
            </li>
          ))}
        </ul>
      </Block>

      {project.steps ? (
        <Block>
          <SectionTitle eyebrow="PROCESS" title="프로젝트 진행" />
          <StepFlow steps={project.steps} />
        </Block>
      ) : null}

      {project.insights ? (
        <Block>
          <SectionTitle eyebrow="INSIGHT" title={project.insightsLabel ?? "핵심 인사이트"} />
          <InsightList insights={project.insights} />
        </Block>
      ) : null}

      {project.image ? (
        <Block>
          <SectionTitle eyebrow="VISUAL" title="화면과 자료" />
          <figure className="overflow-hidden rounded-3xl border border-line bg-surface">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 1152px) 1120px, 100vw"
              className="h-auto w-full"
            />
            {project.image.caption ? <figcaption className="ko-keep px-5 py-3 text-xs font-semibold text-muted">{project.image.caption}</figcaption> : null}
          </figure>
        </Block>
      ) : null}

      {project.vision ? (
        <Block>
          <SectionTitle eyebrow="VISION" title="전 직무를 하나의 하네스로" />
          <p className="ko-keep max-w-3xl text-base leading-7 text-ink">{project.vision.lead}</p>
          <div className="rounded-3xl border border-line bg-paper p-3 sm:p-5">
            <HarnessDiagram jobs={project.vision.jobs} />
          </div>
          <h3 className="ko-keep text-lg font-extrabold text-ink">모든 직무를 중심 하네스에 연결하는 방법</h3>
          <VisionSteps steps={project.vision.steps} />
          <p className="ko-keep rounded-2xl bg-surface px-5 py-4 text-sm font-semibold leading-6 text-muted">{project.vision.note}</p>
        </Block>
      ) : null}

      {project.stack ? (
        <Block>
          <SectionTitle eyebrow="STACK" title="기술과 도구" />
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full bg-surface px-3 py-1.5 text-sm font-bold text-ink">
                {item}
              </span>
            ))}
          </div>
        </Block>
      ) : null}

      <nav className="grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className={`part-${prev.part} group rounded-2xl border border-line p-5 transition hover:border-[color:var(--tone)]`}>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-muted">
              <ArrowLeft className="h-3.5 w-3.5" /> 이전 프로젝트
            </span>
            <p className="ko-keep mt-2 text-sm font-extrabold text-ink">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className={`part-${next.part} group rounded-2xl border border-line p-5 text-right transition hover:border-[color:var(--tone)]`}>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-muted">
              다음 프로젝트 <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <p className="ko-keep mt-2 text-sm font-extrabold text-ink">{next.title}</p>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
