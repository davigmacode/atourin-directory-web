"use client";

import React from "react";
import layoutStyles from "@/styles/layout-styles";

export default function Breadcrumb({ items }) {
  return (
    <nav style={layoutStyles.crumb}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span
            style={
              i === items.length - 1
                ? layoutStyles.crumbCurrent
                : layoutStyles.crumbItem
            }
          >
            {it}
          </span>
          {i < items.length - 1 && <span style={layoutStyles.crumbSep}>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
