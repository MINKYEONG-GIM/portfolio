import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { DeckFlow } from "@/components/deck-flow";
import { HarnessDiagram } from "@/components/harness-diagram";
import { PartIcon } from "@/components/part-icon";
import { withAdminRoles } from "@/components/project-body";
import { byPart, getContent, visibleProjects } from "@/data/content";
import { t } from "@/data/i18n";
import type { Project, ProjectImage } from "@/data/projects";
import { summaryOf } from "@/data/summaries";
import { isAdmin } from "@/lib/hub-auth";
import { getLang, parseLang } from "@/lib/lang";

/**
 * 다운로드용 PDF 를 만드는 슬라이드형 문서 (16:9, 한 장 = PDF 한 쪽).
 * 표지(남색) → 목차 → 전체 요약 → 프로젝트별 슬라이드.
 * 프로젝트 슬라이드에는 웹사이트 상세 페이지의 내용을 빠짐없이, 웹사이트에 없는 내용은 넣지 않습니다.
 *   표지(남색): 번호 · 제목 · 부제 · 기간 · 분야
 *   개요: 대표 이미지 | 기간 · 분야·기술 · 목적 · 역할과 기여 · 성과
 *   상세 내용(최대 2장, 2단): 한눈 요약, 배경, 시스템 구조, 진행, 핵심 기능, 화면(작게) 등
 *   부록: 도식을 한 장에 하나씩 크게 (본문에는 '부록 n' 표시)
 * 모든 프로젝트가 같은 순서입니다. 넘치면 DeckFlow 가 그림·간격·글자를 줄여 장 수를 맞춥니다.
 * scripts/make-pdf.mjs 가 /deck?lang=ko|en 을 PDF 로 저장합니다.
 */

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return { title: t(lang).pdf.title, robots: { index: false, follow: false } };
}

const PORTFOLIO = "PROJECT PORTFOLIO";

type Shot = ProjectImage & { group?: string };

/** 웹사이트 상단 그림들 (묶음이면 묶음 제목을 붙여서) */
function topImagesOf(project: Project): Shot[] {
  if (project.figureGroups?.length) return project.figureGroups.flatMap((group) => group.images.map((image) => ({ ...image, group: group.title })));
  return [...(project.image ? [project.image] : []), ...(project.images ?? [])];
}

