import type { Language } from "@/contexts/LanguageContext";

export interface ContentBlock {
  type: "text" | "heading" | "image";
  text?: string;       // type이 "text" 또는 "heading"일 때
  src?: string;         // type이 "image"일 때
  caption?: string;     // 이미지 밑 캡션 (선택)
}

// Work 페이지 섹션 구분. "fan"은 음원 저작권 이슈로 홈 노출에서 제외
export type WorkSection = "commercial" | "film" | "fan";

// 작업 성격 — 카드/상세에 배지로 표시
export type WorkType = "spec" | "contest" | "team" | "fan";

export interface AdBrief {
  hook: string;
  audience: string;
  goal: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  section: WorkSection;
  workType: WorkType;
  brandDisclaimer?: boolean; // 실제 브랜드명이 들어간 비의뢰 작업
  year: string;
  thumbnail: string;
  format: "9:16" | "16:9";
  duration: number; // seconds
  platforms: string[];
  videoUrl?: string;
  youtubeId?: string;
  description: string;
  brief?: AdBrief;
  content?: ContentBlock[];
  role: string;
  tools: string[];
  aiTools?: string[];
  tags: string[];
  featured?: boolean;
}

const SHORTS_PLATFORMS = ["YouTube Shorts", "Reels / TikTok ready"];

const SAENGCHA_IMAGES = {
  character1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Fbdc3ebb1-e20c-407a-b679-5cb2a1010a2c.png&w=1920&q=85",
  character2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Ff03d975f-9a19-465f-8862-b8e8a4177a29.png&w=1920&q=85",
  background1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Fhf_20260804_013401_c9b2ad14-30d2-46ff-b0a8-c4e5bcef8861.png&w=1920&q=85",
  background2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Fhf_20260805_014854_904ddd37-4058-4074-b02e-2d43b18ca8a2_min.webp&w=1920&q=85",
  prop: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2F5feb962b-2996-4fec-aac2-83e7bd6d6ca4.png&w=1920&q=85",
};

const GUIRANG_PROCESS_KO: ContentBlock[] = [
  { type: "heading", text: "PROCESS" },
  { type: "text", text: "기획·스크립트 (팀 PM) > AI 이미지 제작 (NanoBanana, GPT) > AI 영상 제작 (Omni Flash, Kling) > 영상 편집 (Premiere Pro)" },
];

const GUIRANG_PROCESS_EN: ContentBlock[] = [
  { type: "heading", text: "PROCESS" },
  { type: "text", text: "Planning & script (as team PM) > AI image creation (NanoBanana, GPT) > AI video generation (Omni Flash, Kling) > Editing (Premiere Pro)" },
];

