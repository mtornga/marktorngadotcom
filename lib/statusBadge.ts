/**
 * Status badges normally read as delivery state ("Production", "Presented
 * Live"), so they all share the accent colour. "Pre-AI!" is an era marker
 * instead — it gets the yellow variant so the older maker projects are
 * distinguishable at a glance in the portfolio grid.
 */
export const PRE_AI_STATUS = 'Pre-AI!';

export function statusBadgeVariant(
  status: string
): 'primary' | 'secondary' | 'accent' {
  return status === PRE_AI_STATUS ? 'secondary' : 'accent';
}
