// 프로필 사실 정보의 단일 출처. About 페이지, 빌드 시 구조화 데이터(JSON-LD), llms.txt가 함께 사용
// AI 검색(GEO)이 인용하기 쉽도록 짧고 사실적인 문장으로 유지
import type { Language } from "@/contexts/LanguageContext";

export const PROFILE = {
  name: "Ecyce",
  alternateNames: ["이끼끼", "Ecyce Studio"],
  jobTitle: "AI Video Ad Creator",
  location: { city: "Seoul", country: "South Korea", countryCode: "KR" },
  email: "ecyce.studio@gmail.com",
  links: {
    youtube: "https://www.youtube.com/@ecyce.studio",
    instagram: "https://www.instagram.com/ecyce.studio/",
  },
};

export const skills = [
  { category: "AI Platform", items: ["Higgsfield"] },
  { category: "AI Video", items: ["Seedance", "Kling", "Google Flow"] },
  { category: "AI Image", items: ["Seedream", "NanoBanana", "GPT Image", "MidJourney"] },
  { category: "Editing", items: ["Adobe Premiere Pro", "After Effects", "CapCut"] },
  { category: "Image", items: ["Adobe Photoshop", "Procreate", "Clip Studio"] },
  { category: "PM", items: ["Notion", "Figma", "Jira"] },
];

export const services: Record<Language, string[]> = {
  en: [
    "AI video ads and short-form ads (9:16 for Reels, YouTube Shorts and TikTok)",
    "AI brand films and commercials (16:9)",
    "AI music videos",
    "Storyboards, character sheets and consistent AI characters",
  ],
  ko: [
    "AI 광고 영상·숏폼 광고 (릴스, 유튜브 쇼츠, 틱톡용 9:16)",
    "AI 브랜드 필름·커머셜 (16:9)",
    "AI 뮤직비디오",
    "스토리보드, 캐릭터 시트, 일관된 AI 캐릭터 제작",
  ],
};

export const summary: Record<Language, string> = {
  en: "Ecyce (이끼끼) is an AI video creator based in Seoul, South Korea, who makes AI video ads, short-form ads, brand films and music videos. A former game developer, Ecyce handles the whole pipeline — storyboard, character sheets, AI image and video generation, editing and finishing — and has produced brand films for GS E&C's Xi apartment brand.",
  ko: "Ecyce(이끼끼)는 서울에서 활동하는 AI 영상 제작자로, AI 광고 영상, 숏폼 광고, 브랜드 필름, 뮤직비디오를 만듭니다. 게임 개발자 출신으로 스토리보드, 캐릭터 시트, AI 이미지·영상 생성, 편집과 마무리까지 전 과정을 직접 진행하며, GS건설 자이(Xi)의 브랜드 필름을 제작했습니다.",
};

export interface FaqItem {
  question: string;
  answer: string;
}

// includeEmail: Upwork 모드에서는 화면에서 이메일을 숨기기 위해 false로 호출
export function getFaq(language: Language, includeEmail = true): FaqItem[] {
  const contactEn = includeEmail
    ? `Email ${PROFILE.email}, or reach out through YouTube or Instagram (@ecyce.studio). Ecyce works remotely with clients worldwide.`
    : "Reach out through the platform you found this portfolio on. Ecyce works remotely with clients worldwide.";
  const contactKo = includeEmail
    ? `이메일(${PROFILE.email}) 또는 유튜브·인스타그램(@ecyce.studio)으로 연락할 수 있습니다. 원격으로 국내외 클라이언트와 작업합니다.`
    : "이 포트폴리오를 확인한 플랫폼을 통해 연락해 주세요. 원격으로 국내외 클라이언트와 작업합니다.";

  if (language === "en") {
    return [
      { question: "Who is Ecyce (이끼끼)?", answer: summary.en },
      { question: "What kind of videos does Ecyce make?", answer: `${services.en.join("; ")}.` },
      {
        question: "Has Ecyce worked with real brands?",
        answer: "Yes. Ecyce produced two AI brand films for Armuse XI, an apartment complex by GS E&C's Xi brand, published on the official Xi TV YouTube channel — one of them end to end from the storyboard on. Ecyce has also made contest entries for Woongjin Foods (Saengcha), Olidia and the U+ × YouTube Youth AI Shorts Festival.",
      },
      {
        question: "What is Ecyce's production process?",
        answer: "Concept and planning → storyboard → character sheets and key images (Seedream on Higgsfield, NanoBanana, GPT Image) → AI video generation (Seedance on Higgsfield, Kling) → editing and finishing (Premiere Pro, After Effects, Photoshop).",
      },
      { question: "Which tools does Ecyce use?", answer: skills.map((g) => `${g.category}: ${g.items.join(", ")}`).join(". ") + "." },
      { question: "How can I hire Ecyce?", answer: contactEn },
    ];
  }

  return [
    { question: "Ecyce(이끼끼)는 누구인가요?", answer: summary.ko },
    { question: "어떤 영상을 만드나요?", answer: `${services.ko.join(", ")}.` },
    {
      question: "실제 브랜드와 작업한 경험이 있나요?",
      answer: "네. GS건설 자이(Xi)의 아르뮤제자이 브랜드 필름 2편을 제작했고, 자이TV 공식 유튜브 채널에 공개되었습니다. 그중 한 편은 스토리보드부터 완성까지 직접 진행했습니다. 그 밖에 웅진식품(생차), 올리디아, U+ × YouTube 유쓰 AI 쇼츠 페스티벌 공모전 출품작을 만들었습니다.",
    },
    {
      question: "제작 과정은 어떻게 되나요?",
      answer: "콘셉트·기획 → 스토리보드 → 캐릭터 시트와 키 이미지 (Higgsfield의 Seedream, NanoBanana, GPT Image) → AI 영상 생성 (Higgsfield의 Seedance, Kling) → 편집·마무리 (Premiere Pro, After Effects, Photoshop) 순서로 진행합니다.",
    },
    { question: "어떤 툴을 사용하나요?", answer: skills.map((g) => `${g.category}: ${g.items.join(", ")}`).join(". ") + "." },
    { question: "작업을 의뢰하려면 어떻게 하나요?", answer: contactKo },
  ];
}
