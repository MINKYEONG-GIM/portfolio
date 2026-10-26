import type { ReactNode } from "react";
import type { CatalogItem, FeatureSection, Insight, Metric, SystemArchitecture, VisionStep } from "@/data/projects";
import type { UIStrings } from "@/data/i18n";

export function SectionTitle({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div id={id} className="oy-title scroll-mt-24 flex items-baseline gap-3">
      <h2 className="ko-keep text-ink">{title}</h2>
      <span className="tone-text text-xs font-black tracking-[0.18em]">{eyebrow}</span>
    </div>
  );
}

export function Block({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`grid gap-5 ${className}`}>{children}</section>;
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  const cols = metrics.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : metrics.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2";
  return (
    <div className={`grid gap-3 ${cols}`}>
      {metrics.map((metric) => (
        <div key={metric.label} className="border border-line bg-paper p-5">
          <p className="text-3xl font-black leading-none text-[color:var(--price)] sm:text-4xl">{metric.value}</p>
          <p className="ko-keep mt-3 text-base font-extrabold text-ink">{metric.label}</p>
          {metric.note ? <p className="ko-keep mt-1 text-sm font-semibold text-muted">{metric.note}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function StepFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="oy-grid grid-cols-1 sm:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step} className="flex items-start gap-3 bg-paper p-4 sm:flex-col sm:gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-black text-paper">{index + 1}</span>
          <p className="ko-keep text-base font-bold leading-6 text-ink">{step}</p>
        </li>
      ))}
    </ol>
  );
}

export function InsightList({ insights, label }: { insights: Insight[]; label: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {insights.map((insight, index) => (
        <div key={insight.title} className="border border-line bg-paper p-5">
          <span className="pill pill-green">
            {label} {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="ko-keep mt-3 text-lg font-extrabold leading-7 text-ink">{insight.title}</h3>
          <p className="ko-keep mt-2 text-base leading-7 text-ink">{insight.body}</p>
        </div>
      ))}
    </div>
  );
}

export function FeatureSections({ features }: { features: FeatureSection[] }) {
  return (
    <div className="grid gap-8">
      {features.map((feature) => (
        <section key={feature.title} className="border border-line">
          <div className="oy-band flex flex-wrap items-baseline gap-3">
            <span className="tone-text text-xs font-black tracking-[0.18em]">{feature.eyebrow}</span>
            <h3 className="ko-keep text-ink">{feature.title}</h3>
          </div>
          <p className="ko-keep border-b border-line px-6 py-5 text-base leading-7 text-ink">{feature.summary}</p>
          <div className="grid md:grid-cols-2">
            {feature.items.map((item, index) => (
              <div
                key={item.title}
                className={`p-6 ${index % 2 === 0 ? "md:border-r md:border-line" : ""} ${index < feature.items.length - 2 ? "border-b border-line" : index === feature.items.length - 2 ? "border-b border-line md:border-b-0" : ""}`}
              >
                <h4 className="ko-keep text-lg font-extrabold text-ink">{item.title}</h4>
                <p className="ko-keep mt-2 text-base leading-7 text-ink">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ArchitectureDiagram({ layers, gateway, sources, flowLabel }: { layers: string[]; gateway: string; sources: string[]; flowLabel: string }) {
  return (
    <div className="grid gap-3 border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-2">
        {layers.map((layer) => (
          <div key={layer} className="border border-line bg-paper px-4 py-3 text-center text-base font-extrabold text-ink">
            {layer}
          </div>
        ))}
      </div>
      <div className="text-center text-sm font-extrabold text-muted">{flowLabel}</div>
      <div className="bg-ink px-4 py-3 text-center text-base font-black text-paper">{gateway}</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {sources.map((source) => (
          <div key={source} className="tone-soft tone-text px-3 py-3 text-center text-base font-extrabold">
            {source}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CatalogList({ items, triggerLabel }: { items: CatalogItem[]; triggerLabel: string }) {
  return (
    <table className="oy-table">
      <tbody>
        {items.map((item) => (
          <tr key={item.name}>
            <th scope="row">{item.name}</th>
            <td>
              <p className="ko-keep text-base leading-7 text-ink">{item.body}</p>
              {item.trigger ? (
                <p className="ko-keep mt-1 text-sm font-bold text-muted">
                  {triggerLabel} {item.trigger}
                </p>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function VisionSteps({ steps }: { steps: VisionStep[] }) {
  return (
    <ol className="oy-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="bg-paper p-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--accent)] text-sm font-black text-ink">{index + 1}</span>
          <h4 className="ko-keep mt-3 text-lg font-extrabold text-ink">{step.title}</h4>
          <p className="ko-keep mt-2 text-base leading-7 text-ink">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** 레이어별 구성 요소까지 보여 주는 상세 시스템 구조도 + 처리 흐름 + 원칙 */
export function SystemDiagram({ system, ui }: { system: SystemArchitecture; ui: UIStrings }) {
  return (
    <div className="grid gap-8">
      <p className="ko-keep max-w-4xl text-base leading-8 text-ink">{system.intro}</p>

      <div className="grid gap-0 border border-line">
        {system.layers.map((layer, index) => (
          <div
            key={layer.name}
            className={`grid gap-3 p-5 lg:grid-cols-[15rem_1fr] lg:gap-6 ${index < system.layers.length - 1 ? "border-b border-line" : ""} ${index === system.layers.length - 1 ? "tone-soft" : index % 2 === 1 ? "bg-surface" : "bg-paper"}`}
          >
            <div>
              <h3 className="ko-keep text-lg font-black text-ink">{layer.name}</h3>
              <p className="ko-keep mt-1 text-sm font-semibold leading-6 text-muted">{layer.role}</p>
              {index < system.layers.length - 1 ? <p className="mt-2 hidden text-xs font-black text-muted lg:block">{ui.project.nextLayer}</p> : null}
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {layer.items.map((item) => (
                <li key={item.label} className="border border-line bg-paper px-3 py-2">
                  <p className="text-sm font-extrabold text-ink">{item.label}</p>
                  {item.note ? <p className="ko-keep mt-0.5 text-xs font-semibold leading-5 text-muted">{item.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        <h3 className="ko-keep text-xl font-extrabold text-ink">{ui.project.flowTitle}</h3>
        <ol className="oy-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {system.flow.map((step, index) => (
            <li key={step.title} className="bg-paper p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-black text-paper">{index + 1}</span>
              <h4 className="ko-keep mt-3 text-base font-extrabold text-ink">{step.title}</h4>
              <p className="ko-keep mt-1 text-sm leading-6 text-ink">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-4">
        <h3 className="ko-keep text-xl font-extrabold text-ink">{ui.project.principlesTitle}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {system.principles.map((principle) => (
            <div key={principle.title} className="border border-line bg-paper p-5">
              <h4 className="ko-keep text-base font-extrabold text-ink">{principle.title}</h4>
              <p className="ko-keep mt-2 text-sm leading-6 text-ink">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
