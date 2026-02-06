"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { VisitPayload } from "@/lib/visit/types";

const TRACKING_ENABLED = process.env.NEXT_PUBLIC_VISIT_NOTIFY_ENABLED === "true";

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

export default function VisitTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSentSignature = useRef<string>("");

  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

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
    if (lastSentSignature.current === signature) {
      return;
    }
    lastSentSignature.current = signature;

    const payload: VisitPayload = {
      path: pathname,
      utm: sanitizeUtmParams(new URLSearchParams(queryString)),
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
  }, [pathname, queryString]);

  return null;
}
