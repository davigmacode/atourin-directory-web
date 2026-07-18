"use client";

import React from "react";

/**
 * CardBadge — small absolute-positioned pill on a card image.
 * Used for status, theme, days overlays. Props are spread
 * straight to the underlying span; caller controls position
 * via the `style` prop or by selecting from tc.desaStatus / etc.
 */
export default function CardBadge({ style, children, ...rest }) {
  return (
    <span style={style} {...rest}>
      {children}
    </span>
  );
}
