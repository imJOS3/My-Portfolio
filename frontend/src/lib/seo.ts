import { FAQS } from "../data/faqs";
import { getHobby, resolveHobbyItemId } from "../data/hobbies";

export const SITE_URL = "https://josebenjumea.dev";
export const SITE_NAME = "Jose Benjumea";
export const DEFAULT_TITLE = "Jose Benjumea | Software Engineering student — josebenjumea.dev";
export const DEFAULT_DESCRIPTION =
  "Portfolio of Jose Benjumea (josebenjumea.dev). Software Engineering student in Bogotá, fullstack with a backend focus. React, Node.js, Java, Spring Boot. Open to internships.";
export const DEFAULT_IMAGE = `${SITE_URL}/og.png`;

export type SeoPayload = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: unknown;
};

const HOME_GRAPH = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["josebenjumea.dev", "José Benjumea"],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jose Benjumea",
    alternateName: ["José Benjumea", "imJOS3"],
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    jobTitle: "Software Engineering student",
    description:
      "Software Engineering student at Universidad Manuela Beltrán in Bogotá. Fullstack developer focused on backend systems, APIs, and real products.",
    email: "mailto:josebenjuema2005@gmail.com",
    telephone: "+573182893475",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Manuela Beltrán",
    },
    knowsAbout: [
      "Java",
      "Spring Boot",
      "Node.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
    ],
    sameAs: [
      "https://github.com/imJOS3",
      "https://www.linkedin.com/in/jose-benjumea-5167b8271/",
    ],
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const TRACKING_PREFIXES = new Set(["cv", "gh", "in", "ct", "mg"]);

export function resolveSeo(pathname: string): SeoPayload {
  const path = pathname.replace(/\/+$/, "") || "/";
  const parts = path.split("/").filter(Boolean);

  if (path === "/") {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      path: "/",
      jsonLd: HOME_GRAPH,
    };
  }

  if (path === "/faq") {
    return {
      title: "FAQs | Jose Benjumea — Recruiter checklist",
      description:
        "Recruiter FAQs for Jose Benjumea: age, availability, languages, stack, location in Bogotá, and how to contact josebenjumea.dev.",
      path: "/faq",
      jsonLd: FAQ_JSON_LD,
    };
  }

  if (path === "/theme") {
    return {
      title: "Color theory | Jose Benjumea",
      description:
        "The cyberpunk palette behind josebenjumea.dev — void, cyan, purple, and fuchsia explained by Jose Benjumea.",
      path: "/theme",
    };
  }

  if (path === "/open") {
    return {
      title: "Hobbies | Jose Benjumea",
      description:
        "Off the clock with Jose Benjumea: games, anime, sports, and music on josebenjumea.dev.",
      path: "/open",
    };
  }

  if (TRACKING_PREFIXES.has(parts[0] ?? "")) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      path,
      noindex: true,
    };
  }

  if (parts[0] === "open" && parts[1]) {
    const hobby = getHobby(parts[1]);
    if (hobby) {
      const itemId = resolveHobbyItemId(hobby, parts[3]);
      const item = itemId ? hobby.items.find((entry) => entry.id === itemId) : undefined;
      return {
        title: item
          ? `${item.title} · ${hobby.title} | Jose Benjumea`
          : `${hobby.title} | Jose Benjumea`,
        description: item?.description ?? hobby.description,
        path,
      };
    }
  }

  return {
    title: "Page not found | Jose Benjumea",
    description: DEFAULT_DESCRIPTION,
    path,
    noindex: true,
  };
}
