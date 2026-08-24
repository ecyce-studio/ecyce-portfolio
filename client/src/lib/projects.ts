export interface ContentBlock {
  type: "text" | "heading" | "image";
  text?: string;       // type이 "text" 또는 "heading"일 때
  src?: string;         // type이 "image"일 때
  caption?: string;     // 이미지 밑 캡션 (선택)
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  thumbnail: string;
  orientation?: "landscape" | "portrait";
  videoUrl?: string;
  youtubeId?: string;
  description: string;
  process?: string;
  content?: ContentBlock[];
  role: string;
  tools: string[];
  aiTools?: string[];
  tags: string[];
  featured?: boolean;
}

export interface ClientGroup {
  name: string;
  projects: Project[];
}

export const projects: Project[] = [
  {
    slug: "woongjin_saengcha_contest",
    title: "첫 만남은 너무 어려워, 그런데 생차가 있다면?",
    client: "Personal",
    category: "Commercial",
    year: "2026",
    orientation: "portrait",
    thumbnail: "https://i.ytimg.com/vi/38XLXKgK6Dc/hqdefault.jpg",
    youtubeId: "38XLXKgK6Dc",
    description: "어쩌면 흑역사가 되었을 떨떠름한 첫 만남이 '생차'와 함께 하기에 추억이 된다는 이야기를 담은 음료 광고 영상입니다. ",
    role: "AI Creator",
    tools: ["Premiere Pro", "After Effects"],
    aiTools: ["Seedream", "NanoBanana", "Claude", "Seedance", "Kling Pro"],
    tags: ["Commercial", "Shorts", "Text Animation"],
    content: [
      { type: "heading", text: "PROCESS" },
      { type: "text", text: "기획 > AI 이미지 제작 > AI 영상 제작 (Seedance 2.0, Kling O3 Pro) > 영상 편집" },
      { type: "heading", text: "AI IMAGE" },
      { type: "text", text: "[Character Sheet] 전신 이미지 생성(Seedream 4.5) > 시트 이미지로 변경 (NanoBanana)" },
      { type: "image", src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Fbdc3ebb1-e20c-407a-b679-5cb2a1010a2c.png&w=1920&q=85", caption: "캐릭터 1 - 유나" },
      { type: "image", src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Ff03d975f-9a19-465f-8862-b8e8a4177a29.png&w=1920&q=85", caption: "캐릭터 2 - 효정" },
      { type: "text", text: "[Background] 레퍼런스 기반 배경 이미지 생성 (Seedream)" },
      { type: "image", src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Fhf_20260804_013401_c9b2ad14-30d2-46ff-b0a8-c4e5bcef8861.png&w=1920&q=85" },
      { type: "image", src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2Fhf_20260805_014854_904ddd37-4058-4074-b02e-2d43b18ca8a2_min.webp&w=1920&q=85" },
      { type: "text", text: "[Prop] 입체감이 명확한 음료 이미지로 재생성 (GPT)" },
      { type: "image", src: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3CbkxukKmtCGExZ5uktUQ3QYa2z%2F5feb962b-2996-4fec-aac2-83e7bd6d6ca4.png&w=1920&q=85" },
    ],
    featured: true,
  },

  {
    slug: "beyond_sound",
    title: "Beyond Sound",
    client: "Personal",
    category: "Art Film",
    year: "2026",
    orientation: "portrait",
    thumbnail: "https://i.ytimg.com/vi/OxO8BnWn4YM/hqdefault.jpg",
    youtubeId: "OxO8BnWn4YM",
    description: "목소리 역시 수많은 소리(Sound) 중 하나이지만, 화자의 고유성이 더해질 때 비로소 단 하나뿐인 '목소리(Voice)'가 됨을 AI 비주얼 아트로 표현한 작품입니다. 유쇼페 공모전 출품작.",
    role: "AI Creator",
    tools: ["Premiere Pro", "After Effects"],
    aiTools: ["Midjourney", "Kling", "Seedance", "Claude"],
    tags: ["Shorts", "Art Film"],
  },

  {
    slug: "guirang_workshop_promo",
    title: "귀랑공방 홍보 영상 1편",
    client: "Personal",
    category: "Brand Promotional Video",
    year: "2026",
    orientation: "portrait",
    thumbnail: "https://i.ytimg.com/vi/IXd5X1n1cCQ/hqdefault.jpg",
    youtubeId: "IXd5X1n1cCQ",
    description: "팀 프로젝트로 팀원이 운영하는 공방의 브랜드를 알리기 위해 유쾌하고 개성 있는 톤으로 제작한 홍보 영상 시리즈 1편입니다.",
    role: "PM, Planning, AI Creator",
    tools: ["Premiere Pro"],
    aiTools: ["NanoBanana", "GPT", "Omni Flash", "Kling"],
    tags: ["Shorts", "Advertisement"],
  },

  {
    slug: "guirang_workshop_promo",
    title: "귀랑공방 홍보 영상 2편",
    client: "Personal",
    category: "Brand Promotional Video",
    year: "2026",
    orientation: "portrait",
    thumbnail: "https://i.ytimg.com/vi/fjfZX1OPVx4/hqdefault.jpg",
    youtubeId: "fjfZX1OPVx4",
    description: "팀 프로젝트로 팀원이 운영하는 공방의 브랜드를 알리기 위해 유쾌하고 개성 있는 톤으로 제작한 홍보 영상 시리즈 2편입니다.",
    role: "PM, Planning, AI Creator",
    tools: ["Premiere Pro"],
    aiTools: ["NanoBanana", "GPT", "Omni Flash", "Kling"],
    tags: ["Shorts", "Advertisement"],
  },

  {
    slug: "olidia_glowing_skin",
    title: "올리디아, 빛나는 피부를 찾아서",
    client: "Personal",
    category: "Advertisement",
    year: "2026",
    orientation: "portrait",
    thumbnail: "https://i.ytimg.com/vi/FeydfhqrjNk/hqdefault.jpg",
    youtubeId: "FeydfhqrjNk",
    description: "피부 컨디션이 나빠져 고민이던 직장인 A씨. 어느 날 몰라보게 좋아진 동료 B의 피부를 보고 그 비법을 찾아 나서게 되는 이야기입니다. 올리디아 AI 29역 숏폼왕 공모전 출품작.",
    role: "AI Creator",
    tools: ["Premiere Pro"],
    aiTools: ["NanoBanana", "GPT", "Omni Flash"],
    tags: ["Shorts", "Advertisement"],
  },

  {
    slug: "billlie_work_fmv",
    title: "Billlie | 'Work' M/V가 없어서 만들어본 FMV",
    client: "Personal",
    category: "Music Video",
    year: "2026",
    orientation: "landscape",
    thumbnail: "https://i.ytimg.com/vi/oS2ea0jQPYA/hqdefault.jpg",
    youtubeId: "oS2ea0jQPYA",
    description: "빌리(Billlie)의 'Work'를 들으면 그 순간부터 패션쇼가 펼쳐진다는 콘셉트로 제작한 뮤직비디오입니다. 비트에 맞춰 영상을 편집하고 중간중간 모션 그래픽을 더했습니다.",
    role: "AI Creator, Motion Graphics",
    tools: ["Premiere Pro", "After Effects"],
    aiTools: ["NanoBanana", "Omni Flash", "Kling"],
    tags: ["Long-form", "Music Video", "Motion Graphics"],
  },

  {
    slug: "54321_amazing_digital_circus_fmv",
    title: "54321 | The Amazing Digital Circus [FMV]",
    client: "Personal",
    category: "Music Video",
    year: "2026",
    orientation: "landscape",
    thumbnail: "https://i.ytimg.com/vi/OnPhj1qvxjw/hqdefault.jpg",
    youtubeId: "OnPhj1qvxjw",
    description: "애니메이션 '더 어메이징 디지털 서커스'의 팬 뮤직비디오로, 남녀 듀엣 곡에 맞춰 등장인물에 포커스를 맞춘 연출을 시도했습니다. 노래의 비트에 맞춰 영상을 편집했습니다.",
    role: "Editor, Rotoscoping",
    tools: ["Premiere Pro", "After Effects"],
    tags: ["Long-form", "Music Video"],
  },
  
  /*
  {
    slug: "brand-commercial-launch",
    title: "Brand Commercial Launch",
    client: "Studio A",
    category: "Commercial",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    description: "A high-energy brand launch commercial featuring dynamic cuts and motion graphics synchronized to a custom music track.",
    role: "Lead Editor, Motion Graphics",
    tools: ["Premiere Pro", "After Effects", "Cinema 4D"],
    tags: ["Commercial", "Motion Graphics", "Brand"],
    featured: true,
  },
  {
    slug: "music-video-edit",
    title: "Music Video — Neon Nights",
    client: "Studio A",
    category: "Music Video",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    description: "A visually striking music video with rhythm-driven cuts, neon color grading, and seamless transitions that match the beat perfectly.",
    role: "Video Editor, Colorist",
    tools: ["Premiere Pro", "DaVinci Resolve"],
    tags: ["Music Video", "Color Grading"],
    featured: true,
  },
  {
    slug: "documentary-short",
    title: "Documentary Short — Urban Stories",
    client: "Creator Collective",
    category: "Documentary",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    description: "A short documentary exploring urban life through intimate portraits and ambient sound design. Shot across three cities over two weeks.",
    role: "Editor, Sound Design",
    tools: ["Premiere Pro", "Audition"],
    tags: ["Documentary", "Short Film"],
  },
  {
    slug: "gaming-highlight-reel",                    
    title: "Gaming Highlight Reel",
    client: "Creator Collective",
    category: "Gaming",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    description: "Fast-paced gaming highlight compilation with custom lower thirds, dynamic transitions, and synchronized sound effects.",
    role: "Video Editor",
    tools: ["Premiere Pro", "After Effects"],
    tags: ["Gaming", "Highlights"],
  },
  {
    slug: "youtube-series-edit",
    title: "YouTube Series — Tech Reviews",
    client: "Creator Collective",
    category: "YouTube",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    description: "Ongoing editing partnership for a tech review YouTube channel. Consistent visual style, engaging pacing, and clean graphics package.",
    role: "Video Editor",
    tools: ["Premiere Pro", "After Effects"],
    tags: ["YouTube", "Tech"],
  },
  {
    slug: "wedding-film",
    title: "Wedding Cinematic Film",
    client: "Freelance",
    category: "Wedding",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    description: "A romantic wedding film blending candid moments with cinematic storytelling. Soft color grading and emotional pacing.",
    role: "Editor, Colorist",
    tools: ["Premiere Pro", "DaVinci Resolve", "Lightroom"],
    tags: ["Wedding", "Cinematic"],
  },
  {
    slug: "corporate-event-recap",
    title: "Corporate Event Recap",
    client: "Freelance",
    category: "Corporate",
    year: "2022",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    youtubeId: "dQw4w9WgXcQ",
    description: "A polished corporate event recap video featuring keynote highlights, interviews, and b-roll footage from a major tech conference.",
    role: "Editor",
    tools: ["Premiere Pro"],
    tags: ["Corporate", "Event"],
  },
  
   */
];

export const clientGroups: ClientGroup[] = [
  {
    name: "Personal",
    projects: projects.filter(p => p.client === "Personal"),
  },
  // {
  //   name: "Studio A",
  //   projects: projects.filter(p => p.client === "Studio A"),
  // },
  // {
  //   name: "Creator Collective",
  //   projects: projects.filter(p => p.client === "Creator Collective"),
  // },
  // {
  //   name: "Freelance",
  //   projects: projects.filter(p => p.client === "Freelance"),
  // },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

