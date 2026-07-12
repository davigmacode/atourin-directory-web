"use client";

import React, { useState } from "react";
import { hc } from "@/styles/help-center-styles";
import { HC } from "@/data/help-center-data";
import Breadcrumb from "./Breadcrumb";

export default function ArticleView({ art, cat, onHome, onCat, onArt }) {
  const related = cat.articles.filter((x) => x.q !== art.q).slice(0, 2);
  const [voted, setVoted] = useState(null);

  function vote(v) {
    setVoted(v);
    alert(v === "yes" ? "Terima kasih! Senang artikel ini berguna." : "Maaf belum membantu. CS kami siap melayani Anda.");
  }

  return (
    <div style={hc.articleWrap}>
      <Breadcrumb
        items={[
          { label: "Pusat Bantuan", onClick: onHome },
          { label: cat.t, onClick: () => onCat(cat) },
          { label: art.q },
        ]}
      />
      <div style={hc.artLayout} className="hc-art-layout">
        <article style={hc.artMain}>
          <span style={{ ...hc.catPill, color: cat.tint, background: cat.tint + "18" }}>
            {HC[cat.icon]} {cat.t}
          </span>
          <h1 style={hc.artTitle}>{art.q}</h1>
          <p style={hc.artIntro}>{art.intro}</p>
          <ol style={hc.steps}>
            {art.steps.map((s, i) => (
              <li key={i} style={hc.step}>
                <span style={hc.stepNum}>{i + 1}</span>
                <span style={hc.stepText}>{s}</span>
              </li>
            ))}
          </ol>
          {art.note && (
            <div style={hc.note}>
              <strong>💡 Penting:</strong> {art.note}
            </div>
          )}

          <div style={hc.feedback}>
            <span style={hc.fbLabel}>Apakah artikel ini membantu?</span>
            <div style={hc.fbBtns}>
              <button
                style={{ ...hc.fbBtn, ...(voted === "yes" ? hc.fbBtnYes : {}) }}
                onClick={() => vote("yes")}
              >
                {HC.up} Ya
              </button>
              <button
                style={{ ...hc.fbBtn, ...(voted === "no" ? hc.fbBtnNo : {}) }}
                onClick={() => vote("no")}
              >
                {HC.down} Tidak
              </button>
            </div>
          </div>
        </article>

        <aside style={hc.artSide}>
          {related.length > 0 && (
            <div style={hc.card}>
              <div style={hc.sideTitle}>Artikel terkait</div>
              {related.map((r) => (
                <button
                  key={r.q}
                  style={hc.relItem}
                  className="hc-lift"
                  onClick={() => onArt(r, cat)}
                >
                  <span style={hc.relText}>{r.q}</span>
                  {HC.chev}
                </button>
              ))}
            </div>
          )}
          <div style={hc.helpCta}>
            <div style={hc.helpCtaTitle}>Masih butuh bantuan?</div>
            <div style={hc.helpCtaDesc}>Tim CS kami siap membantu 7 hari seminggu.</div>
            <button
              onClick={() => alert("Hubungi CS WhatsApp")}
              style={{ ...hc.helpCtaBtn, border: "none", cursor: "pointer", fontFamily: "var(--atr-font-sans)" }}
            >
              {HC.chat} Hubungi CS
            </button>
          </div>
        </aside>
      </div>
      <button style={hc.backLink} onClick={() => onCat(cat)}>
        {HC.back} Kembali ke {cat.t}
      </button>
    </div>
  );
}
