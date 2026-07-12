"use client";

import React from "react";
import { ab } from "@/styles/about-styles";
import { IMPACT, AB_I } from "@/data/about-data";

export default function AboutImpact() {
  return (
    <section style={ab.impactBand}>
      <div style={ab.body}>
        <div style={ab.secHead}>
          <div style={{ ...ab.kicker, color: "#FFD98A" }}>Dampak kami</div>
          <h2 style={{ ...ab.secTitle, color: "#fff" }}>Liburanmu, dampak nyata untuk Indonesia</h2>
        </div>
        <div style={ab.impactGrid} className="ab-grid4">
          {IMPACT.map((m) => (
            <div key={m.l} style={ab.impactCard}>
              <span style={ab.impactIcon}>{AB_I[m.icon]}</span>
              <div style={ab.impactV}>{m.v}</div>
              <div style={ab.impactL}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
