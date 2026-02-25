export interface ViewportInfo {
  width: number;
  height: number;
}

export type VisitEventType = "page_view" | "heartbeat" | "page_hide";

export interface VisitPayload {
  eventType?: VisitEventType;
  pageId?: string;
  clientTs?: number;
  activeMsDelta?: number;
  scrollMaxPct?: number;
  path: string;
  utm?: Record<string, string>;
  referrer?: string;
  title?: string;
  tz?: string;
  lang?: string;
  viewport?: ViewportInfo;
}

export type DeviceClass = "mobile" | "tablet" | "desktop" | "unknown";

export interface UserAgentInfo {
  deviceClass: DeviceClass;
  browser: string;
  os: string;
  raw: string;
}

export interface GeoInfo {
  city?: string;
  region?: string;
  country?: string;
  edgeRegion?: string;
}

export interface IpinfoEnrichment {
  asn?: string;
  asName?: string;
  asDomain?: string;
  org?: string;
  timezone?: string;
  company?: string;
  isTor?: boolean;
  isProxy?: boolean;
  isVpn?: boolean;
  isHosting?: boolean;
}

export interface VisitEvent {
  timestampIso: string;
  host: string;
  fullUrl: string;
  path: string;
  utm: Record<string, string>;
  referrerHost?: string;
  pageTitle?: string;
  timezone?: string;
  language?: string;
  viewport?: ViewportInfo;
  maskedIp: string;
  hashedIp?: string;
  userAgent: UserAgentInfo;
  geo: GeoInfo;
  ipinfo?: IpinfoEnrichment;
}

export interface SessionPageStats {
  path: string;
  title?: string;
  firstSeenAtIso: string;
  lastSeenAtIso: string;
  viewCount: number;
  engagedMs: number;
  maxScrollPct: number;
  lastPageId?: string;
}

export interface ActiveSessionRecord {
  sessionId: string;
  fingerprint: string;
  host: string;
  startedAtIso: string;
  lastSeenAtIso: string;
  endedAtIso?: string;
  entryPath: string;
  exitPath: string;
  referrerHost?: string;
  language?: string;
  timezone?: string;
  maskedIp: string;
  userAgent: UserAgentInfo;
  geo: GeoInfo;
  ipinfo?: IpinfoEnrichment;
  pageSequence: string[];
  pages: Record<string, SessionPageStats>;
  pageViewCount: number;
  heartbeatCount: number;
  pageHideCount: number;
  totalEngagedMs: number;
  lastEventType: VisitEventType;
}

export interface SessionSummaryPage {
  path: string;
  engagedMs: number;
  maxScrollPct: number;
  viewCount: number;
}

export interface SessionSummary {
  sessionId: string;
  host: string;
  startedAtIso: string;
  endedAtIso: string;
  durationMs: number;
  engagedMs: number;
  pageViewCount: number;
  distinctPageCount: number;
  entryPath: string;
  exitPath: string;
  referrerHost?: string;
  language?: string;
  timezone?: string;
  maskedIp: string;
  userAgent: UserAgentInfo;
  geo: GeoInfo;
  ipinfo?: IpinfoEnrichment;
  topPages: SessionSummaryPage[];
  fullUrl: string;
}

export interface SessionConfig {
  idleMs: number;
  ttlSeconds: number;
  heartbeatSeconds: number;
}

export interface SessionEventInput {
  host: string;
  path: string;
  fullUrl: string;
  referrerHost?: string;
  title?: string;
  language?: string;
  timezone?: string;
  maskedIp: string;
  hashedIp?: string;
  userAgent: UserAgentInfo;
  geo: GeoInfo;
  ipinfo?: IpinfoEnrichment;
  eventType: VisitEventType;
  pageId: string;
  clientTs: number;
  activeMsDelta?: number;
  scrollMaxPct?: number;
}
