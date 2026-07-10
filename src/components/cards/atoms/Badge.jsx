import React from "react";

/**
 * Badge — reusable pill/overlay badge.
 *
 * Renders a <span> with the passed style (typically absolute-positioned
 * via cs.atrCat, cs.desaStatus, cs.itinDaysBadge, cs.itinThemeBadge, etc.).
 *
 * Props:
 *   children  — text/JSX content inside the badge
 *   style     — React style object (position, colors, etc.)
 */
export default function Badge({ children, style = {} }) {
  return <span style={style}>{children}</span>;
}
