import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
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
  const status = project.status ?? (project.period.includes("진행 중") ? "진행 중" : "완료");

  // 상세 탭: 있는 섹션만 보여 줍니다.
  const tabs = [
    { id: "purpose", label: "목적", show: true },
    { id: "result", label: "성과", show: project.metrics.length > 0 },
    { id: "background", label: "배경", show: Boolean(project.background) },
    { id: "architecture", label: "구조", show: Boolean(project.architecture) },
    { id: "features", label: "핵심 기능", show: Boolean(project.features) },
    { id: "catalog", label: project.catalog?.title ?? "목록", show: Boolean(project.catalog) },
    { id: "role", label: "역할", show: true },
    { id: "process", label: "진행", show: Boolean(project.steps) },
    { id: "insight", label: project.insightsLabel ?? "인사이트", show: Boolean(project.insights) },
    { id: "visual", label: "자료", show: Boolean(project.image) },
    { id: "vision", label: "비전", show: Boolean(project.vision) }
  ].filter((tab) => tab.show);

  return (
    <article className={`part-${project.part} grid gap-12`}>
      <header className="grid gap-5">
        <nav className="flex flex-wrap items-center gap-1 text-sm font-bold text-muted">
          <Link href="/" className="hover:text-ink">
            홈
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/#part-${project.part}`} className="hover:text-ink">
            {part.code} {part.title}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink">{project.title}</span>
        </nav>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`pill ${status === "완료" ? "pill-green" : "pill-red"}`}>{status}</span>
            <span className="pill pill-gray">{part.title}</span>
          </div>
          <h1 className="ko-keep mt-3 text-3xl font-black leading-tight text-ink sm:text-4xl">{project.title}</h1>
          <p className="ko-keep mt-3 max-w-3xl text-lg font-semibold leading-8 text-ink">{project.subtitle}</p>
        </div>

        <table className="oy-table">
          <tbody>
            <tr>
              <th scope="row">프로젝트 기간</th>
              <td className="font-bold">{project.period}</td>
            </tr>
            <tr>
              <th scope="row">분야</th>
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
                <th scope="row">기술·도구</th>
                <td className="font-semibold">{project.stack.join(" · ")}</td>
              </tr>
            ) : null}
          </tbody>
        </table>

        <div className="flex overflow-x-auto border-b-2 border-ink">
          {tabs.map((tab) => (
            <a key={tab.id} href={`#${tab.id}`} className="ko-keep shrink-0 px-4 py-3 text-base font-extrabold text-ink hover:bg-surface">
              {tab.label}
            </a>
          ))}
        </div>
      </header>

      {project.draft ? (
        <p className="ko-keep border border-dashed border-ink bg-surface px-5 py-4 text-base font-bold leading-7 text-ink">
          내용을 채워 가는 섹션입니다. 구성만 먼저 잡아 두고 진행하면서 성과·역할·자료를 보강합니다.
        </p>
      ) : null}

      <Block>
        <SectionTitle id="purpose" eyebrow="PURPOSE" title="프로젝트 목적" />
        <p className="ko-keep max-w-4xl text-xl font-bold leading-9 text-ink">{project.purpose}</p>
      </Block>

      {project.metrics.length > 0 ? (
        <Block>
          <SectionTitle id="result" eyebrow="RESULT" title="성과" />
          <MetricGrid metrics={project.metrics} />
        </Block>
      ) : null}

      {project.background ? (
        <Block>
          <SectionTitle id="background" eyebrow="BACKGROUND" title="프로젝트 배경" />
          <p className="ko-keep max-w-4xl text-base leading-8 text-ink">{project.background}</p>
        </Block>
      ) : null}

      {project.architecture ? (
        <Block>
          <SectionTitle id="architecture" eyebrow="ARCHITECTURE" title="구조" />
          <ArchitectureDiagram {...project.architecture} />
        </Block>
      ) : null}

      {project.features ? (
        <Block>
          <SectionTitle id="features" eyebrow="CORE FEATURES" title="핵심 기능" />
          <FeatureSections features={project.features} />
        </Block>
      ) : null}

      {project.catalog ? (
        <Block>
          <SectionTitle id="catalog" eyebrow="CATALOG" title={project.catalog.title} />
          <CatalogList items={project.catalog.items} />
        </Block>
      ) : null}

      <Block>
        <SectionTitle id="role" eyebrow="ROLE" title="역할과 기여" />
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

      {project.steps ? (
        <Block>
          <SectionTitle id="process" eyebrow="PROCESS" title="프로젝트 진행" />
          <StepFlow steps={project.steps} />
        </Block>
      ) : null}

      {project.insights ? (
        <Block>
          <SectionTitle id="insight" eyebrow="INSIGHT" title={project.insightsLabel ?? "핵심 인사이트"} />
          <InsightList insights={project.insights} />
        </Block>
      ) : null}

      {project.image ? (
        <Block>
          <SectionTitle id="visual" eyebrow="VISUAL" title="화면과 자료" />
          <figure className="border border-line bg-surface">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 1152px) 1120px, 100vw"
              className="h-auto w-full"
            />
            {project.image.caption ? <figcaption className="ko-keep border-t border-line px-5 py-3 text-sm font-bold text-ink">{project.image.caption}</figcaption> : null}
          </figure>
        </Block>
      ) : null}

      {project.vision ? (
        <Block>
          <SectionTitle id="vision" eyebrow="VISION" title="전 직무를 하나의 하네스로" />
          <p className="ko-keep max-w-4xl text-base leading-8 text-ink">{project.vision.lead}</p>
          <div className="border border-line bg-paper p-3 sm:p-5">
            <HarnessDiagram jobs={project.vision.jobs} />
          </div>
          <h3 className="ko-keep text-xl font-extrabold text-ink">모든 직무를 중심 하네스에 연결하는 방법</h3>
          <VisionSteps steps={project.vision.steps} />
          <p className="ko-keep bg-surface px-5 py-4 text-base font-semibold leading-7 text-ink">{project.vision.note}</p>
        </Block>
      ) : null}

      <nav className="oy-grid grid-cols-1 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="bg-paper p-5 transition hover:bg-surface">
            <span className="inline-flex items-center gap-1 text-sm font-extrabold text-muted">
              <ArrowLeft className="h-3.5 w-3.5" /> 이전 프로젝트
            </span>
            <p className="ko-keep mt-2 text-base font-extrabold text-ink">{prev.title}</p>
          </Link>
        ) : (
          <span className="bg-surface" />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="bg-paper p-5 text-right transition hover:bg-surface">
            <span className="inline-flex items-center gap-1 text-sm font-extrabold text-muted">
              다음 프로젝트 <ArrowRight className="h-3.5 w-3.5" />
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
