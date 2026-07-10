import React from "react";
import cs from "@/styles/card-styles";

/**
 * GuideMetaBar — specs + languages rows for guide cards.
 *
 * Props:
 *   specs  — array of strings (specialisation badges)
 *   langs  — array of strings (languages spoken)
 *   certs  — array of strings (certification badges, optional)
 */
export default function GuideMetaBar({ specs = [], langs = [], certs = [] }) {
  return (
    <>
      {specs.length > 0 && (
        <div style={cs.guideSpecRow}>
          {specs.map((s) => (
            <span key={s} style={cs.guideSpec}>
              {s}
            </span>
          ))}
        </div>
      )}
      {langs.length > 0 && (
        <div style={cs.guideLangRow}>
          {langs.map((l, j) => (
            <span key={j} style={cs.guideLang}>
              {l}
            </span>
          ))}
        </div>
      )}
      {certs.length > 0 && (
        <div style={cs.guideCerts}>
          {certs.slice(0, 3).map((c) => (
            <span key={c} style={cs.guideCert}>
              {c}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
