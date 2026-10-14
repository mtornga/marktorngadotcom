import type { ActiveSessionRecord, SessionNotificationDecision } from "@/lib/visit/types";

export const MIN_NOTIFICATION_VISIBLE_MS = 15_000;

// This qualifies engagement for alerts; it does not certify a human visitor.
export function getSessionNotificationDecision(session: ActiveSessionRecord): SessionNotificationDecision {
  if (session.notificationDecision?.qualified) {
    return { qualified: true, reason: "qualified_engagement" };
  }
  if (session.totalEngagedMs < MIN_NOTIFICATION_VISIBLE_MS) {
    return { qualified: false, reason: "brief_visit" };
  }
  if (!session.hasInteraction && Object.keys(session.pages).length < 2) {
    return { qualified: false, reason: "no_interaction" };
  }
  return { qualified: true, reason: "qualified_engagement" };
}
