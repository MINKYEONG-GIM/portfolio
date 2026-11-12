import type { Project } from "@/data/projects";
import type { UIStrings } from "@/data/i18n";
import type { ProjectSummaryText } from "@/data/summaries";
import type { Lang } from "@/lib/lang";
import { ArchitectureDiagram, Block, CatalogList, FeatureSections, Figure, MetricGrid, SectionTitle, StepFlow, SystemDiagram, VisionSteps } from "@/components/project-sections";
import { HarnessDiagram } from "@/components/harness-diagram";

/**
 * 프로젝트 본문. 상세 페이지(/projects/[slug])와 PDF 페이지(/print)가 같은 컴포넌트를 써서
 * 두 화면의 내용이 항상 같습니다.
 */

/** 관리자에게는 관리자 전용 역할을 역할 목록 끝에 붙여 보여 줍니다. */
export function withAdminRoles(project: Project, admin: boolean): Project {
  return admin && project.adminRoles?.length ? { ...project, roles: [...project.roles, ...project.adminRoles] } : project;
}

/** 맨 위 한눈 요약: 문제 → 한 일 → 결과 세 칸과 용어 풀이 */
export function ProjectSummary({ summary, P }: { summary: ProjectSummaryText | null; P: UIStrings["project"] }) {
  if (!summary) return null;
  const rows = [
    { key: "problem", label: P.summaryLabels.problem, text: summary.problem },
    { key: "action", label: P.summaryLabels.action, text: summary.action },
    { key: "result", label: P.summaryLabels.result, text: summary.result }
  ];
  return (
    <div className="grid gap-3">
      <ol className="grid overflow-hidden rounded-2xl border border-line bg-paper sm:grid-cols-3">
        {rows.map((row, index) => (
          <li
            key={row.key}
            className={`grid content-start gap-1.5 p-5 ${index < rows.length - 1 ? "border-b border-line sm:border-b-0 sm:border-r" : ""} ${row.key === "result" ? "tone-soft" : ""}`}
          >
            <span className="flex items-center gap-2 text-xs font-black text-muted">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] text-paper">{index + 1}</span>
              {row.label}
            </span>
            <p className="ko-keep text-base font-extrabold leading-7 text-ink">{row.text}</p>
          </li>
        ))}
      </ol>
      {summary.glossary.length ? (
        <div className="rounded-2xl bg-surface px-5 py-4">
          <p className="text-xs font-black text-muted">{P.glossaryTitle}</p>
          <dl className="mt-2 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {summary.glossary.map((item) => (
              <div key={item.term} className="ko-keep text-sm leading-6">
                <dt className="inline font-extrabold text-ink">{item.term}</dt>
                <dd className="inline text-muted"> · {item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
}

/** 프로젝트마다 다른 내용(시스템 구조·스킬 목록·진행·비전)이 하나라도 있는지 */
export function hasContentsOf(project: Project) {
  return Boolean(project.system || project.architecture || project.catalog || project.steps || project.vision);
}

const GROUP_COLS: Record<number, string> = { 1: "", 2: "", 3: "" };

/** 대표 이미지와 추가 이미지. 묶음이 있으면 제목을 붙여 가로로 나란히 보여 줍니다. */
export function ProjectFigures({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.figureGroups?.length) {
    return (
      <>
        {project.figureGroups.map((group, groupIndex) => (
          <section key={group.title} className="grid gap-3">
            <h3 className="ko-keep border-l-4 border-ink pl-3 text-lg font-extrabold text-ink">{group.title}</h3>
            <div className={`grid items-start gap-4 ${GROUP_COLS[Math.min(group.images.length, 3)] ?? ""}`}>
              {group.images.map((image, imageIndex) => (
                <Figure key={image.src} image={image} priority={priority && groupIndex === 0 && imageIndex === 0} />
              ))}
            </div>
          </section>
        ))}
      </>
    );
  }
  return (
    <>
      {project.image ? <Figure image={project.image} priority={priority} /> : null}
      {project.images?.map((extra) => (
        <Figure key={extra.src} image={extra} />
      ))}
    </>
  );
}

/** 기간 · 분야 · 기술 표 */
export function ProjectInfoTable({ project, P }: { project: Project; P: UIStrings["project"] }) {
  return (
        <table className="oy-table oy-table-plain">
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

/** 목적 → 성과 → 배경 → 내용 → 핵심 기능 → 역할 */
export function ProjectSections({ project, ui, lang }: { project: Project; ui: UIStrings; lang: Lang }) {
  const P = ui.project;
  const hasContents = hasContentsOf(project);
  // 한국어 버전에서는 소제목 옆 영어 라벨을 숨깁니다
  const eb = (label: string) => (lang === "ko" ? undefined : label);
  return (
    <>
      <Block>
        <SectionTitle id="purpose" eyebrow={eb("PURPOSE")} title={P.titles.purpose} />
        <p className="ko-keep max-w-4xl whitespace-pre-line text-xl font-bold leading-9 text-ink">{project.purpose}</p>
      </Block>

      {project.metrics.length > 0 ? (
        <Block>
          <SectionTitle id="result" eyebrow={eb("RESULT")} title={P.titles.result} />
          <MetricGrid metrics={project.metrics} />
        </Block>
      ) : null}

      {project.background ? (
        <Block>
          <SectionTitle id="background" eyebrow={eb("BACKGROUND")} title={P.titles.background} />
          <p className="ko-keep max-w-4xl whitespace-pre-line text-base leading-8 text-ink">{project.background}</p>
        </Block>
      ) : null}

      {hasContents ? (
        <Block>
          <SectionTitle id="contents" eyebrow={eb("CONTENTS")} title={P.titles.contents} />

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
              {project.catalog.figures?.map((figure) => (
                <Figure key={figure.src} image={figure} />
              ))}
              <CatalogList items={project.catalog.items} triggerLabel={P.trigger} />
            </section>
          ) : null}

          {project.steps ? (
            <section className="grid gap-5">
              <h3 className="ko-keep border-l-4 border-ink pl-3 text-xl font-extrabold text-ink">{P.titles.process}</h3>
              <StepFlow steps={project.steps} />
              {project.stepFigures?.map((figure) => (
                <Figure key={figure.src} image={figure} />
              ))}
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

      {project.features ? (
        <Block>
          <SectionTitle
            id="features"
            eyebrow={eb(project.featuresTitle ? project.featuresTitle.toUpperCase() : "CORE FEATURES")}
            title={project.featuresTitle ?? P.titles.features}
          />
          <FeatureSections features={project.features} />
        </Block>
      ) : null}

      {/* 역할과 기여는 모든 프로젝트에서 항상 맨 마지막 섹션 */}
      <Block>
        <SectionTitle id="role" eyebrow={eb("ROLE")} title={P.titles.role} />
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
    </>
  );
}
