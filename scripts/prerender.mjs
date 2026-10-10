// 빌드 후 실행: 라우트별 정적 HTML(고유 title/description + 본문 텍스트)과 sitemap.xml 생성
// GitHub Pages가 하위 경로에 404 대신 200을 응답하고, JS를 실행하지 않는 크롤러도 내용을 읽을 수 있게 함
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
const { projects, localizeProject, formatDuration, getStaticPageMeta, canonicalUrl, SITE_URL, BRAND } =
  await import(pathToFileURL(bundlePath).href);
await rm(bundlePath);

const template = await readFile(resolve(publicDirectory, "index.html"), "utf-8");

const escapeHtml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const basePath = new URL(SITE_URL).pathname;
const link = (path, label) => `<a href="${basePath}/${path}" style="color:#22c55e">${escapeHtml(label)}</a>`;

// React가 마운트되면 교체되는 본문. 한/영을 함께 넣어 두 언어 검색 모두에 대응
function fallback(body) {
  return `<main style="background:#0a0a0a;color:#f0f0f0;font-family:sans-serif;line-height:1.7;max-width:720px;margin:0 auto;padding:96px 24px">${body}</main>`;
}

function projectList(items) {
  return `<ul>${items
    .map((p) => {
      const en = localizeProject(p, "en");
      return `<li>${link(`work/${p.slug}/`, en.title)} — ${escapeHtml(p.title)} (${escapeHtml(p.category)}, ${p.format}, ${formatDuration(p.duration)})</li>`;
    })
    .join("")}</ul>`;
}

const nav = `<p>${link("", "Home")} · ${link("work/", "Work")} · ${link("about/", "About")}</p>`;

function staticPage(page, path, body) {
  const en = getStaticPageMeta(page, "en");
  const ko = getStaticPageMeta(page, "ko");
  return {
    path,
    title: en.title,
    description: `${en.description} ${ko.description}`,
    ogDescription: en.description,
    body: fallback(`<h1>${escapeHtml(en.title)}</h1><p>${escapeHtml(ko.description)}</p><p>${escapeHtml(en.description)}</p>${body}${nav}`),
  };
}

const mainProjects = projects.filter((p) => p.section !== "fan");

const pages = [
  {
    ...staticPage("home", "", `<h2>Recent Projects</h2>${projectList(mainProjects)}`),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ecyce",
      alternateName: ["이끼끼", "Ecyce Studio"],
      jobTitle: "AI Video Ad Creator",
      url: canonicalUrl(""),
      sameAs: ["https://www.youtube.com/@ecyce.studio", "https://www.instagram.com/ecyce.studio/"],
    },
  },
  staticPage("work", "work", `<h2>Projects</h2>${projectList(projects)}`),
  staticPage("about", "about", ""),
  ...projects.map((p) => {
    const en = localizeProject(p, "en");
    const brief = (b) =>
      b ? `<ul><li>Hook: ${escapeHtml(b.hook)}</li><li>Target audience: ${escapeHtml(b.audience)}</li><li>Goal: ${escapeHtml(b.goal)}</li></ul>` : "";
    return {
      path: `work/${p.slug}`,
      title: `${en.title} | ${BRAND}`,
      description: `${en.description} ${p.description}`,
      ogDescription: en.description,
      image: `https://i.ytimg.com/vi/${p.youtubeId}/maxresdefault.jpg`,
      body: fallback(
        `<h1>${escapeHtml(en.title)}</h1><p>${escapeHtml(p.title)}</p>` +
          `<p>${escapeHtml(p.category)} · ${p.format} · ${formatDuration(p.duration)} · ${escapeHtml(en.client)}</p>` +
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
  if (page.jsonLd) {
    html = replaceOnce(html, /<\/head>/, `  <script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>\n  </head>`);
  }
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

console.log(`Prerendered ${pages.length} pages and sitemap.xml`);
