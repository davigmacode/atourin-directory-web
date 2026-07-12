"use client";

import React from "react";
import { ab } from "@/styles/about-styles";
import { TIMELINE } from "@/data/about-data";

export default function AboutTimeline() {
  return (
    <div style={ab.timeline} className="ab-time">
      <div style={ab.timeLineBar} className="ab-time-line" />
      {TIMELINE.map(([y, t, d]) => (
        <div key={y} style={ab.timeStep}>
          <span style={ab.timeDot} />
          <div style={ab.timeYear}>{y}</div>
          <div style={ab.timeT}>{t}</div>
          <div style={ab.timeD}>{d}</div>
        </div>
      ))}
    </div>
  );
}
