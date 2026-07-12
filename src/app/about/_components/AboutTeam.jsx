"use client";

import React from "react";
import { ab } from "@/styles/about-styles";
import { TEAM } from "@/data/about-data";

export default function AboutTeam() {
  return (
    <>
      <div style={ab.subhead}>Leadership</div>
      <div style={ab.leadGrid} className="ab-lead">
        {TEAM.filter((t) => t.lead).map((t) => (
          <div key={t.n} style={ab.teamCard} className="ab-team-card">
            <div style={ab.teamImgWrap}>
              <img
                src={t.img}
                alt=""
                style={ab.teamImg}
                onError={(e) => {
                  e.currentTarget.style.opacity = 0;
                }}
              />
            </div>
            <div style={ab.teamBody}>
              <div style={ab.teamN}>{t.n}</div>
              <div style={ab.teamR}>{t.r}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...ab.subhead, marginTop: 36 }}>Team</div>
      <div style={ab.teamGrid} className="ab-team">
        {TEAM.filter((t) => !t.lead).map((t) => (
          <div key={t.n} style={ab.teamCard} className="ab-team-card">
            <div style={ab.teamImgWrap}>
              <img
                src={t.img}
                alt=""
                style={ab.teamImg}
                onError={(e) => {
                  e.currentTarget.style.opacity = 0;
                }}
              />
            </div>
            <div style={ab.teamBody}>
              <div style={ab.teamN}>{t.n}</div>
              <div style={ab.teamR}>{t.r}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
