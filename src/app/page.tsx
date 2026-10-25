import { ProjectCard } from "@/components/project-card";
import { PARTS, PROFILE, PROJECTS, projectsByPart } from "@/data/projects";

export default function HomePage() {
  let counter = 0;
  return (
    <div className="grid gap-20">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-accent">PROJECT PORTFOLIO</p>
          <h1 className="ko-keep mt-4 text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">{PROFILE.tagline}</h1>
          <p className="mt-6 text-lg font-extrabold text-ink">{PROFILE.name}</p>
          <p className="ko-keep mt-3 max-w-2xl text-base leading-7 text-muted">{PROFILE.intro}</p>
        </div>
        <dl className="grid grid-cols-3 gap-3">
          {PARTS.map((part) => (
            <a key={part.no} href={`#part-${part.no}`} className={`part-${part.no} tone-soft rounded-2xl p-4 transition hover:-translate-y-0.5`}>
              <dt className="tone-text text-xs font-black tracking-[0.18em]">{part.code}</dt>
              <dd className="ko-keep mt-2 text-sm font-extrabold leading-5 text-ink">{part.title}</dd>
              <dd className="tone-text mt-3 text-2xl font-black">{projectsByPart(part.no).length}</dd>
            </a>
          ))}
        </dl>
      </section>

      {PARTS.map((part) => {
        const projects = projectsByPart(part.no);
        return (
          <section key={part.no} id={`part-${part.no}`} className={`part-${part.no} grid gap-6 scroll-mt-20`}>
            <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="tone-text text-xs font-black tracking-[0.18em]">{part.code}</p>
                <h2 className="ko-keep mt-1 text-3xl font-black text-ink">{part.title}</h2>
              </div>
              <p className="ko-keep text-base leading-7 text-muted">{part.summary}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                counter += 1;
                return <ProjectCard key={project.slug} project={project} index={counter} />;
              })}
            </div>
          </section>
        );
      })}

      <section className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <p className="text-xs font-black tracking-[0.18em] text-accent">TIMELINE</p>
        <ol className="mt-4 grid gap-2">
          {[...PROJECTS]
            .sort((a, b) => a.period.localeCompare(b.period))
            .map((project) => (
              <li key={project.slug} className={`part-${project.part} flex flex-col gap-1 border-b border-line py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6`}>
                <span className="w-44 shrink-0 text-sm font-bold text-muted">{project.period}</span>
                <a href={`/projects/${project.slug}`} className="ko-keep text-sm font-extrabold text-ink hover:underline">
                  <span className="tone-text mr-2 text-xs font-black">{PARTS[project.part - 1].code}</span>
                  {project.title}
                </a>
              </li>
            ))}
        </ol>
      </section>
    </div>
  );
}
