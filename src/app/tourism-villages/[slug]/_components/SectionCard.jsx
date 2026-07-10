"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

export default function SectionCard({
  title,
  eyebrow,
  icon,
  link,
  linkLabel,
  children,
  style = {},
}) {
  return (
    <section style={{ ...ds.section, ...style }}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
            {title}
          </h2>
          {eyebrow && <div style={ds.sectionSub}>{eyebrow}</div>}
        </div>
        {link && (
          <a href={link} style={ds.sectionLink}>
            {linkLabel || "Lihat semua"} <span>{"\u2192"}</span>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}