function Picture({ image }: { image: Shot }) {
  return (
    <figure className="dk-shot">
      {image.group ? <p className="dk-shot-group">{image.group}</p> : null}
      <div className="dk-shot-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
      </div>
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

function Head({ label, title, subtitle, section, appendix }: { label: string; title: string; subtitle?: string; section?: string; appendix?: boolean }) {
  return (
    <header className="dk-head">
      <p className="dk-label">
        {section ? <span className={`dk-sec ${appendix ? "dk-sec-app" : ""}`}>{section}</span> : null}
        {label}
      </p>
      <h2 className="dk-title">{title}</h2>
      {subtitle ? <p className="dk-sub">{subtitle}</p> : null}
    </header>
  );
}

function Foot({ name }: { name: string }) {
  return (
    <footer className="dk-foot">
      <span>{name}</span>
      <span className="dk-page-no" />
    </footer>
  );
}

/** 흘려 넣을 덩어리 하나. 면 전체 폭 장에만, head 면 다음 덩어리와 같은 장에 */
function B({ children, head, className = "" }: { children: ReactNode; head?: boolean; className?: string }) {
  return (
    <div className={`dk-blk ${className}`} data-head={head ? "" : undefined}>
      {children}
    </div>
  );
}

function H({ children, sub }: { children: ReactNode; sub?: boolean }) {
  return (
    <B head>
      <h3 className={sub ? "dk-h4" : "dk-h3"}>{children}</h3>
    </B>
  );
}

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

const cols = (n: number) => ({ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` });

export default async function DeckPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const [cookieLang, admin, query] = await Promise.all([getLang(), isAdmin(), searchParams]);
  const lang = query.lang ? parseLang(query.lang) : cookieLang;
  const ui = t(lang);
  const D = ui.pdf;
  const P = ui.project;
  const { profile, parts, projects: allProjects } = getContent(lang);
  const projects = visibleProjects(allProjects, admin);
  const SEC = lang === "en" ? { overview: "Overview", detail: "Details", appendix: "Appendix" } : { overview: "개요", detail: "상세 내용", appendix: "부록" };
  const numberOf = (slug: string) => String(projects.findIndex((item) => item.slug === slug) + 1).padStart(2, "0");

  return (
    <div className="dk-root" lang={lang}>
      <link rel="stylesheet" href="/deck.css" />
      <DeckFlow />

      {/* 표지 */}
      <section className="dk-slide dk-cover">
        <div>
          <p className="dk-cover-label">{PORTFOLIO}</p>
          <h1 className="dk-cover-title">{profile.tagline}</h1>
          <p className="dk-cover-sub">{D.cover}</p>
        </div>
        <div className="dk-cover-bottom">
          <p className="dk-cover-name">{profile.name}</p>
          <p className="dk-cover-note">{ui.footer.dataNotice}</p>
        </div>
      </section>

      {/* 목차 */}
      <section className="dk-slide">
        <header className="dk-head">
          <p className="dk-label">CONTENTS</p>
          <h2 className="dk-title">{D.contents}</h2>
        </header>
        <ol className="dk-toc">
          {parts.map((part) => {
            const items = byPart(projects, part.no);
            if (items.length === 0) return null;
            return (
              <li key={part.no}>
                <span className="dk-toc-icon">
                  <PartIcon no={part.no} className="h-5 w-5" />
                </span>
                <span className="dk-toc-no">{String(part.no).padStart(2, "0")}</span>
                <span className="dk-toc-title">{part.title}</span>
                <span className="dk-toc-items">{items.map((project) => project.short ?? project.title).join(" / ")}</span>
              </li>
            );
          })}
        </ol>
        <Foot name={profile.name} />
      </section>

      {/* 전체 요약 */}
      <section className="dk-slide">
        <header className="dk-head">
          <p className="dk-label">SUMMARY</p>
          <h2 className="dk-title">{D.summary}</h2>
          <p className="dk-sub">{profile.intro}</p>
        </header>
        <table className="dk-table">
          <thead>
            <tr>
              <th style={{ width: "6%" }}>{D.colNo}</th>
              <th style={{ width: "17%" }}>{D.colPart}</th>
              <th>{D.colProject}</th>
              <th style={{ width: "15%" }}>{D.colPeriod}</th>
              <th style={{ width: "26%" }}>{D.colResult}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const metric = project.metrics[0];
              return (
                <tr key={project.slug}>
                  <td className="dk-strong">{numberOf(project.slug)}</td>
                  <td>{parts[project.part - 1].short}</td>
                  <td className="dk-strong">{project.title}</td>
                  <td>{project.period}</td>
                  <td>
                    {metric ? (
                      <>
                        <b className="dk-blue">{metric.value}</b> {metric.label}
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Foot name={profile.name} />
      </section>

      {/* 프로젝트 */}
      {projects.map((raw) => {
        const project = withAdminRoles(raw, admin);
        const part = parts[project.part - 1];
        const label = `Part ${String(part.no).padStart(2, "0")} | ${part.title}`;
        const summary = summaryOf(project.slug, lang);
        const tops = topImagesOf(project);
        const [first, second, ...rest] = tops;
        const system = project.system;
        // 크게 봐야 하는 도식은 본문에 '부록 n' 표시만 남기고 프로젝트 끝 부록 장에 크게 넣습니다
        const appendix = [...(system?.figures ?? []), ...(project.catalog?.figures ?? [])];
        const appendixNo = (image: ProjectImage) => appendix.findIndex((item) => item.src === image.src) + 1;
        const Ref = ({ image }: { image: ProjectImage }) => (
          <B className="dk-ref">
            <span className="dk-sec dk-sec-app">
              {SEC.appendix} {appendixNo(image)}
            </span>
            <span>{image.caption ?? image.alt}</span>
          </B>
        );
        return (
          <div key={project.slug} className={`dk-project part-${project.part}`}>
            {/* 프로젝트 표지 */}
            <section className="dk-slide dk-pcover">
              <div>
                <p className="dk-cover-label">{label}</p>
                <p className="dk-pcover-no">{numberOf(project.slug)}</p>
                <h2 className="dk-pcover-title">{project.title}</h2>
                {project.subtitle ? <p className="dk-cover-sub">{project.subtitle}</p> : null}
              </div>
              <div className="dk-pcover-meta">
                <p>
                  <b>{P.period}</b> {project.period}
                </p>
                <p className="dk-pcover-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </p>
              </div>
            </section>

            {/* 1장: 대표 그림 | 글 (그림이 없으면 2단) */}
            <section className="dk-slide">
              <Head label={label} title={project.title} subtitle={project.subtitle} section={SEC.overview} />
              {first ? (
                <div className="dk-body">
                  <div className="dk-left">
                    <Picture image={first} />
                  </div>
                  <div className="dk-flow" />
                </div>
              ) : (
                <div className="dk-body dk-cols">
                  <div className="dk-flow" />
                  <div className="dk-flow" />
                </div>
              )}
              <Foot name={profile.name} />
            </section>

            {/* 이어지는 장의 틀: 2단 (DeckFlow 가 필요한 만큼 복제) */}
            <section className="dk-slide dk-cont dk-proto">
              <Head label={label} title={project.title} section={SEC.detail} />
              <div className="dk-body dk-cols">
                <div className="dk-flow" />
                <div className="dk-flow" />
              </div>
              <Foot name={profile.name} />
            </section>

            {/* 부록: 도식을 한 장에 하나씩 크게 */}
            {appendix.map((image, index) => (
              <section key={image.src} className="dk-slide dk-appendix">
                <Head label={label} title={project.title} section={`${SEC.appendix} ${index + 1}`} appendix />
                <div className="dk-app-body">
                  <Picture image={image} />
                </div>
                <Foot name={profile.name} />
              </section>
            ))}

            {/* 개요 장(1장 오른쪽)에 넣을 내용 */}
            <div className="dk-pool dk-pool-ov">
              {/* 기간 · 분야 · 기술 */}
              <B className="dk-info">
                <div>
                  <h3 className="dk-h3">{P.period}</h3>
                  <p>{project.period}</p>
                </div>
                <div>
                  <h3 className="dk-h3">{P.area}</h3>
                  <p className="dk-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </p>
                </div>
                {project.stack ? (
                  <div>
                    <h3 className="dk-h3">{P.stack}</h3>
                    <p>{project.stack.join(" · ")}</p>
                  </div>
                ) : null}
              </B>

              {/* 목적 */}
              <H>{P.titles.purpose}</H>
              <B>
                <p className="dk-pre dk-lead">{project.purpose}</p>
              </B>

              {/* 역할과 기여 */}
              <H>{P.titles.role}</H>
              {project.roleLead ? (
                <B>
                  <p className="dk-lead">{project.roleLead}</p>
                </B>
              ) : null}
              {project.roles.map((role, index) => (
                <B key={role} className="dk-role">
                  <span className="dk-num">{index + 1}</span>
                  <span>{role}</span>
                </B>
              ))}

              {/* 성과 */}
              {project.metrics.length ? (
                <>
                  <H>{P.titles.result}</H>
                  {chunk(project.metrics, 4).map((row, index) => (
                    <B key={index}>
                      <div className="dk-metrics">
                        {row.map((metric) => (
                          <div key={metric.label} className="dk-metric">
                            <span className="dk-metric-label">{metric.label}</span>
                            <b className="dk-metric-value">{metric.value}</b>
                            {metric.note ? <span className="dk-metric-note">{metric.note}</span> : null}
                          </div>
                        ))}
                      </div>
                    </B>
                  ))}
                </>
              ) : null}
            </div>

            {/* 상세 장(2단)에 흘려 넣을 내용: 웹사이트 상세 페이지와 같은 내용 */}
            <div className="dk-pool dk-pool-detail">
              {/* 한눈 요약 + 용어 풀이 */}
              {summary ? (
                <B>
                  <ol className="dk-summary">
                    {[
                      [P.summaryLabels.problem, summary.problem],
                      [P.summaryLabels.action, summary.action],
                      [P.summaryLabels.result, summary.result]
                    ].map(([title, text], index) => (
                      <li key={title}>
                        <span className="dk-summary-label">
                          <span className="dk-num dk-num-sm">{index + 1}</span>
                          {title}
                        </span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ol>
                </B>
              ) : null}
              {summary?.glossary.length ? (
                <B>
                  <div className="dk-glossary">
                    <p className="dk-glossary-title">{P.glossaryTitle}</p>
                    {summary.glossary.map((item) => (
                      <p key={item.term}>
                        <b>{item.term}</b> · {item.desc}
                      </p>
                    ))}
                  </div>
                </B>
              ) : null}

              {second ? (
                <B>
                  <Picture image={second} />
                </B>
              ) : null}

              {/* 배경 */}
              {project.background ? (
                <>
                  <H>{P.titles.background}</H>
                  <B>
                    <p className="dk-pre dk-box">{project.background}</p>
                  </B>
                </>
              ) : null}

              {/* 내용: 시스템 구조 */}
              {system ? (
                <>
                  <H>{P.titles.architecture}</H>
                  <B>
                    <p>{system.intro}</p>
                  </B>
                  {system.figures?.map((figure) => (
                    <Ref key={figure.src} image={figure} />
                  ))}
                  {system.layers.map((layer, index) => {
                    const tinted = system.layers.some((l) => l.tint) ? layer.tint : index === system.layers.length - 1;
                    return (
                      <B key={layer.name} className={`dk-layer ${tinted ? "dk-layer-tint" : ""}`}>
                        <div>
                          <p className="dk-layer-name">{layer.name}</p>
                          <p className="dk-muted">{layer.role}</p>
                        </div>
                        <ul style={cols(Math.min(layer.items.length, 4))}>
                          {layer.items.map((item) => (
                            <li key={item.label}>
                              <b>{item.label}</b>
                              {item.note ? <span>{item.note}</span> : null}
                            </li>
                          ))}
                        </ul>
                      </B>
                    );
                  })}
                  <H sub>{system.flowTitle ?? P.flowTitle}</H>
                  {chunk(system.flow, 4).map((row, index) => (
                    <B key={index}>
                      <ol className="dk-cards" style={cols(Math.min(system.flow.length, 4))} start={index * 4 + 1}>
                        {row.map((step, i) => (
                          <li key={step.title}>
                            <span className="dk-num">{index * 4 + i + 1}</span>
                            <b>{step.title}</b>
                            <span>{step.body}</span>
                          </li>
                        ))}
                      </ol>
                    </B>
                  ))}
                </>
              ) : project.architecture ? (
                <>
                  <H>{P.titles.architectureSimple}</H>
                  <B className="dk-arch">
                    {project.architecture.layers.map((layer) => (
                      <p key={layer} className="dk-arch-layer">
                        {layer}
                      </p>
                    ))}
                    <p className="dk-muted dk-center">{P.dataFlow}</p>
                    <p className="dk-arch-gateway">{project.architecture.gateway}</p>
                    <div style={cols(Math.min(project.architecture.sources.length, 4))}>
                      {project.architecture.sources.map((source) => (
                        <p key={source} className="dk-arch-source">
                          {source}
                        </p>
                      ))}
                    </div>
                  </B>
                </>
              ) : null}

              {/* 내용: 목록 (분석 결과·스킬 등) */}
              {project.catalog ? (
                <>
                  <H>{project.catalog.title}</H>
                  {project.catalog.figures?.map((figure) => (
                    <Ref key={figure.src} image={figure} />
                  ))}
                  {project.catalog.items.map((item) =>
                    item.steps ? (
                      <B key={item.name} className="dk-catalog-flow">
                        <p className="dk-item-title">{item.name}</p>
                        <ol className="dk-chain" style={cols(Math.min(item.steps.length, 7))}>
                          {item.steps.map((step, index) => (
                            <li key={`${index}-${step.text}`} className={step.flag ? "dk-flag" : ""}>
                              <span className="dk-num dk-num-sm">{index + 1}</span>
                              <span>{step.text}</span>
                              {step.flag ? <em>{step.flag}</em> : null}
                            </li>
                          ))}
                        </ol>
                        <p className="dk-pre dk-note">{item.body}</p>
                      </B>
                    ) : (
                      <B key={item.name} className="dk-catalog-row">
                        <b>{item.name}</b>
                        <span className="dk-pre">
                          {item.body}
                          {item.trigger ? (
                            <span className="dk-muted dk-block-line">
                              {P.trigger} {item.trigger}
                            </span>
                          ) : null}
                        </span>
                      </B>
                    )
                  )}
                </>
              ) : null}

              {/* 내용: 프로젝트 진행 */}
              {project.steps ? (
                <>
                  <H>{P.titles.process}</H>
                  <B>
                    <ol className="dk-steps" style={cols(project.steps.length)}>
                      {project.steps.map((step, index) => (
                        <li key={step}>
                          <span className="dk-step-no">{String(index + 1).padStart(2, "0")}</span>
                          <span className="dk-step-text">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </B>
                  {project.stepFigures?.map((figure) => (
                    <B key={figure.src}>
                      <Picture image={figure} />
                    </B>
                  ))}
                </>
              ) : null}

              {/* 내용: 비전 */}
              {project.vision ? (
                <>
                  <H>{P.titles.vision}</H>
                  <B>
                    <p>{project.vision.lead}</p>
                  </B>
                  <B className="dk-harness">
                    <HarnessDiagram jobs={project.vision.jobs} lang={lang} />
                  </B>
                  <H sub>{P.titles.visionHow}</H>
                  {chunk(project.vision.steps, 4).map((row, index) => (
                    <B key={index}>
                      <ol className="dk-cards" style={cols(Math.min(project.vision!.steps.length, 4))}>
                        {row.map((step, i) => (
                          <li key={step.title}>
                            <span className="dk-num">{index * 4 + i + 1}</span>
                            <b>{step.title}</b>
                            <span>{step.body}</span>
                          </li>
                        ))}
                      </ol>
                    </B>
                  ))}
                  <B>
                    <p className="dk-note">{project.vision.note}</p>
                  </B>
                </>
              ) : null}

              {/* 핵심 기능 */}
              {project.features ? (
                <>
                  <H>{project.featuresTitle ?? P.titles.features}</H>
                  {project.features.map((feature) => (
                    <Fragment key={feature.title}>
                      <B head className="dk-feature-head">
                        <p className="dk-feature-eyebrow">{feature.eyebrow}</p>
                        <p className="dk-item-title">{feature.title}</p>
                        <p>{feature.summary}</p>
                      </B>
                      {chunk(feature.items, 2).map((row, index) => (
                        <B key={index}>
                          <div className="dk-feature-items">
                            {row.map((item) => (
                              <div key={item.title}>
                                <b>{item.title}</b>
                                <span>{item.body}</span>
                              </div>
                            ))}
                          </div>
                        </B>
                      ))}
                    </Fragment>
                  ))}
                </>
              ) : null}

              {/* 상단 그림 중 1·2장에 쓰지 않은 나머지 */}
              {rest.map((image) => (
                <B key={image.src}>
                  <Picture image={image} />
                </B>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