export const projects: Project[] = [
  {
    slug: "woongjin_saengcha_contest",
    title: "첫 만남은 너무 어려워, 그런데 생차가 있다면?",
    client: "Spec Ad (Contest Entry) — [웅진식품] 제2회 생차(生茶)-LOG AI 숏필름 공모전",
    category: "Commercial",
    section: "commercial",
    workType: "spec",
    brandDisclaimer: true,
    year: "2026",
    format: "9:16",
    duration: 29,
    platforms: SHORTS_PLATFORMS,
    thumbnail: "https://i.ytimg.com/vi/38XLXKgK6Dc/hqdefault.jpg",
    youtubeId: "38XLXKgK6Dc",
    description: "어쩌면 흑역사가 되었을 떨떠름한 첫 만남이 '생차'와 함께 하기에 추억이 된다는 이야기를 담은 음료 광고 영상입니다.",
    brief: {
      hook: "누구나 겪어본, 얼어붙은 첫 만남의 어색함으로 시작",
      audience: "새 학기·새 모임을 앞둔 20대",
      goal: "'어색함을 풀어주는 음료 = 생차' 브랜드 연상 만들기",
    },
    role: "AI Creator",
    tools: ["Premiere Pro", "After Effects"],
    aiTools: ["Seedream", "NanoBanana", "Claude", "Seedance", "Kling Pro"],
    tags: ["Commercial", "Shorts", "Text Animation"],
    content: [
      { type: "heading", text: "PROCESS" },
      { type: "text", text: "기획 > AI 이미지 제작 > AI 영상 제작 (Seedance 2.0, Kling O3 Pro) > 영상 편집" },
      { type: "heading", text: "AI IMAGE" },
      { type: "text", text: "[Character Sheet] 전신 이미지 생성(Seedream 4.5) > 시트 이미지로 변경 (NanoBanana)" },
      { type: "image", src: SAENGCHA_IMAGES.character1, caption: "캐릭터 1 - 유나" },
      { type: "image", src: SAENGCHA_IMAGES.character2, caption: "캐릭터 2 - 효정" },
      { type: "text", text: "[Background] 레퍼런스 기반 배경 이미지 생성 (Seedream)" },
      { type: "image", src: SAENGCHA_IMAGES.background1 },
      { type: "image", src: SAENGCHA_IMAGES.background2 },
      { type: "text", text: "[Prop] 입체감이 명확한 음료 이미지로 재생성 (GPT)" },
      { type: "image", src: SAENGCHA_IMAGES.prop },
    ],
    featured: true,
  },

  {
    slug: "olidia_glowing_skin",
    title: "올리디아, 빛나는 피부를 찾아서",
    client: "Contest Entry — 올리디아 AI 29역 숏폼왕 공모전",
    category: "Commercial",
    section: "commercial",
    workType: "contest",
    brandDisclaimer: true,
    year: "2026",
    format: "9:16",
    duration: 43,
    platforms: SHORTS_PLATFORMS,
    thumbnail: "https://i.ytimg.com/vi/FeydfhqrjNk/hqdefault.jpg",
    youtubeId: "FeydfhqrjNk",
    description: "피부 컨디션이 나빠져 고민이던 직장인 A씨. 어느 날 몰라보게 좋아진 동료 B의 피부를 보고 그 비법을 찾아 나서게 되는 이야기입니다. 올리디아 AI 29역 숏폼왕 공모전 출품작.",
    brief: {
      hook: "\"너 피부 왜 이렇게 좋아졌어?\" — 동료의 변화에서 시작하는 호기심",
      audience: "피부 컨디션 고민이 있는 20~30대 직장인",
      goal: "문제 → 해결 스토리로 제품에 대한 궁금증과 탐색 유도",
    },
    role: "AI Creator",
    tools: ["Premiere Pro"],
    aiTools: ["NanoBanana", "GPT", "Omni Flash"],
    tags: ["Shorts", "Commercial"],
    content: [
      { type: "heading", text: "PROCESS" },
      { type: "text", text: "기획·스토리보드 > AI 이미지 제작 (NanoBanana, GPT) > AI 영상 제작 (Omni Flash) > 영상 편집 (Premiere Pro)" },
    ],
  },

  {
    slug: "guirang_workshop_promo_1",
    title: "귀랑공방 홍보 영상 1편",
    client: "Team Project — Brand Promo for a Craft Workshop",
    category: "Commercial",
    section: "commercial",
    workType: "team",
    year: "2026",
    format: "9:16",
    duration: 22,
    platforms: SHORTS_PLATFORMS,
    thumbnail: "https://i.ytimg.com/vi/IXd5X1n1cCQ/hqdefault.jpg",
    youtubeId: "IXd5X1n1cCQ",
    description: "AI 영상 제작 팀 프로젝트로, 팀원이 운영하는 공방의 브랜드를 알리기 위해 유쾌하고 개성 있는 톤으로 제작한 홍보 영상 시리즈 1편입니다.",
    brief: {
      hook: "첫 장면부터 시선을 잡는 유쾌한 캐릭터 코미디",
      audience: "원데이 클래스·이색 취미를 찾는 20~30대",
      goal: "공방 브랜드 인지도와 프로필 방문 늘리기",
    },
    role: "PM, Planning, AI Creator",
    tools: ["Premiere Pro"],
    aiTools: ["NanoBanana", "GPT", "Omni Flash", "Kling"],
    tags: ["Shorts", "Commercial"],
    content: GUIRANG_PROCESS_KO,
  },

  {
    slug: "guirang_workshop_promo_2",
    title: "귀랑공방 홍보 영상 2편",
    client: "Team Project — Brand Promo for a Craft Workshop",
    category: "Commercial",
    section: "commercial",
    workType: "team",
    year: "2026",
    format: "9:16",
    duration: 20,
    platforms: SHORTS_PLATFORMS,
    thumbnail: "https://i.ytimg.com/vi/fjfZX1OPVx4/hqdefault.jpg",
    youtubeId: "fjfZX1OPVx4",
    description: "AI 영상 제작 팀 프로젝트로, 팀원이 운영하는 공방의 브랜드를 알리기 위해 유쾌하고 개성 있는 톤으로 제작한 홍보 영상 시리즈 2편입니다.",
    brief: {
      hook: "1편의 캐릭터와 톤을 이어가는 시리즈형 코미디",
      audience: "원데이 클래스·이색 취미를 찾는 20~30대",
      goal: "반복 노출로 브랜드 톤을 기억에 남기기",
    },
    role: "PM, Planning, AI Creator",
    tools: ["Premiere Pro"],
    aiTools: ["NanoBanana", "GPT", "Omni Flash", "Kling"],
    tags: ["Shorts", "Commercial"],
    content: GUIRANG_PROCESS_KO,
  },

  {
    slug: "beyond_sound",
    title: "Beyond Sound",
    client: "Contest Entry — [U+ x YouTube] 유쓰 AI 쇼츠 페스티벌",
    category: "Art Film",
    section: "film",
    workType: "contest",
    year: "2026",
    format: "9:16",
    duration: 35,
    platforms: ["YouTube Shorts"],
    thumbnail: "https://i.ytimg.com/vi/OxO8BnWn4YM/hqdefault.jpg",
    youtubeId: "OxO8BnWn4YM",
    description: "목소리 역시 수많은 소리(Sound) 중 하나이지만, 화자의 고유성이 더해질 때 비로소 단 하나뿐인 '목소리(Voice)'가 됨을 AI 비주얼 아트로 표현한 작품입니다. [U+ x YouTube] 유쓰 AI 쇼츠 페스티벌 출품작.",
    role: "AI Creator",
    tools: ["Premiere Pro", "After Effects"],
    aiTools: ["Midjourney", "Kling", "Seedance", "Claude"],
    tags: ["Shorts", "Art Film"],
  },

  {
    slug: "billlie_work_fmv",
    title: "Billlie | 'Work' M/V가 없어서 만들어본 FMV",
    client: "Personal — Fan Work (non-commercial)",
    category: "Fan Music Video",
    section: "fan",
    workType: "fan",
    year: "2026",
    format: "16:9",
    duration: 60,
    platforms: ["YouTube"],
    thumbnail: "https://i.ytimg.com/vi/oS2ea0jQPYA/hqdefault.jpg",
    youtubeId: "oS2ea0jQPYA",
    description: "빌리(Billlie)의 'Work'를 들으면 그 순간부터 패션쇼가 펼쳐진다는 콘셉트로 제작한 뮤직비디오입니다. 비트에 맞춰 영상을 편집하고 중간중간 모션 그래픽을 더했습니다.",
    role: "AI Creator, Motion Graphics",
    tools: ["Premiere Pro", "After Effects"],
    aiTools: ["NanoBanana", "Omni Flash", "Kling"],
    tags: ["Music Video", "Motion Graphics"],
  },

  {
    slug: "54321_amazing_digital_circus_fmv",
    title: "54321 | The Amazing Digital Circus [FMV]",
    client: "Personal — Fan Work (non-commercial)",
    category: "Fan Music Video",
    section: "fan",
    workType: "fan",
    year: "2026",
    format: "16:9",
    duration: 190,
    platforms: ["YouTube"],
    thumbnail: "https://i.ytimg.com/vi/OnPhj1qvxjw/hqdefault.jpg",
    youtubeId: "OnPhj1qvxjw",
    description: "애니메이션 '더 어메이징 디지털 서커스'의 팬 뮤직비디오로, 남녀 듀엣 곡에 맞춰 등장인물에 포커스를 맞춘 연출을 시도했습니다. 노래의 비트에 맞춰 영상을 편집했습니다.",
    role: "Editor, Rotoscoping",
    tools: ["Premiere Pro", "After Effects"],
    tags: ["Music Video", "Rotoscoping"],
  },
];

