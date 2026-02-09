export interface ViewportInfo {
  width: number;
  height: number;
}

export interface VisitPayload {
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
