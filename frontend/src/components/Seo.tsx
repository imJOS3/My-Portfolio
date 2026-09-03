import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_IMAGE, SITE_URL, resolveSeo } from "../lib/seo";

function upsertMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function Seo() {
  const { pathname } = useLocation();
  const seo = resolveSeo(pathname);

  useLayoutEffect(() => {
    const url = `${SITE_URL}${seo.path === "/" ? "/" : seo.path}`;
    document.title = seo.title;

    upsertMeta('meta[name="description"]', { name: "description" }, seo.description);
    upsertMeta(
      'meta[name="robots"]',
      { name: "robots" },
      seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"
    );
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, seo.title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, seo.description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, url);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, DEFAULT_IMAGE);
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, seo.title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, seo.description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, DEFAULT_IMAGE);
    upsertLink("canonical", url);

    const scriptId = "seo-jsonld-page";
    const prev = document.getElementById(scriptId);
    if (seo.jsonLd) {
      const el = (prev as HTMLScriptElement | null) ?? document.createElement("script");
      el.id = scriptId;
      el.type = "application/ld+json";
      el.text = JSON.stringify(seo.jsonLd);
      if (!prev) document.head.appendChild(el);
    } else {
      prev?.remove();
    }
  }, [seo]);

  return null;
}
