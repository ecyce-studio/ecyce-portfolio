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
      description: "Ecyce (이끼끼) is an AI video creator in Seoul, Korea, making AI video ads, short-form ads (Reels, Shorts, TikTok), brand films and music videos — including brand films for GS E&C's Xi.",
    },
    ko: {
      title: `${BRAND} | AI Video Ad Creator`,
      description: "AI 영상 제작자 이끼끼(Ecyce)의 포트폴리오. 스토리보드부터 AI 이미지·영상 생성, 편집까지 AI 광고 영상, 숏폼 광고, 브랜드 필름, 뮤직비디오를 제작합니다. GS건설 자이 브랜드 필름 제작.",
    },
  },
  work: {
    en: {
      title: `Work | ${BRAND} — AI Video Ad Creator`,
      description: "AI video work by Ecyce (이끼끼) — client brand films for GS E&C Xi, AI ads, short-form commercials and art films, with format, length, tools and ad brief for each.",
    },
    ko: {
      title: `Work | ${BRAND} — AI Video Ad Creator`,
      description: "AI 영상 제작자 이끼끼(Ecyce)의 작업물 — GS건설 자이 브랜드 필름, AI 광고 영상, 숏폼 커머셜, 아트 필름. 프로젝트별 포맷·길이·툴·제작 과정을 확인할 수 있습니다.",
    },
  },
  about: {
    en: {
      title: `About | ${BRAND} — AI Video Ad Creator`,
      description: "About Ecyce (이끼끼) — a former game developer turned AI video creator in Seoul. Services, production process, tools (Higgsfield, Seedance, Seedream, NanoBanana, Premiere Pro) and how to hire.",
    },
    ko: {
      title: `About | ${BRAND} — AI Video Ad Creator`,
      description: "AI 영상 제작자 이끼끼(Ecyce) 소개 — 게임 개발자 출신. 제작 가능한 영상, 제작 과정, 사용 툴(Higgsfield, Seedance, Seedream, NanoBanana, Premiere Pro), 의뢰 방법.",
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
