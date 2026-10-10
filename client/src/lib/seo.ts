// 페이지별 title/description. 클라이언트(usePageMeta)와 빌드 시 scripts/prerender.mjs가 함께 사용
import type { Language } from "@/contexts/LanguageContext";
import type { Project } from "./projects";

export const SITE_URL = "https://ecyce-studio.github.io/ecyce-portfolio";
export const BRAND = "Ecyce (이끼끼)";

export interface PageMeta {
  title: string;
  description: string;
}

type StaticPage = "home" | "work" | "about";

const staticPageMeta: Record<StaticPage, Record<Language, PageMeta>> = {
  home: {
    en: {
      title: `${BRAND} | AI Video Ad Creator`,
      description: "Ecyce is an AI video ad creator based in Korea, making scroll-stopping short-form ads (9:16 Reels, Shorts, TikTok) and commercials with AI image and video generation.",
    },
    ko: {
      title: `${BRAND} | AI Video Ad Creator`,
      description: "이끼끼(Ecyce)의 AI 광고 영상 포트폴리오. 기획부터 AI 이미지·영상 생성, 편집까지 숏폼 광고와 커머셜을 제작합니다.",
    },
  },
  work: {
    en: {
      title: `Work | ${BRAND} — AI Video Ad Creator`,
      description: "AI video ads, short-form commercials and art films by Ecyce — spec ads, contest entries and team projects with format, length and ad brief for each.",
    },
    ko: {
      title: `Work | ${BRAND} — AI Video Ad Creator`,
      description: "이끼끼(Ecyce)의 작업물 — AI 광고 영상, 숏폼 커머셜, 아트 필름. 프로젝트별 포맷·길이·제작 과정을 확인할 수 있습니다.",
    },
  },
  about: {
    en: {
      title: `About | ${BRAND} — AI Video Ad Creator`,
      description: "About Ecyce — a former game developer turned AI video ad creator, with a structured production pipeline and tools like Seedance, Kling, Seedream and Premiere Pro.",
    },
    ko: {
      title: `About | ${BRAND} — AI Video Ad Creator`,
      description: "이끼끼(Ecyce) 소개 — 게임 개발자 출신 AI 광고 영상 크리에이터. 체계적인 제작 프로세스와 사용 툴(Seedance, Kling, Seedream, Premiere Pro 등).",
    },
  },
};

export function getStaticPageMeta(page: StaticPage, language: Language): PageMeta {
  return staticPageMeta[page][language];
}

export function getProjectPageMeta(project: Project): PageMeta {
  return {
    title: `${project.title} | ${BRAND}`,
    description: project.description,
  };
}

// GitHub Pages는 디렉터리 index.html을 끝 슬래시 주소로 서빙하므로 canonical도 슬래시로 통일
export function canonicalUrl(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `${SITE_URL}/${clean}/` : `${SITE_URL}/`;
}