// 추후 추가할 영어 광고 샘플 자리. 실제 작업이 생기면 projects에 추가하고 여기서 제거
// 빈 카드가 작업물이 부족해 보이게 하므로 기본은 숨김. 노출하려면 true로 변경
export const showUpcomingSlots = false;

export interface UpcomingSlot {
  key: string;
  title: Record<Language, string>;
  format: "9:16" | "16:9";
}

export const upcomingSlots: UpcomingSlot[] = [
  { key: "ugc_talking_head", title: { ko: "AI UGC Talking-Head Ad", en: "AI UGC Talking-Head Ad" }, format: "9:16" },
  { key: "product_demo", title: { ko: "Product Demo Ad", en: "Product Demo Ad" }, format: "16:9" },
  { key: "shortform_en", title: { ko: "9:16 Short-form Ad (English)", en: "9:16 Short-form Ad (English)" }, format: "9:16" },
];

export interface WorkSectionGroup {
  key: WorkSection;
  name: string;
  note?: string;
  projects: Project[];
}

const sectionMeta: { key: WorkSection; name: string; note?: Record<Language, string> }[] = [
  { key: "commercial", name: "Commercial" },
  { key: "film", name: "Short Film & Art" },
  {
    key: "fan",
    name: "Personal / Fan Work",
    note: {
      ko: "음원 저작권이 아티스트에게 있는 비상업적 팬 작업입니다.",
      en: "Non-commercial fan works. Music rights belong to the original artists.",
    },
  },
];

