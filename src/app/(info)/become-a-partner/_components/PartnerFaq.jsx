"use client";

import React, { useState } from "react";
import { mt } from "@/styles/become-a-partner-styles";
import { MI, MITRA_FAQ } from "@/data/become-a-partner-data";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={mt.faqItem}>
      <button style={mt.faqQ} onClick={() => setOpen((v) => !v)}>
        <span>{q}</span>
        <span style={{ ...mt.faqIcon, transform: open ? "rotate(45deg)" : "none" }}>{MI.plus}</span>
      </button>
      {open && <div style={mt.faqA}>{a}</div>}
    </div>
  );
}

export default function PartnerFaq() {
  return (
    <div style={mt.faqWrap}>
      {MITRA_FAQ.map(([q, a]) => (
        <FaqItem key={q} q={q} a={a} />
      ))}
    </div>
  );
}
