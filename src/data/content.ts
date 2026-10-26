import type { Lang } from "@/lib/lang";
import { PARTS, PROFILE, PROJECTS, type Part, type Project } from "@/data/projects";
import { PARTS_EN, PROFILE_EN, PROJECTS_EN } from "@/data/projects.en";

export type Content = { parts: Part[]; profile: typeof PROFILE; projects: Project[] };

/** 언어에 맞는 파트·프로필·프로젝트. 영어는 한국어 원본 위에 번역을 덮어씁니다. */
export function getContent(lang: Lang): Content {
  if (lang === "ko") return { parts: PARTS, profile: PROFILE, projects: PROJECTS };
  return {
    parts: PARTS.map((part) => ({ ...part, ...(PARTS_EN[part.no] ?? {}) }) as Part),
    profile: { ...PROFILE, ...PROFILE_EN },
    projects: PROJECTS.map((project) => ({ ...project, ...(PROJECTS_EN[project.slug] ?? {}) }) as Project)
  };
}

/** 일반 방문자에게는 준비 중(draft) 프로젝트를 숨깁니다. 관리자는 전부 봅니다. */
export function visibleProjects(projects: Project[], admin: boolean) {
  return admin ? projects : projects.filter((project) => !project.draft);
}

export function byPart(projects: Project[], part: number) {
  return projects.filter((project) => project.part === part);
}

export function neighborsOf(projects: Project[], slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null
  };
}

/** 진행 상태 글자. 명시된 status 가 없으면 기간 문구로 판단합니다. */
export function statusOf(project: Project, labels: { done: string; ongoing: string }) {
  if (project.status) return project.status;
  return /진행 중|운영 중|ongoing|in operation/i.test(project.period) ? labels.ongoing : labels.done;
}

export function groupLabel(project: Project) {
  return project.group.replace(/^[①-⑩] /, "");
}
