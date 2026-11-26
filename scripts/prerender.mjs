// 빌드 후 실행: 라우트별 정적 HTML, sitemap.xml, llms.txt 생성
// - GitHub Pages가 하위 경로에 404 대신 200을 응답하게 함
// - JS를 실행하지 않는 크롤러·AI 검색(GEO)도 본문과 구조화 데이터(JSON-LD)를 읽을 수 있게 함
import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const publicDirectory = resolve(root, "dist", "public");
const bundlePath = resolve(root, "dist", ".prerender-data.mjs");

await build({
  stdin: {
    contents: `
      export * from "./client/src/lib/projects.ts";
      export * from "./client/src/lib/seo.ts";
      export * from "./client/src/lib/profile.ts";
    `,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: bundlePath,
  logLevel: "silent",
});
const {
  projects,
  localizeProject,
  formatDuration,
  getStaticPageMeta,
  canonicalUrl,
  SITE_URL,
  BRAND,
  PROFILE,
  skills,
  services,
  summary,
  getFaq,
} = await import(pathToFileURL(bundlePath).href);
await rm(bundlePath);

const template = await readFile(resolve(publicDirectory, "index.html"), "utf-8");

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const basePath = new URL(SITE_URL).pathname;
const link = (path, label) => `<a href="${basePath}/${path}" style="color:#22c55e">${escapeHtml(label)}</a>`;
const list = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

const mainProjects = projects.filter((p) => p.section !== "fan");
const projectUrl = (p) => canonicalUrl(`work/${p.slug}`);

// ---------------------------------------------------------------------------
// Structured data (schema.org JSON-LD)
// ---------------------------------------------------------------------------
const personId = `${canonicalUrl("")}#person`;
const websiteId = `${canonicalUrl("")}#website`;

const person = {
  "@type": "Person",
  "@id": personId,
  name: PROFILE.name,
  alternateName: PROFILE.alternateNames,
  jobTitle: PROFILE.jobTitle,
  description: summary.en,
  url: canonicalUrl(""),
  email: `mailto:${PROFILE.email}`,
  address: { "@type": "PostalAddress", addressLocality: PROFILE.location.city, addressCountry: PROFILE.location.countryCode },
  knowsAbout: [
    "AI video production",
    "AI video ads",
    "Short-form video ads",
    "Brand films",
    "AI music videos",
    "Storyboarding",
    "AI character design",
    "Generative AI video",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "AI Video Creator",
    alternateName: ["AI Video Ad Creator", "AI 영상 제작자"],
    occupationLocation: { "@type": "Country", name: PROFILE.location.country },
    skills: skills.flatMap((g) => g.items).join(", "),
  },
  sameAs: [PROFILE.links.youtube, PROFILE.links.instagram],
};

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: canonicalUrl(""),
  name: BRAND,
  description: summary.en,
  inLanguage: ["ko", "en"],
  publisher: { "@id": personId },
};

function isoDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m ? `${m}M` : ""}${s ? `${s}S` : ""}`;
}

function videoObject(p) {
  const en = localizeProject(p, "en");
  return {
    "@type": "VideoObject",
    "@id": `${projectUrl(p)}#video`,
    name: en.title,
    alternateName: p.title,
    description: en.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${p.youtubeId}/maxresdefault.jpg`,
    uploadDate: p.uploadDate,
    duration: isoDuration(p.duration),
    embedUrl: `https://www.youtube.com/embed/${p.youtubeId}`,
    url: `https://www.youtube.com/watch?v=${p.youtubeId}`,
    genre: p.category,
    keywords: p.tags.join(", "),
    creator: { "@id": personId },
  };
}

const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

// ---------------------------------------------------------------------------
// Fallback body (React가 마운트되면 교체됨). 한/영을 함께 넣어 두 언어 검색 모두에 대응
// 화면에 잠깐 보일 수 있어 이메일은 넣지 않음 (구조화 데이터·llms.txt에만 포함)
// ---------------------------------------------------------------------------
function fallback(body) {
  return `<main style="background:#0a0a0a;color:#f0f0f0;font-family:sans-serif;line-height:1.7;max-width:720px;margin:0 auto;padding:96px 24px">${body}</main>`;
}

function projectList(items) {
  return `<ul>${items
    .map((p) => {
      const en = localizeProject(p, "en");
      return `<li>${link(`work/${p.slug}/`, en.title)} — ${escapeHtml(p.title)} (${escapeHtml(en.client)}; ${escapeHtml(p.category)}, ${p.format}, ${formatDuration(p.duration)})</li>`;
    })
    .join("")}</ul>`;
}

function faqHtml(language) {
  return getFaq(language, false)
    .map((item) => `<h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p>`)
    .join("");
}

const nav = `<p>${link("", "Home")} · ${link("work/", "Work")} · ${link("about/", "About")}</p>`;
const intro = `<p>${escapeHtml(summary.en)}</p><p>${escapeHtml(summary.ko)}</p>`;
const servicesHtml = `<h2>Services / 제작 분야</h2>${list(services.en)}${list(services.ko)}`;

function staticPage(page, path, body, jsonLd) {
  const en = getStaticPageMeta(page, "en");
  const ko = getStaticPageMeta(page, "ko");
  return {
    path,
    title: en.title,
    description: `${en.description} ${ko.description}`,
    ogDescription: en.description,
    jsonLd,
    body: fallback(`<h1>${escapeHtml(en.title)}</h1>${body}${nav}`),
  };
}

