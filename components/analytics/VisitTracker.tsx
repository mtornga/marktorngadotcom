"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { VisitPayload } from "@/lib/visit/types";

const TRACKING_ENABLED = process.env.NEXT_PUBLIC_VISIT_NOTIFY_ENABLED === "true";
const HEARTBEAT_SECONDS = (() => {
  const parsed = Number(process.env.NEXT_PUBLIC_VISIT_NOTIFY_HEARTBEAT_SECONDS ?? "15");
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 15;
  }
  return Math.floor(parsed);
})();
const HEARTBEAT_MS = HEARTBEAT_SECONDS * 1000;

function parseAllowedHosts(value: string | undefined): Set<string> {
  const fallbackHosts = ["marktornga.com", "www.marktornga.com"];
  if (!value) {
    return new Set(fallbackHosts);
  }

  const hosts = value
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  return new Set(hosts.length > 0 ? hosts : fallbackHosts);
}

const allowedHosts = parseAllowedHosts(process.env.NEXT_PUBLIC_VISIT_NOTIFY_ALLOWED_HOSTS);

function sanitizeUtmParams(searchParams: URLSearchParams): Record<string, string> {
  const utm: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    const normalizedKey = key.trim().toLowerCase();
    if (!normalizedKey.startsWith("utm_")) {
      continue;
    }

    const safeValue = value.trim();
    if (!safeValue) {
      continue;
    }

    utm[normalizedKey] = safeValue.slice(0, 256);
  }

  return utm;
}

function postVisit(payload: VisitPayload): void {
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const queued = navigator.sendBeacon("/api/visit", new Blob([body], { type: "application/json" }));
    if (queued) {
      return;
    }
  }

  void fetch("/api/visit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
    cache: "no-store",
  }).catch(() => {
    // Best-effort only; failures should never affect the visitor's experience.
  });
}

function makePageId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function currentScrollMaxPct(): number {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 0;
  }

  const root = document.documentElement;
  const scrollTop = window.scrollY || root.scrollTop || 0;
  const scrollHeight = Math.max(root.scrollHeight, document.body?.scrollHeight ?? 0);
  const viewportHeight = window.innerHeight || root.clientHeight || 0;
  const scrollable = Math.max(1, scrollHeight - viewportHeight);
  return Math.max(0, Math.min(100, Math.round((scrollTop / scrollable) * 100)));
}

export default function VisitTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSignature = useRef<string>("");
  const pageIdRef = useRef<string>("");
  const trackedPathRef = useRef<string>("");
  const trackedQueryRef = useRef<string>("");
  const maxScrollPctRef = useRef<number>(0);
  const lastVisibleAtRef = useRef<number | undefined>(undefined);

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  const emit = (eventType: VisitPayload["eventType"], activeMsDelta?: number, pathOverride?: string, queryOverride?: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const targetPath = pathOverride ?? trackedPathRef.current;
    if (!targetPath) {
      return;
    }

    const targetQuery = queryOverride ?? trackedQueryRef.current;
    const payload: VisitPayload = {
      eventType,
      pageId: pageIdRef.current,
      clientTs: Date.now(),
      activeMsDelta,
      scrollMaxPct: maxScrollPctRef.current,
      path: targetPath,
      utm: sanitizeUtmParams(new URLSearchParams(targetQuery)),
      referrer: document.referrer || undefined,
      title: document.title || undefined,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone || undefined,
      lang: navigator.language || undefined,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    postVisit(payload);
  };

  const consumeVisibleDelta = () => {
    const previous = lastVisibleAtRef.current;
    if (!previous) {
      return 0;
    }

    const now = Date.now();
    const delta = Math.max(0, now - previous);
    if (typeof document !== "undefined" && !document.hidden) {
      lastVisibleAtRef.current = now;
    } else {
      lastVisibleAtRef.current = undefined;
    }
    return delta;
  };

  useEffect(() => {
    if (!TRACKING_ENABLED || typeof window === "undefined") {
      return;
    }

    const hostname = window.location.hostname.toLowerCase();
    if (!allowedHosts.has(hostname)) {
      return;
    }

    if (!pathname) {
      return;
    }

    const signature = `${pathname}?${queryString}`;
    if (lastSignature.current === signature) {
      return;
    }

    const previousPath = trackedPathRef.current;
    const previousQuery = trackedQueryRef.current;
    if (pageIdRef.current) {
      const tailDelta = consumeVisibleDelta();
      emit("page_hide", tailDelta > 0 ? tailDelta : undefined, previousPath, previousQuery);
    }

    lastSignature.current = signature;
    pageIdRef.current = makePageId();
    trackedPathRef.current = pathname;
    trackedQueryRef.current = queryString;
    maxScrollPctRef.current = currentScrollMaxPct();
    lastVisibleAtRef.current = document.hidden ? undefined : Date.now();

    emit("page_view", undefined, pathname, queryString);
  }, [pathname, queryString]);

  useEffect(() => {
    if (!TRACKING_ENABLED || typeof window === "undefined") {
      return;
    }

    const onScroll = () => {
      const scrollPct = currentScrollMaxPct();
      if (scrollPct > maxScrollPctRef.current) {
        maxScrollPctRef.current = scrollPct;
      }
    };

    const onVisibilityChange = () => {
      if (!pageIdRef.current) {
        return;
      }

      if (document.hidden) {
        const delta = consumeVisibleDelta();
        emit("page_hide", delta > 0 ? delta : undefined);
        return;
      }

      lastVisibleAtRef.current = Date.now();
    };

    const onPageHide = () => {
      if (!pageIdRef.current) {
        return;
      }
      const delta = consumeVisibleDelta();
      emit("page_hide", delta > 0 ? delta : undefined);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    const heartbeatTimer = window.setInterval(() => {
      if (!pageIdRef.current || document.hidden) {
        return;
      }
      const delta = consumeVisibleDelta();
      if (delta > 0) {
        emit("heartbeat", delta);
      }
    }, HEARTBEAT_MS);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      window.clearInterval(heartbeatTimer);
    };
  }, [pathname, queryString]);

  return null;
}
