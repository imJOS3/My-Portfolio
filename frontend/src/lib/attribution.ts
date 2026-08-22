declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type TrafficKind = "campaign" | "organic" | "referral" | "direct";
export type EntryMode = "tagged" | "referred" | "manual";

export type Attribution = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  referrer: string;
  landingPath: string;
  kind: TrafficKind;
  entry: EntryMode;
  capturedAt: string;
};

const FIRST_KEY = "portfolio.attribution.first";
const LAST_KEY = "portfolio.attribution.last";
const FIRST_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_VALUE = 120;

const SEARCH_HOSTS = ["google.", "bing.", "yahoo.", "duckduckgo.", "brave.", "ecosia."];

const SOURCE_HOSTS: { match: string; source: string; medium: string }[] = [
  { match: "github.com", source: "github", medium: "social" },
  { match: "github.io", source: "github", medium: "social" },
  { match: "linkedin.com", source: "linkedin", medium: "social" },
  { match: "lnkd.in", source: "linkedin", medium: "social" },
  { match: "computrabajo.com", source: "computrabajo", medium: "job_board" },
  { match: "magneto365.com", source: "magneto", medium: "job_board" },
  { match: "magneto365.co", source: "magneto", medium: "job_board" },
  { match: "elempleo.com", source: "elempleo", medium: "job_board" },
  { match: "indeed.com", source: "indeed", medium: "job_board" },
  { match: "glassdoor.com", source: "glassdoor", medium: "job_board" },
  { match: "occ.com.mx", source: "occ", medium: "job_board" },
  { match: "instagram.com", source: "instagram", medium: "social" },
  { match: "facebook.com", source: "facebook", medium: "social" },
  { match: "l.facebook.com", source: "facebook", medium: "social" },
  { match: "twitter.com", source: "twitter", medium: "social" },
  { match: "x.com", source: "twitter", medium: "social" },
];

const clean = (value: string | null | undefined) =>
  (value ?? "").trim().slice(0, MAX_VALUE);

const lower = (value: string | null | undefined) => clean(value).toLowerCase();

