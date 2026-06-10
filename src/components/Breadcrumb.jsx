"use client";

import React from "react";
import chromeStyles from "@/styles/chrome-styles";

export default function Breadcrumb({ items }) {
  return (
    <nav style={chromeStyles.crumb}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span
            style={
              i === items.length - 1
                ? chromeStyles.crumbCurrent
                : chromeStyles.crumbItem
            }
          >
            {it}
          </span>
          {i < items.length - 1 && <span style={chromeStyles.crumbSep}>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