const pages = [
  staticPage(
    "home",
    "",
    `${intro}${servicesHtml}<h2>Selected Work</h2>${projectList(mainProjects)}`,
    graph(website, person, {
      "@type": "WebPage",
      "@id": canonicalUrl(""),
      url: canonicalUrl(""),
      name: getStaticPageMeta("home", "en").title,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
    }),
  ),
  staticPage(
    "work",
    "work",
    `${intro}<h2>Projects</h2>${projectList(projects)}`,
    graph(person, {
      "@type": "CollectionPage",
      "@id": canonicalUrl("work"),
      url: canonicalUrl("work"),
      name: getStaticPageMeta("work", "en").title,
      isPartOf: { "@id": websiteId },
      author: { "@id": personId },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: projectUrl(p) })),
      },
    }),
  ),
  staticPage(
    "about",
    "about",
    `${intro}${servicesHtml}<h2>Tools</h2>${list(skills.map((g) => `${g.category}: ${g.items.join(", ")}`))}<h2>FAQ</h2>${faqHtml("en")}${faqHtml("ko")}`,
    graph(
      person,
      {
        "@type": "ProfilePage",
        "@id": canonicalUrl("about"),
        url: canonicalUrl("about"),
        name: getStaticPageMeta("about", "en").title,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl("about")}#faq`,
        mainEntity: [...getFaq("en"), ...getFaq("ko")].map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ),
  ),
  ...projects.map((p) => {
    const en = localizeProject(p, "en");
    const brief = (b) =>
      b ? `<ul><li>Hook: ${escapeHtml(b.hook)}</li><li>Target audience: ${escapeHtml(b.audience)}</li><li>Goal: ${escapeHtml(b.goal)}</li></ul>` : "";
    const tools = [...p.tools, ...(p.aiTools ?? [])];
    return {
      path: `work/${p.slug}`,
      title: `${en.title} | ${BRAND}`,
      description: `${en.description} ${p.description}`,
      ogDescription: en.description,
      image: `https://i.ytimg.com/vi/${p.youtubeId}/maxresdefault.jpg`,
      jsonLd: graph(person, videoObject(p), {
        "@type": "WebPage",
        "@id": projectUrl(p),
        url: projectUrl(p),
        name: `${en.title} | ${BRAND}`,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        mainEntity: { "@id": `${projectUrl(p)}#video` },
      }),
      body: fallback(
        `<h1>${escapeHtml(en.title)}</h1><p>${escapeHtml(p.title)}</p>` +
          `<p>By ${escapeHtml(BRAND)}, AI video creator. ${escapeHtml(en.client)} · ${escapeHtml(p.category)} · ${p.format} · ${formatDuration(p.duration)}</p>` +
          `<p>Role: ${escapeHtml(p.role)}${tools.length ? ` · Tools: ${escapeHtml(tools.join(", "))}` : ""}</p>` +
          `<p>${escapeHtml(en.description)}</p>${brief(en.brief)}` +
          `<p>${escapeHtml(p.description)}</p>${brief(p.brief)}` +
          `<p><a href="https://www.youtube.com/watch?v=${p.youtubeId}" style="color:#22c55e">Watch on YouTube</a></p>${nav}`,
      ),
    };
  }),
];

function replaceOnce(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement);
}

// JSON 안의 "</script>"가 태그를 닫지 않도록 이스케이프
const jsonForScript = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

function render(page) {
  const url = canonicalUrl(page.path);
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*/, `$1${escapeHtml(page.description)}`);
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*/, `$1${escapeHtml(page.title)}`);
  html = replaceOnce(html, /(<meta property="og:description" content=")[^"]*/, `$1${escapeHtml(page.ogDescription)}`);
  html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`);
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*/, `$1${url}`);
  if (page.image) {
    html = replaceOnce(html, /(<meta property="og:image" content=")[^"]*/, `$1${page.image}`);
  }
  html = replaceOnce(html, /<\/head>/, `  <script type="application/ld+json">${jsonForScript(page.jsonLd)}</script>\n  </head>`);
  return replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${page.body}</div>`);
}

for (const page of pages) {
  const directory = resolve(publicDirectory, page.path);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), render(page));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${canonicalUrl(page.path)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(publicDirectory, "sitemap.xml"), sitemap);

// llms.txt — AI가 사이트를 한 번에 파악할 수 있는 요약 (https://llmstxt.org)
const projectLine = (p) => {
  const en = localizeProject(p, "en");
  return `- [${en.title}](${projectUrl(p)}): ${en.client}. ${p.category}, ${p.format}, ${formatDuration(p.duration)}. Role: ${p.role}. ${en.description}`;
};
const llms = `# ${BRAND} — AI Video Creator

> ${summary.en}

${summary.ko}

## Services

${services.en.map((s) => `- ${s}`).join("\n")}

## Production process

${getFaq("en").find((item) => item.question.includes("process")).answer}

## Tools

${skills.map((g) => `- ${g.category}: ${g.items.join(", ")}`).join("\n")}

## Contact

- Portfolio: ${canonicalUrl("")}
- Email: ${PROFILE.email}
- YouTube: ${PROFILE.links.youtube}
- Instagram: ${PROFILE.links.instagram}
- Based in ${PROFILE.location.city}, ${PROFILE.location.country}; works remotely with clients worldwide.

## Work

${mainProjects.map(projectLine).join("\n")}

## Optional

- [About and FAQ](${canonicalUrl("about")})
${projects.filter((p) => p.section === "fan").map(projectLine).join("\n")}
`;
await writeFile(resolve(publicDirectory, "llms.txt"), llms);

console.log(`Prerendered ${pages.length} pages, sitemap.xml and llms.txt`);
