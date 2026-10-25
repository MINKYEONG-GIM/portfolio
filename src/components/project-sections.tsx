import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { CatalogItem, FeatureSection, Insight, Metric, VisionStep } from "@/data/projects";

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="tone-text text-xs font-black tracking-[0.18em]">{eyebrow}</p>
      <h2 className="ko-keep mt-1 text-2xl font-extrabold text-ink">{title}</h2>
    </div>
  );
}

export function Block({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`grid gap-6 ${className}`}>{children}</section>;
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  const cols = metrics.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : metrics.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid gap-3 ${cols}`}>
      {metrics.map((metric) => (
        <div key={metric.label} className="tone-soft rounded-2xl p-5">
          <p className="tone-text text-3xl font-black leading-none sm:text-4xl">{metric.value}</p>
          <p className="ko-keep mt-3 text-sm font-bold text-ink">{metric.label}</p>
          {metric.note ? <p className="ko-keep mt-1 text-xs font-semibold text-muted">{metric.note}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function StepFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-5">
      {steps.map((step, index) => (
        <li key={step} className="relative rounded-2xl border border-line bg-surface p-4">
          <span className="tone-text text-xs font-black tracking-[0.18em]">{String(index + 1).padStart(2, "0")}</span>
          <p className="ko-keep mt-2 text-sm font-bold leading-6 text-ink">{step}</p>
          {index < steps.length - 1 ? (
            <ArrowRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted sm:block" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function InsightList({ insights }: { insights: Insight[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {insights.map((insight, index) => (
        <div key={insight.title} className="rounded-2xl border border-line bg-paper p-5">
          <p className="tone-text text-xs font-black tracking-[0.18em]">INSIGHT {String(index + 1).padStart(2, "0")}</p>
          <h3 className="ko-keep mt-2 text-base font-extrabold text-ink">{insight.title}</h3>
          <p className="ko-keep mt-2 text-sm leading-6 text-muted">{insight.body}</p>
        </div>
      ))}
    </div>
  );
}

export function FeatureSections({ features }: { features: FeatureSection[] }) {
  return (
    <div className="grid gap-10">
      {features.map((feature) => (
        <section key={feature.title} className="grid gap-5 rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div>
              <p className="tone-text text-xs font-black tracking-[0.18em]">{feature.eyebrow}</p>
              <h3 className="ko-keep mt-1 text-2xl font-extrabold text-ink sm:text-3xl">{feature.title}</h3>
            </div>
            <p className="ko-keep text-base leading-7 text-muted">{feature.summary}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {feature.items.map((item) => (
              <div key={item.title} className="rounded-2xl bg-paper p-5">
                <h4 className="ko-keep text-base font-extrabold text-ink">{item.title}</h4>
                <p className="ko-keep mt-2 text-sm leading-6 text-muted">{item.body}</p>
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
    <div className="grid gap-3 rounded-3xl border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-2">
        {layers.map((layer) => (
          <div key={layer} className="rounded-xl border border-line bg-paper px-4 py-3 text-center text-sm font-bold text-ink">
            {layer}
          </div>
        ))}
      </div>
      <div className="text-center text-xs font-bold text-muted">↓ 데이터 흐름 ↓</div>
      <div className="tone-bg rounded-xl px-4 py-3 text-center text-sm font-black text-white">{gateway}</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {sources.map((source) => (
          <div key={source} className="tone-soft tone-text rounded-xl px-3 py-3 text-center text-sm font-bold">
            {source}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CatalogList({ items }: { items: CatalogItem[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.name} className="rounded-2xl border border-line bg-paper p-5">
          <h3 className="text-base font-extrabold text-ink">{item.name}</h3>
          {item.trigger ? <p className="ko-keep mt-1 text-xs font-bold text-muted">호출: {item.trigger}</p> : null}
          <p className="ko-keep mt-2 text-sm leading-6 text-muted">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function VisionSteps({ steps }: { steps: VisionStep[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-2xl border border-line bg-surface p-5">
          <span className="tone-text text-xs font-black tracking-[0.18em]">STEP {String(index + 1).padStart(2, "0")}</span>
          <h4 className="ko-keep mt-2 text-base font-extrabold text-ink">{step.title}</h4>
          <p className="ko-keep mt-2 text-sm leading-6 text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
