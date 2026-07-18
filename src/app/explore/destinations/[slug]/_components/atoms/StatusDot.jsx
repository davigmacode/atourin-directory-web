"use client";

import React from "react";

/**
 * StatusDot — small colored dot used inside status badges
 * (e.g. Rintisan/Berkembang/Maju/Mandiri chips).
 */
export default function StatusDot({ color, style }) {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: 999,
        display: "inline-block",
        background: color,
        ...style,
      }}
    />
  );
}
