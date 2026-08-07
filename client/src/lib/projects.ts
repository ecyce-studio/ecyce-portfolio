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
  process?: string; // 추가: 제작 과정 (string)
  role: string;
  tools: string[];
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
    thumbnail: "https://i.ytimg.com/vi/38XLXKgK6Dc/oar2.jpg?sqp=-oaymwErCJUDEOAESFqQAgHyq4qpAxoIARUAAIhCyAEB2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLCP5ejGdf4qrBIBcRr78AKArLYG3A&usqp=CCk",
    youtubeId: "38XLXKgK6Dc",
    description: "어쩌면 흑역사가 되었을 떨떠름한 첫 만남이 '생차'와 함께 하기에 추억이 된다는 이야기를 담은 음료 광고 영상입니다. ",
    role: "AI Creator",
    tools: ["Premiere Pro", "After Effects"],
    tags: ["Commercial", "Shorts"],
    featured: true,
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
  {
    name: "Studio A",
    projects: projects.filter(p => p.client === "Studio A"),
  },
  {
    name: "Creator Collective",
    projects: projects.filter(p => p.client === "Creator Collective"),
  },
  {
    name: "Freelance",
    projects: projects.filter(p => p.client === "Freelance"),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

