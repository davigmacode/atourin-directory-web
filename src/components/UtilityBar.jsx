"use client";

import React, { useState, useEffect, useRef } from "react";
import { ReceiptIcon, HandshakeIcon } from "./icons";
import utilStyles from "@/styles/util-styles";
import { t, flag, code, getLang, setLang } from "@/lib/i18n";
import PromoQRPopover from "./PromoQRPopover";

export default function UtilityBar({
  variant = "quiet",
  dismissible = false,
  isLoggedIn = false,
  orderCount = 0,
  showPromo = true,
}) {
  const [dismissed, setDismissed] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showLocale, setShowLocale] = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    if (!dismissible) return;
    try {
      setDismissed(localStorage.getItem("atr.promoDismissed") === "1");
    } catch {}
  }, []);

  function onPromoEnter() {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setShowQR(true), 120);
  }
  function onPromoLeave() {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setShowQR(false), 150);
  }

  if (dismissed) return null;

  return (
    <div
      style={{
        ...utilStyles.bar,
        ...(variant === "soft" ? utilStyles.barSoft : utilStyles.barQuiet),
      }}
    >
      <style>{`@media (max-width:680px){ .atr-util-promo{display:none !important} .atr-util-inner{justify-content:flex-end !important;padding-left:18px !important;padding-right:18px !important} }`}</style>
      <div style={utilStyles.inner} className="atr-util-inner">
        {showPromo ? (
          <div
            style={utilStyles.promoSlot}
            className="atr-util-promo"
            onMouseEnter={onPromoEnter}
            onMouseLeave={onPromoLeave}
          >
            <span style={{ fontSize: 13 }}>{"\uD83C\uDF89"}</span>
            <span style={utilStyles.promoText}>
              {t("util.promo")} <strong>Atourin</strong>
            </span>
            <a
              href="#promo"
              style={utilStyles.promoCta}
              onClick={(e) => {
                e.preventDefault();
                setShowQR((v) => !v);
              }}
            >
              {t("util.cekPromo")} {"\u2192"}
            </a>
            {showQR && <PromoQRPopover onClose={() => setShowQR(false)} />}
          </div>
        ) : (
          <div />
        )}

        <div style={utilStyles.right}>
          <a href="/" style={utilStyles.utilLink}>
            <ReceiptIcon /> {t("nav.pesanan")}
            {isLoggedIn && orderCount > 0 && (
              <span style={utilStyles.badge}>{orderCount}</span>
            )}
          </a>
          <a href="/" style={utilStyles.mitraLink}>
            <HandshakeIcon /> {t("nav.mitra")}
          </a>
          <span style={utilStyles.divider} />
          <div style={{ position: "relative" }}>
            <button
              style={utilStyles.localeBtnInline}
              onClick={() => setShowLocale((v) => !v)}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>{flag()}</span>
              <span>{code()}</span>
              <span
                style={{
                  fontSize: 9,
                  opacity: 0.6,
                  transform: showLocale ? "rotate(180deg)" : "none",
                  transition: "transform .2s",
                }}
              >
                {"\u25BE"}
              </span>
            </button>
            {showLocale && (
              <div style={utilStyles.localeMenu}>
                <button
                  style={{
                    ...utilStyles.localeOpt,
                    ...(getLang() === "id" ? utilStyles.localeOptActive : {}),
                  }}
                  onClick={() => {
                    setShowLocale(false);
                    setLang("id");
                  }}
                >
                  {"\uD83C\uDDEE\uD83C\uDDE9"} Bahasa Indonesia
                </button>
                <button
                  style={{
                    ...utilStyles.localeOpt,
                    ...(getLang() === "en" ? utilStyles.localeOptActive : {}),
                  }}
                  onClick={() => {
                    setShowLocale(false);
                    setLang("en");
                  }}
                >
                  {"\uD83C\uDDFA\uD83C\uDDF8"} English
                </button>
              </div>
            )}
          </div>
          {dismissible && (
            <button
              style={utilStyles.closeBtn}
              aria-label="Tutup promo bar"
              onClick={() => {
                try {
                  localStorage.setItem("atr.promoDismissed", "1");
                } catch {}
                setDismissed(true);
              }}
            >
              {"\u00D7"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