export const workTypeLabels: Record<WorkType, string> = {
  spec: "Spec Ad",
  contest: "Contest Entry",
  team: "Team Project",
  fan: "Fan Work",
};

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}


export interface ProjectTranslation {
  title: string;
  description: string;
  client?: string;
  category?: string;
  role?: string;
  tags?: string[];
  brief?: AdBrief;
  content?: ContentBlock[];
}

const englishProjectTranslations: Record<string, ProjectTranslation> = {
  woongjin_saengcha_contest: {
    title: "Woongjin Saengcha — The Awkward First Meeting",
    client: "Spec Ad (Contest Entry) — 2nd Saengcha-LOG AI Short Film Contest by Woongjin Foods",
    description:
      "A beverage spot about how an awkward first meeting turns into a fond memory when Saengcha is part of it.",
    brief: {
      hook: "Opens on a frozen, painfully awkward first meeting everyone has lived through.",
      audience: "People in their 20s heading into new classes, clubs and first meetings.",
      goal: "Build the association: Saengcha is the drink that breaks the ice.",
    },
    content: [
      { type: "heading", text: "PROCESS" },
      { type: "text", text: "Planning > AI image creation > AI video generation (Seedance 2.0, Kling O3 Pro) > Editing" },
      { type: "heading", text: "AI IMAGE" },
      { type: "text", text: "[Character Sheet] Full-body image generation (Seedream 4.5) > Turned into a character sheet (NanoBanana)" },
      { type: "image", src: SAENGCHA_IMAGES.character1, caption: "Character 1 — Yuna" },
      { type: "image", src: SAENGCHA_IMAGES.character2, caption: "Character 2 — Hyojeong" },
      { type: "text", text: "[Background] Reference-based background generation (Seedream)" },
      { type: "image", src: SAENGCHA_IMAGES.background1 },
      { type: "image", src: SAENGCHA_IMAGES.background2 },
      { type: "text", text: "[Prop] Regenerated the bottle as a cleaner, more dimensional product shot (GPT)" },
      { type: "image", src: SAENGCHA_IMAGES.prop },
    ],
  },
  olidia_glowing_skin: {
    title: "Olidia — In Search of Glowing Skin",
    client: "Contest Entry — Olidia AI Shortform Contest",
    description:
      "An office worker worried about her dull skin notices a coworker's sudden glow-up — and sets out to find the secret. Created for the Olidia AI Shortform Contest.",
    brief: {
      hook: "\"What happened to your skin?\" — a coworker's glow-up sparks instant curiosity.",
      audience: "Office workers in their 20s–30s dealing with tired, dull skin.",
      goal: "Problem → solution storytelling that drives curiosity and product discovery.",
    },
    content: [
      { type: "heading", text: "PROCESS" },
      { type: "text", text: "Planning & storyboard > AI image creation (NanoBanana, GPT) > AI video generation (Omni Flash) > Editing (Premiere Pro)" },
    ],
  },
  guirang_workshop_promo_1: {
    title: "Guirang Workshop — Brand Promo #1",
    description:
      "Episode 1 of a playful, character-driven promo series made in an AI video team project to raise awareness for a teammate's craft workshop.",
    brief: {
      hook: "Character comedy that grabs attention from the very first frame.",
      audience: "People in their 20s–30s looking for one-day classes and unique hobbies.",
      goal: "Build awareness for the workshop brand and drive profile visits.",
    },
    content: GUIRANG_PROCESS_EN,
  },
  guirang_workshop_promo_2: {
    title: "Guirang Workshop — Brand Promo #2",
    description:
      "Episode 2 of a playful, character-driven promo series made in an AI video team project to raise awareness for a teammate's craft workshop.",
    brief: {
      hook: "Picks up the characters and tone from Episode 1 as a recurring series.",
      audience: "People in their 20s–30s looking for one-day classes and unique hobbies.",
      goal: "Make the brand's tone memorable through repeated exposure.",
    },
    content: GUIRANG_PROCESS_EN,
  },
  beyond_sound: {
    title: "Beyond Sound",
    client: "Contest Entry — U+ × YouTube Youth AI Shorts Festival",
    description:
      "An AI visual-art film about how a voice — just one sound among many — becomes something singular once the speaker's identity is added. Created for the U+ × YouTube Youth AI Shorts Festival.",
  },
  billlie_work_fmv: {
    title: "Billlie 'WORK' — Fan Music Video",
    description:
      "A fan-made music video built on the idea that the moment Billlie's 'WORK' starts, the world turns into a runway. Cut to the beat with motion-graphic accents throughout.",
  },
  "54321_amazing_digital_circus_fmv": {
    title: "54321 — The Amazing Digital Circus (Fan Music Video)",
    description:
      "A fan music video for The Amazing Digital Circus, staged around the characters and cut to the rhythm of a male-female duet.",
  },
};

export function localizeProject(project: Project, language: Language): Project {
  if (language === "ko") return project;

  const translation = englishProjectTranslations[project.slug];
  return translation ? { ...project, ...translation } : project;
}

export function getLocalizedProjects(language: Language): Project[] {
  return projects.map((project) => localizeProject(project, language));
}

export function getLocalizedSections(language: Language): WorkSectionGroup[] {
  const localized = getLocalizedProjects(language);
  return sectionMeta.map(({ key, name, note }) => ({
    key,
    name,
    note: note?.[language],
    projects: localized.filter(p => p.section === key),
  }));
}

export function getLocalizedProjectBySlug(slug: string, language: Language): Project | undefined {
  const project = getProjectBySlug(slug);
  return project ? localizeProject(project, language) : undefined;
}
