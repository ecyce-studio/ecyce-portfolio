import { useEffect } from "react";
import { canonicalUrl, type PageMeta } from "@/lib/seo";

function setMeta(selector: string, content: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

export function usePageMeta(meta: PageMeta | undefined, path: string) {
  const title = meta?.title;
  const description = meta?.description;

  useEffect(() => {
    if (!title || !description) return;

    const url = canonicalUrl(path);
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', url);
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", url);
  }, [title, description, path]);
}
