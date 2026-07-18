"use client";

import React from "react";
import dh from "@/styles/destination-detail";

/**
 * InfoSection — single white card with title + content.
 * Used in the Info tab for Tentang / Cuaca / Tips / FAQ / Kontak.
 */
export default function InfoSection({ icon, title, children }) {
  return (
    <section style={dh.infoCard}>
      <h2 style={dh.infoTitle}>
        <span>{icon}</span> {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
