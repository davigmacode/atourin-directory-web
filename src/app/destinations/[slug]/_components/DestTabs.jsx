"use client";

import React from "react";
import dh from "@/styles/destination-detail";

export default function DestTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div style={dh.tabBar}>
      <div style={dh.tabInner}>
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{ ...dh.tabBtn, ...(active ? dh.tabBtnActive : {}) }}
            >
              <span>{t.label}</span>
              {t.count != null && (
                <span
                  style={{
                    ...dh.tabCount,
                    ...(active ? dh.tabCountActive : {}),
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
