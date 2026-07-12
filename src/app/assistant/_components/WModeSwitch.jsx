"use client";

import React from "react";
import { AIW_PURPLE } from "@/styles/assistant-styles";

export default function WModeSwitch({ mode, setMode }) {
  const opts = [
    ["chat", "💬", "Chat"],
    ["map", "🗺", "Peta"],
    ["voice", "🎤", "Suara"],
  ];
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 4,
        background: "rgba(255,255,255,.16)",
        padding: 4,
        borderRadius: 9999,
      }}
    >
      {opts.map(([id, ic, label]) => {
        const on = mode === id;
        return (
          <button
            key={id}
            onClick={() => setMode(id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "7px 14px",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 700,
              background: on ? "#fff" : "transparent",
              color: on ? AIW_PURPLE : "#fff",
            }}
          >
            {ic} {label}
          </button>
        );
      })}
    </div>
  );
}
