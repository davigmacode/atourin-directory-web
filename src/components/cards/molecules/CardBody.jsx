import React from "react";
import cs from "@/styles/card-styles";

/**
 * CardBody — standard card body section.
 *
 * Props:
 *   name     — card title (renders as h3)
 *   desc     — description text
 *   meta     — JSX for the meta row (rating, location, etc.)
 *   children — extra content rendered after the standard fields
 *   style    — overrides for the wrapper div
 */
export default function CardBody({ name, desc, meta, children, style }) {
  return (
    <div style={{ ...cs.atrBody, ...style }}>
      {name && <h3 style={cs.atrName}>{name}</h3>}
      {desc && <p style={cs.atrDesc}>{desc}</p>}
      {meta && <div style={cs.atrMeta}>{meta}</div>}
      {children}
    </div>
  );
}
