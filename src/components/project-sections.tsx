import type { ReactNode } from "react";
import type { CatalogItem, FeatureSection, Insight, Metric, VisionStep } from "@/data/projects";

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

export function InsightList({ insights }: { insights: Insight[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {insights.map((insight, index) => (
        <div key={insight.title} className="border border-line bg-paper p-5">
          <span className="pill pill-green">INSIGHT {String(index + 1).padStart(2, "0")}</span>
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
              <div key={item.title} className={`p-6 ${index % 2 === 0 ? "md:border-r md:border-line" : ""} ${index < feature.items.length - 2 ? "border-b border-line" : index === feature.items.length - 2 ? "border-b border-line md:border-b-0" : ""}`}>
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

export function ArchitectureDiagram({ layers, gateway, sources }: { layers: string[]; gateway: string; sources: string[] }) {
  return (
    <div className="grid gap-3 border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-2">
        {layers.map((layer) => (
          <div key={layer} className="border border-line bg-paper px-4 py-3 text-center text-base font-extrabold text-ink">
            {layer}
          </div>
        ))}
      </div>
      <div className="text-center text-sm font-extrabold text-muted">↓ 데이터 흐름 ↓</div>
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

export function CatalogList({ items }: { items: CatalogItem[] }) {
  return (
    <table className="oy-table">
      <tbody>
        {items.map((item) => (
          <tr key={item.name}>
            <th scope="row">{item.name}</th>
            <td>
              <p className="ko-keep text-base leading-7 text-ink">{item.body}</p>
              {item.trigger ? <p className="ko-keep mt-1 text-sm font-bold text-muted">호출: {item.trigger}</p> : null}
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