const referrerHost = () => {
  try {
    if (!document.referrer) return "";
    return new URL(document.referrer).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
};

const isOwnHost = (host: string) => {
  if (!host) return false;
  const here = window.location.hostname.replace(/^www\./, "").toLowerCase();
  return host === here || host.endsWith(`.${here}`);
};

const isSearchHost = (host: string) => SEARCH_HOSTS.some((part) => host.includes(part));

const hostSource = (host: string) => {
  const known = SOURCE_HOSTS.find((row) => host === row.match || host.endsWith(`.${row.match}`));
  if (known) return known;
  if (isSearchHost(host)) return { source: host.split(".")[0] || "search", medium: "organic" };
  return { source: host || "unknown", medium: "referral" };
};

const readStored = (key: string): Attribution | null => {
  try {
    const raw = key === FIRST_KEY ? localStorage.getItem(key) : sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { attr?: Attribution; expiresAt?: number } | Attribution;
    if ("expiresAt" in parsed) {
      if (typeof parsed.expiresAt === "number" && parsed.expiresAt < Date.now()) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.attr ?? null;
    }
    if ("source" in parsed && "entry" in parsed) return parsed;
    return null;
  } catch {
    return null;
  }
};

const writeSession = (attr: Attribution) => {
  sessionStorage.setItem(LAST_KEY, JSON.stringify(attr));
};

const writeFirst = (attr: Attribution) => {
  if (readStored(FIRST_KEY)) return;
  localStorage.setItem(
    FIRST_KEY,
    JSON.stringify({ attr, expiresAt: Date.now() + FIRST_TTL_MS })
  );
};

const fromUtms = (
  params: URLSearchParams,
  landingPath: string,
  referrer: string
): Attribution => ({
  source: lower(params.get("utm_source")) || "unknown",
  medium: lower(params.get("utm_medium")) || "campaign",
  campaign: clean(params.get("utm_campaign")),
  content: clean(params.get("utm_content")),
  term: clean(params.get("utm_term")),
  referrer,
  landingPath,
  kind: "campaign",
  entry: "tagged",
  capturedAt: new Date().toISOString(),
});

const fromReferrer = (landingPath: string, host: string): Attribution => {
  if (!host || isOwnHost(host)) {
    return {
      source: "direct",
      medium: "none",
      campaign: "",
      content: "",
      term: "",
      referrer: "",
      landingPath,
      kind: "direct",
      entry: "manual",
      capturedAt: new Date().toISOString(),
    };
  }

  const mapped = hostSource(host);
  const organic = mapped.medium === "organic";

  return {
    source: mapped.source,
    medium: mapped.medium,
    campaign: "",
    content: "",
    term: "",
    referrer: host,
    landingPath,
    kind: organic ? "organic" : "referral",
    entry: "referred",
    capturedAt: new Date().toISOString(),
  };
};

export const SHORT_LINKS: Record<
  string,
  { source: string; medium: string; campaign: string }
> = {
  cv: { source: "cv", medium: "document", campaign: "resume" },
  gh: { source: "github", medium: "social", campaign: "repo" },
  in: { source: "linkedin", medium: "social", campaign: "profile" },
  ct: { source: "computrabajo", medium: "job_board", campaign: "" },
  mg: { source: "magneto", medium: "job_board", campaign: "" },
};

export const parseShortPath = (pathname: string) => {
  const parts = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (parts.length === 0 || parts.length > 2) return null;
  const [code, employer = ""] = parts;
  if (!SHORT_LINKS[code]) return null;
  return { code, employer: lower(employer) };
};

export const captureShortPath = (pathname: string): Attribution | null => {
  const parsed = parseShortPath(pathname);
  if (!parsed) return null;

  const preset = SHORT_LINKS[parsed.code];
  const employer = parsed.employer;
  const medium =
    employer && (parsed.code === "in" || parsed.code === "ct" || parsed.code === "mg")
      ? "job_board"
      : preset.medium;

  const attr: Attribution = {
    source: preset.source,
    medium,
    campaign: employer || preset.campaign,
    content: "",
    term: "",
    referrer: isOwnHost(referrerHost()) ? "" : referrerHost(),
    landingPath: pathname,
    kind: "campaign",
    entry: "tagged",
    capturedAt: new Date().toISOString(),
  };

  writeSession(attr);
  writeFirst(attr);
  return attr;
};

export const hasTrackingSearch = (search: string) =>
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].some((key) =>
    clean(new URLSearchParams(search).get(key))
  );

export const stripTrackingSearch = () => {
  if (!window.location.search) return;
  window.history.replaceState(
    window.history.state,
    "",
    window.location.pathname + window.location.hash
  );
};

export const getLastAttribution = () => readStored(LAST_KEY);
export const getFirstAttribution = () => readStored(FIRST_KEY);

export const attributionToEventProps = (attr: Attribution | null) => {
  if (!attr) return {};
  return {
    traffic_source: attr.source,
    traffic_medium: attr.medium,
    traffic_campaign: attr.campaign,
    traffic_content: attr.content,
    traffic_term: attr.term,
    traffic_kind: attr.kind,
    traffic_entry: attr.entry,
    traffic_referrer: attr.referrer,
  };
};

export const captureAttribution = (search = window.location.search): Attribution => {
  const params = new URLSearchParams(search);
  const landingPath = window.location.pathname || "/";
  const referrer = isOwnHost(referrerHost()) ? "" : referrerHost();
  const hasUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].some(
    (key) => clean(params.get(key))
  );

  if (hasUtm) {
    const attr = fromUtms(params, landingPath, referrer);
    writeSession(attr);
    writeFirst(attr);
    return attr;
  }

  const existing = getLastAttribution();
  if (existing) return existing;

  const attr = fromReferrer(landingPath, referrer);
  writeSession(attr);
  writeFirst(attr);
  return attr;
};

export const pushAttribution = (attr: Attribution) => {
  const first = getFirstAttribution() ?? attr;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "portfolio_attribution",
    ...attributionToEventProps(attr),
    first_traffic_source: first.source,
    first_traffic_medium: first.medium,
    first_traffic_campaign: first.campaign,
    first_traffic_entry: first.entry,
  });

  if (import.meta.env.DEV) {
    console.info("[attribution]", { last: attr, first });
  }
};
