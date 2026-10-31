import Image from "next/image";
import type { Project } from "@/data/projects";
import type { UIStrings } from "@/data/i18n";
import type { Lang } from "@/lib/lang";
import { ArchitectureDiagram, Block, CatalogList, FeatureSections, InsightList, MetricGrid, SectionTitle, StepFlow, SystemDiagram, VisionSteps } from "@/components/project-sections";
import { HarnessDiagram } from "@/components/harness-diagram";

/**
 * 프로젝트 본문. 상세 페이지(/projects/[slug])와 PDF 페이지(/print)가 같은 컴포넌트를 써서
 * 두 화면의 내용이 항상 같습니다.
 */

/** 설계 원칙: 프로젝트의 insights(설계 원칙) 또는 시스템 구조의 원칙 */
export function principlesOf(project: Project) {
  return project.insights ?? project.system?.principles ?? null;
}

/** 프로젝트마다 다른 내용(시스템 구조·스킬 목록·진행·비전)이 하나라도 있는지 */
export function hasContentsOf(project: Project) {
  return Boolean(project.system || project.architecture || project.catalog || project.steps || project.vision);
}

/** 대표 이미지와 추가 이미지 */
export function ProjectFigures({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <>
        {project.image ? (
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 1152px) 1120px, 100vw"
              priority={priority}
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

    </>
  );
}

/** 기간 · 분야 · 기술 표 */
export function ProjectInfoTable({ project, P }: { project: Project; P: UIStrings["project"] }) {
  return (
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
  );
}

/** 목적 → 성과 → 배경 → 내용 → 역할 → 설계 원칙 → 핵심 기능 */
export function ProjectSections({ project, ui, lang }: { project: Project; ui: UIStrings; lang: Lang }) {
  const P = ui.project;
  const principles = principlesOf(project);
  const hasContents = hasContentsOf(project);
  return (
    <>
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
    </>
  );
}
