"use client";

import React, { useState, useEffect, useRef } from "react";
import { ps, insStyles, kStyles } from "@/styles/profile-styles";
import { INS_STATS, INS_TABS, INSURANCES } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead, Select } from "../_components/profile-helpers";

const CLAIM_TYPES = [
  { key: "medis",    label: "Biaya Medis Darurat",          hint: "Rawat jalan / inap akibat sakit atau cedera saat perjalanan.", docs: ["Resume medis / surat dokter", "Kuitansi & rincian biaya", "Salinan resep obat"] },
  { key: "delay",    label: "Keterlambatan Penerbangan",    hint: "Kompensasi keterlambatan 4 jam atau lebih.",                   docs: ["Boarding pass / tiket", "Surat keterangan delay maskapai", "Bukti pengeluaran"] },
  { key: "cancel",   label: "Pembatalan Perjalanan",        hint: "Trip batal karena alasan yang dijamin polis.",                 docs: ["Invoice pemesanan", "Bukti pembatalan", "Dokumen pendukung alasan"] },
  { key: "baggage",  label: "Kehilangan / Kerusakan Bagasi", hint: "Bagasi hilang, rusak, atau tertunda oleh maskapai.",          docs: ["Property Irregularity Report (PIR)", "Tag bagasi", "Foto / daftar barang"] },
  { key: "accident", label: "Kecelakaan Diri",              hint: "Santunan akibat kecelakaan selama perjalanan.",                docs: ["Surat keterangan medis", "Laporan kejadian / kepolisian", "Identitas tertanggung"] },
];

const CLAIM_STAGES = [
  { n: 1, label: "Klaim diajukan",     desc: "Pengajuan & dokumen diterima sistem." },
  { n: 2, label: "Verifikasi dokumen", desc: "Tim klaim memeriksa kelengkapan & keabsahan dokumen." },
  { n: 3, label: "Klaim disetujui",    desc: "Nilai santunan dihitung & disetujui." },
  { n: 4, label: "Dana dicairkan",     desc: "Santunan ditransfer ke rekening tertanggung." },
];

const KI = {
  doc:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6V3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M14 3v4h4M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  upload: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 16V5m0 0L8 9m4-4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  wallet: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7"/><path d="M16 12h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  alert:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 4l9 16H3l9-16z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M12 10v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  spark:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
};

const INS_TONE = { green: "var(--atr-arti)", yellow: "var(--atr-yellow)", purple: "var(--atr-purple)" };

function insBadge(status) {
  if (status === "Aktif") return <span style={{ fontSize: 12, fontWeight: 700, color: "var(--atr-arti)", background: "rgba(81,176,84,0.14)", padding: "3px 10px", borderRadius: 999 }}>Aktif</span>;
  if (status === "Menunggu Data") return <span style={{ fontSize: 12, fontWeight: 700, color: "#9A6A00", background: "rgba(255,196,66,0.2)", padding: "3px 10px", borderRadius: 999 }}>Menunggu Data</span>;
  return <span style={{ fontSize: 12, fontWeight: 700, color: "var(--atr-text-muted)", letterSpacing: "0.04em" }}>FAILED</span>;
}

function claimStatusBadge(stage) {
  const map = {
    4: { t: "Selesai",   c: "var(--atr-arti)", b: "rgba(81,176,84,0.14)" },
    3: { t: "Disetujui", c: "var(--atr-arti)", b: "rgba(81,176,84,0.14)" },
    2: { t: "Diproses",  c: "#9A6A00",         b: "rgba(255,196,66,0.2)" },
    1: { t: "Diajukan",  c: "var(--atr-purple)", b: "var(--atr-purple-50)" },
  }[stage] || { t: "Diajukan", c: "var(--atr-purple)", b: "var(--atr-purple-50)" };
  return <span style={{ fontSize: 12, fontWeight: 700, color: map.c, background: map.b, padding: "3px 10px", borderRadius: 999 }}>{map.t}</span>;
}

const rpK = (n) => "Rp " + (n || 0).toLocaleString("id-ID");

function InsuranceListView({ onOpenDetail }) {
  const [tab, setTab] = useState("Semua");
  const [active, setActive] = useState("semua");
  const [q, setQ] = useState("");

  const list = INSURANCES.filter((i) => {
    const okTab = tab === "Semua" || (tab === "Aktif" && i.status === "Aktif") || (tab === "Menunggu Data" && i.status === "Menunggu Data");
    const okQ = !q || (i.code + i.reqId).toLowerCase().includes(q.toLowerCase());
    return okTab && okQ;
  });

  return (
    <div style={ps.panel}>
      <div style={insStyles.head}>
        <span style={insStyles.headIcon}>{PI.shield}</span>
        <div>
          <div style={ps.h1}>Asuransi</div>
          <div style={ps.sub}>Lindungi setiap langkah perjalananmu, pantau polis dan statusnya di sini</div>
        </div>
      </div>

      <div style={insStyles.statGrid}>
        {INS_STATS.map((s) => (
          <div key={s.key} style={{ ...insStyles.statCard, ...(active === s.key ? insStyles.statCardOn : {}) }} onClick={() => setActive(s.key)}>
            <span style={{ ...insStyles.statIcon, background: INS_TONE[s.tone] }}>{PI[s.icon]}</span>
            <div>
              <div style={insStyles.statLabel}>{s.label}</div>
              <div style={insStyles.statCount}>{s.count}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={ps.tabBar}>
        {INS_TABS.map((t) => (
          <button key={t} style={{ ...ps.tab, ...(t === tab ? ps.tabActive : {}) }} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div style={ps.search}>
        <span style={{ color: "var(--atr-text-muted)" }}>{PI.search}</span>
        <input style={ps.searchInput} placeholder="Cari invoice atau request ID..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {list.map((i) => (
        <div key={i.code} style={insStyles.row} className="atr-ins-row" onClick={() => onOpenDetail(i.code)}>
          <div style={insStyles.rowMain}>
            <div style={insStyles.rowTop}>
              <span style={insStyles.code}>{i.code}</span>
              {insBadge(i.status)}
            </div>
            <div style={insStyles.grid}>
              <div><div style={insStyles.cellLabel}>Request ID</div><div style={insStyles.cellVal}>{i.reqId.slice(0, 14)}…</div></div>
              <div><div style={insStyles.cellLabel}>Total Premi</div><div style={insStyles.cellVal}>Rp {i.premi.toLocaleString("id-ID")}</div></div>
              <div><div style={insStyles.cellLabel}>Jumlah Tertanggung</div><div style={insStyles.cellVal}>{i.covered} orang</div></div>
              <div><div style={insStyles.cellLabel}>Tanggal Dibuat</div><div style={insStyles.cellVal}>{i.date}</div></div>
            </div>
          </div>
          <span style={{ color: "var(--atr-text-muted)", flexShrink: 0 }}>{PI.chevR}</span>
        </div>
      ))}
    </div>
  );
}

function InsuranceDetailView({ code, onBack, onOpenKlaimForm, onOpenKlaimStatus, claimsStore }) {
  const [ins, setIns] = useState(() => INSURANCES.find((i) => i.code === code) || INSURANCES[0]);
  const [, forceUpdate] = useState(0);
  const [fName, setFName] = useState("");
  const [fId, setFId] = useState("");
  const [fBirth, setFBirth] = useState("");

  const claims = claimsStore[ins.code] || [];
  const canClaim = ins.status === "Aktif";
  const idValid = fId.replace(/\D/g, "").length === 16;
  const formValid = fName.trim().length > 2 && idValid && !!fBirth;

  function submitData() {
    if (!formValid) return;
    const updated = {
      ...ins,
      status: "Aktif",
      covered: 1,
      policies: [{
        no: 1,
        name: fName,
        policyNo: "752700915" + String(Date.now()).slice(-9),
        ticketNo: "ATR-" + ins.code,
        idNo: fId.replace(/\D/g, ""),
        birth: fBirth,
        premi: ins.premi,
        route: "Indonesia",
        dest: "Akan dikonfirmasi",
        depart: "Sesuai jadwal trip",
        ret: "Sesuai jadwal trip"
      }]
    };
    // Update local state and global reference
    const idx = INSURANCES.findIndex((i) => i.code === ins.code);
    if (idx !== -1) INSURANCES[idx] = updated;
    setIns(updated);
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Data tertanggung lengkap · polis kini Aktif!");
    }
  }

  return (
    <div style={ps.panel}>
      <div style={insStyles.detailHead} onClick={onBack}>{PI.back} Kembali ke Daftar Asuransi</div>

      <div style={insStyles.summary}>
        <div style={insStyles.sumTop}>
          <span style={insStyles.sumIcon}>{PI.shield}</span>
          <div style={insStyles.sumCode}>{ins.code}</div>
          <div style={{ marginLeft: "auto" }}>{insBadge(ins.status)}</div>
        </div>
        <div style={insStyles.polGrid}>
          <div><div style={insStyles.cellLabel}>Request ID</div><div style={insStyles.cellVal}>{ins.reqId.slice(0, 14)}…</div></div>
          <div><div style={insStyles.cellLabel}>Total Premi</div><div style={insStyles.cellVal}>Rp {ins.premi.toLocaleString("id-ID")}</div></div>
          <div><div style={insStyles.cellLabel}>Jumlah Tertanggung</div><div style={insStyles.cellVal}>{ins.covered} orang</div></div>
          <div><div style={insStyles.cellLabel}>Tanggal Dibuat</div><div style={insStyles.cellVal}>{ins.date}</div></div>
        </div>
      </div>

      <div style={insStyles.polHead}>{PI.user} Daftar Polis</div>

      {ins.policies.length === 0 ? (
        ins.status === "Menunggu Data" ? (
          <div style={{ border: "1px solid var(--atr-purple-light)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(255,196,66,0.16)", padding: "14px 20px", fontSize: 13.5, color: "#7A5A00", lineHeight: 1.5, borderBottom: "1px solid var(--atr-purple-light)" }}>
              <span style={{ flexShrink: 0 }}>{PI.clock}</span>
              <span>Polis ini <b>menunggu data tertanggung</b>. Lengkapi <b>nomor KTP</b> &amp; <b>tanggal lahir</b> agar polis dapat diterbitkan &amp; diaktifkan.</span>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Lengkapi Data Tertanggung</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 18px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={ps.formLabel}>Nama lengkap (sesuai KTP) <span style={ps.req}>*</span></label>
                  <input style={ps.input} value={fName} onChange={(e) => setFName(e.target.value)} placeholder="contoh: Aulia Priyono" />
                </div>
                <div>
                  <label style={ps.formLabel}>Nomor KTP (NIK) <span style={ps.req}>*</span></label>
                  <input style={ps.input} inputMode="numeric" maxLength={16} value={fId} onChange={(e) => setFId(e.target.value.replace(/[^0-9]/g, ""))} placeholder="16 digit" />
                  <span style={{ fontSize: 12, color: idValid ? "var(--atr-arti)" : "var(--atr-text-muted)", marginTop: 6, display: "inline-block" }}>{fId ? `${fId.replace(/\D/g, "").length}/16 digit` : "Wajib 16 digit"}</span>
                </div>
                <div>
                  <label style={ps.formLabel}>Tanggal lahir <span style={ps.req}>*</span></label>
                  <input type="date" style={ps.input} value={fBirth} onChange={(e) => setFBirth(e.target.value)} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
                <button style={{ ...ps.btnPrimary, opacity: formValid ? 1 : 0.5, cursor: formValid ? "pointer" : "not-allowed" }} disabled={!formValid} onClick={submitData}>{PI.check} Simpan & Aktifkan Polis</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ border: "2px dashed var(--atr-outline)", borderRadius: 14, padding: "40px 20px", textAlign: "center", color: "var(--atr-text-muted)" }}>
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>{PI.shield}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--atr-text)" }}>Polis gagal diterbitkan</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Transaksi ini gagal diproses. Hubungi Pusat Bantuan untuk penerbitan ulang.</div>
          </div>
        )
      ) : ins.policies.map((p) => (
        <div key={p.no} style={insStyles.polCard}>
          <div style={insStyles.polTop}>
            <span style={insStyles.polNum}>{p.no}</span>
            <span style={insStyles.polName}>{p.name}</span>
            <span style={insStyles.polPremi}>Rp {p.premi.toLocaleString("id-ID")}</span>
          </div>
          <div style={insStyles.polGrid}>
            <div><div style={insStyles.cellLabel}>Nomor Polis</div><div style={insStyles.cellVal}>{p.policyNo}</div></div>
            <div><div style={insStyles.cellLabel}>Nomor Tiket</div><div style={insStyles.cellVal}>{p.ticketNo}</div></div>
            <div><div style={insStyles.cellLabel}>Identitas</div><div style={insStyles.cellVal}>{p.idNo}</div></div>
            <div><div style={insStyles.cellLabel}>Premi</div><div style={insStyles.cellVal}>Rp {p.premi.toLocaleString("id-ID")}</div></div>
            <div><div style={insStyles.cellLabel}>Rute</div><div style={insStyles.cellVal}>{p.route}</div></div>
            <div><div style={insStyles.cellLabel}>Destinasi</div><div style={insStyles.cellVal}>{p.dest}</div></div>
            <div><div style={insStyles.cellLabel}>Keberangkatan</div><div style={insStyles.cellVal}>{p.depart}</div></div>
            <div><div style={insStyles.cellLabel}>Kepulangan</div><div style={insStyles.cellVal}>{p.ret}</div></div>
          </div>
        </div>
      ))}

      {/* ===== KLAIM ===== */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, margin: "30px 0 14px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 18, fontWeight: 700, color: "var(--atr-text)" }}>{PI.wallet} Klaim Asuransi</div>
        {canClaim && (
          <button style={ps.btnPrimary} onClick={() => onOpenKlaimForm && onOpenKlaimForm(ins.code)}>{PI.plus} Ajukan Klaim</button>
        )}
      </div>

      {!canClaim ? (
        <div style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "18px 20px", fontSize: 13.5, color: "var(--atr-text-muted)", lineHeight: 1.5, background: "var(--atr-bg-soft)" }}>
          Klaim hanya dapat diajukan untuk polis berstatus <b>Aktif</b>. Lengkapi data tertanggung dan selesaikan pembayaran untuk mengaktifkan polis ini.
        </div>
      ) : claims.length === 0 ? (
        <div style={{ border: "2px dashed var(--atr-outline)", borderRadius: 14, padding: "32px 20px", textAlign: "center", color: "var(--atr-text-muted)" }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--atr-text)" }}>Belum ada klaim</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Ajukan klaim bila terjadi keterlambatan, kecelakaan, atau kejadian lain yang dijamin polis.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {claims.map((c) => (
            <div key={c.id} style={{ border: "1px solid var(--atr-outline)", borderRadius: 14, padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, boxShadow: "var(--atr-shadow-1)" }} className="atr-ins-row" onClick={() => onOpenKlaimStatus && onOpenKlaimStatus(c.id)}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "var(--atr-text)", letterSpacing: "0.01em" }}>{c.id}</span>
                  {claimStatusBadge(c.stage)}
                </div>
                <div style={insStyles.grid}>
                  <div><div style={insStyles.cellLabel}>Jenis</div><div style={insStyles.cellVal}>{c.type}</div></div>
                  <div><div style={insStyles.cellLabel}>Tanggal Pengajuan</div><div style={insStyles.cellVal}>{c.filedDate}</div></div>
                  <div><div style={insStyles.cellLabel}>Nilai Diajukan</div><div style={insStyles.cellVal}>{rpK(c.amount)}</div></div>
                  <div><div style={insStyles.cellLabel}>Disetujui</div><div style={insStyles.cellVal}>{c.stage >= 3 ? "Rp " + (c.approved || c.amount).toLocaleString("id-ID") : "Menunggu"}</div></div>
                </div>
              </div>
              <span style={{ color: "var(--atr-text-muted)", flexShrink: 0 }}>{PI.chevR}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClaimFormView({ code, onBack, onSubmitted }) {
  const ins = INSURANCES.find((i) => i.code === code) || INSURANCES[0];
  const policy = (ins.policies && ins.policies[0]) || { name: "Tertanggung", policyNo: "-" };

  const [step, setStep] = useState(1);
  const [typeKey, setTypeKey] = useState("delay");
  const [incidentDate, setIncidentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [docs, setDocs] = useState([]);
  const [bankName, setBankName] = useState("BCA");
  const [bankAcc, setBankAcc] = useState("");
  const [bankHolder, setBankHolder] = useState(policy.name);

  const t = CLAIM_TYPES.find((ct) => ct.key === typeKey) || CLAIM_TYPES[0];
  const steps = ["Jenis klaim", "Detail kejadian", "Dokumen", "Rekening"];

  function addDoc(name) { setDocs((d) => d.includes(name) ? d : [...d, name]); }
  function rmDoc(name) { setDocs((d) => d.filter((x) => x !== name)); }

  const canNext =
    step === 1 ? !!typeKey :
    step === 2 ? (incidentDate && Number(amount) > 0 && desc.trim().length > 4) :
    step === 3 ? docs.length >= 1 :
    (bankName && bankAcc.trim().length >= 6 && bankHolder.trim());

  function submit() {
    const id = "KLM-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(100 + Math.random() * 900);
    const newClaim = {
      id, insCode: ins.code, typeKey, type: t.label, policyName: policy.name,
      incidentDate, filedDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      amount: Number(amount), approved: 0, bankName, bankAcc, bankHolder, desc, docs, stage: 1,
    };
    onSubmitted(ins.code, newClaim);
  }

  return (
    <div style={ps.panel}>
      <div style={kStyles.detailHead} onClick={onBack}>{PI.back} Kembali ke Detail Asuransi</div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <span style={kStyles.headIcon}>{PI.shield}</span>
        <div>
          <div style={ps.h1}>Ajukan Klaim</div>
          <div style={ps.sub}>Polis {ins.code} · {policy.name} · {policy.policyNo}</div>
        </div>
      </div>

      {/* stepper */}
      <div style={kStyles.stepper}>
        {steps.map((s, i) => {
          const n = i + 1, done = n < step, on = n === step;
          return (
            <React.Fragment key={s}>
              <div style={kStyles.stepItem}>
                <span style={{ ...kStyles.stepDot, ...(on ? kStyles.stepDotOn : done ? kStyles.stepDotDone : {}) }}>
                  {done ? PI.check : n}
                </span>
                <span style={{ ...kStyles.stepLabel, color: on ? "var(--atr-purple)" : done ? "var(--atr-text)" : "var(--atr-text-muted)" }}>{s}</span>
              </div>
              {i < steps.length - 1 && <span style={{ ...kStyles.stepBar, background: done ? "var(--atr-purple)" : "var(--atr-outline)" }} />}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ marginTop: 26 }}>
        {step === 1 && (
          <div>
            <div style={kStyles.qLabel}>Pilih jenis klaim yang diajukan</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
              {CLAIM_TYPES.map((ct) => {
                const on = typeKey === ct.key;
                return (
                  <button key={ct.key} onClick={() => setTypeKey(ct.key)} style={{ ...kStyles.typeCard, ...(on ? kStyles.typeCardOn : {}) }}>
                    <span style={{ ...kStyles.radio, ...(on ? kStyles.radioOn : {}) }}>{on && <span style={kStyles.radioInner} />}</span>
                    <span style={{ flex: 1 }}>
                      <span style={kStyles.typeName}>{ct.label}</span>
                      <span style={kStyles.typeHint}>{ct.hint}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={ps.formGrid}>
              <div style={kStyles.field}>
                <label style={ps.formLabel}>Tanggal kejadian <span style={ps.req}>*</span></label>
                <input type="date" style={ps.input} value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
              </div>
              <div style={kStyles.field}>
                <label style={ps.formLabel}>Estimasi nilai klaim <span style={ps.req}>*</span></label>
                <input type="number" inputMode="numeric" placeholder="contoh: 750000" style={ps.input} value={amount} onChange={(e) => setAmount(e.target.value)} />
                {Number(amount) > 0 && <span style={kStyles.helper}>{rpK(Number(amount))}</span>}
              </div>
            </div>
            <div style={kStyles.field}>
              <label style={ps.formLabel}>Kronologi kejadian <span style={ps.req}>*</span></label>
              <textarea rows={4} placeholder="Jelaskan kronologi singkat kejadian..." style={{ ...ps.input, resize: "vertical", lineHeight: 1.5 }} value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div style={kStyles.infoNote}><span style={{ color: "var(--atr-purple)", flexShrink: 0 }}>{KI.alert}</span><span>Pastikan tanggal kejadian berada dalam periode pertanggungan polis ({policy.policyNo}).</span></div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={kStyles.qLabel}>Unggah dokumen pendukung</div>
            <div style={ps.sub}>Dokumen yang disarankan untuk klaim <b>{t.label}</b>:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {t.docs.map((d, i) => {
                const fname = d.replace(/[^a-zA-Z]/g, "").slice(0, 10) + (i % 2 ? ".pdf" : ".jpg");
                const up = docs.includes(fname);
                return (
                  <div key={d} style={{ ...kStyles.docRow, ...(up ? kStyles.docRowOn : {}) }}>
                    <span style={{ color: up ? "var(--atr-arti)" : "var(--atr-text-muted)", flexShrink: 0 }}>{up ? PI.check : KI.doc}</span>
                    <span style={{ flex: 1 }}>
                      <span style={kStyles.docName}>{d}</span>
                      {up && <span style={kStyles.docFile}>{fname} · terunggah</span>}
                    </span>
                    {up
                      ? <button style={ps.linkBtn} onClick={() => rmDoc(fname)}>Hapus</button>
                      : <button style={kStyles.uploadBtn} onClick={() => addDoc(fname)}>{KI.upload} Unggah</button>}
                  </div>
                );
              })}
            </div>
            <div style={kStyles.infoNote}><span style={{ color: "var(--atr-purple)", flexShrink: 0 }}>{KI.alert}</span><span>Format JPG / PNG / PDF, maksimal 5 MB per file. Minimal 1 dokumen.</span></div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={ps.formGrid}>
              <div style={kStyles.field}>
                <label style={ps.formLabel}>Bank <span style={ps.req}>*</span></label>
                <div style={ps.inputWrap}>
                  <select style={{ ...ps.input, appearance: "none" }} value={bankName} onChange={(e) => setBankName(e.target.value)}>
                    {["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga", "Permata"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                  <span style={ps.selectChevron}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                </div>
              </div>
              <div style={kStyles.field}>
                <label style={ps.formLabel}>Nomor rekening <span style={ps.req}>*</span></label>
                <input inputMode="numeric" placeholder="contoh: 1290800xxxx" style={ps.input} value={bankAcc} onChange={(e) => setBankAcc(e.target.value)} />
              </div>
            </div>
            <div style={kStyles.field}>
              <label style={ps.formLabel}>Nama pemilik rekening <span style={ps.req}>*</span></label>
              <input style={ps.input} value={bankHolder} onChange={(e) => setBankHolder(e.target.value)} />
            </div>

            {/* ringkasan */}
            <div style={kStyles.review}>
              <div style={kStyles.reviewTitle}>Ringkasan klaim</div>
              <div style={kStyles.reviewRow}><span>Jenis klaim</span><b>{t.label}</b></div>
              <div style={kStyles.reviewRow}><span>Tanggal kejadian</span><b>{incidentDate || "-"}</b></div>
              <div style={kStyles.reviewRow}><span>Estimasi nilai</span><b>{rpK(Number(amount))}</b></div>
              <div style={kStyles.reviewRow}><span>Dokumen</span><b>{docs.length} file</b></div>
              <div style={kStyles.reviewRow}><span>Pencairan ke</span><b>{bankName} · {bankAcc || "-"}</b></div>
            </div>
          </div>
        )}
      </div>

      {/* actions */}
      <div style={kStyles.formActions}>
        <button style={ps.btnGhost} onClick={() => (step === 1 ? onBack() : setStep(step - 1))}>{step === 1 ? "Batal" : "Kembali"}</button>
        {step < 4
          ? <button style={{ ...ps.btnPrimary, opacity: canNext ? 1 : 0.5, cursor: canNext ? "pointer" : "not-allowed" }} disabled={!canNext} onClick={() => canNext && setStep(step + 1)}>Lanjut</button>
          : <button style={{ ...ps.btnPrimary, opacity: canNext ? 1 : 0.5, cursor: canNext ? "pointer" : "not-allowed" }} disabled={!canNext} onClick={submit}>Ajukan Klaim</button>}
      </div>
    </div>
  );
}

function ClaimStatusView({ claimId, onBack, claimsStore, setClaimsStore }) {
  const findClaim = () => {
    for (const code in claimsStore) {
      const f = claimsStore[code].find((x) => x.id === claimId);
      if (f) return f;
    }
    return null;
  };

  const claim = findClaim();
  const [stage, setStage] = useState(claim ? claim.stage : 1);
  const [auto, setAuto] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!auto) return;
    timer.current = setInterval(() => {
      setStage((s) => {
        const next = Math.min(4, s + 1);
        if (claim) {
          claim.stage = next;
          if (next >= 3) claim.approved = claim.amount;
        }
        if (next >= 4) {
          clearInterval(timer.current);
          setAuto(false);
        }
        return next;
      });
    }, 1100);
    return () => clearInterval(timer.current);
  }, [auto, claim]);

  if (!claim) {
    return (
      <div style={ps.panel}>
        <div style={kStyles.detailHead} onClick={onBack}>{PI.back} Kembali</div>
        <div style={{ color: "var(--atr-text-muted)" }}>Klaim tidak ditemukan.</div>
      </div>
    );
  }

  const t = CLAIM_TYPES.find((ct) => ct.key === claim.typeKey) || CLAIM_TYPES[0];
  const done = stage >= 4;

  return (
    <div style={ps.panel}>
      <div style={kStyles.detailHead} onClick={onBack}>{PI.back} Kembali ke Detail Asuransi</div>

      {/* summary */}
      <div style={kStyles.summary}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <span style={kStyles.sumIcon}>{PI.shield}</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.01em" }}>{claim.id}</div>
            <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 2 }}>{t.label} · Polis {claim.insCode}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>{claimStatusBadge(stage)}</div>
        </div>
        <div style={kStyles.sumGrid}>
          <div><div style={kStyles.cellLabel}>Tertanggung</div><div style={kStyles.cellVal}>{claim.policyName}</div></div>
          <div><div style={kStyles.cellLabel}>Tanggal Pengajuan</div><div style={kStyles.cellVal}>{claim.filedDate}</div></div>
          <div><div style={kStyles.cellLabel}>Nilai Diajukan</div><div style={kStyles.cellVal}>{rpK(claim.amount)}</div></div>
          <div><div style={kStyles.cellLabel}>Disetujui</div><div style={{ ...kStyles.cellVal, color: stage >= 3 ? "var(--atr-arti)" : "var(--atr-text-muted)" }}>{stage >= 3 ? rpK(claim.approved || claim.amount) : "Menunggu"}</div></div>
        </div>
      </div>

      {/* timeline */}
      <div style={kStyles.polHead}>{KI.spark} Proses Klaim</div>
      <div style={kStyles.timeline}>
        {CLAIM_STAGES.map((st, i) => {
          const reached = stage >= st.n, active = stage === st.n;
          return (
            <div key={st.n} style={kStyles.tlRow}>
              <div style={kStyles.tlMarker}>
                <span style={{ ...kStyles.tlDot, ...(reached ? kStyles.tlDotOn : {}), ...(active && !done ? kStyles.tlDotActive : {}) }}>{reached ? PI.check : st.n}</span>
                {i < CLAIM_STAGES.length - 1 && <span style={{ ...kStyles.tlLine, background: stage > st.n ? "var(--atr-purple)" : "var(--atr-outline)" }} />}
              </div>
              <div style={{ paddingBottom: i < CLAIM_STAGES.length - 1 ? 26 : 0 }}>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: reached ? "var(--atr-text)" : "var(--atr-text-muted)" }}>{st.label}</div>
                <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 3, lineHeight: 1.45 }}>{st.desc}</div>
                {active && !done && <div style={kStyles.tlNow}>Sedang berlangsung…</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* pencairan card when done */}
      {done && (
        <div style={kStyles.payout}>
          <span style={{ color: "var(--atr-arti)", flexShrink: 0 }}>{KI.wallet}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--atr-text)" }}>Dana santunan telah dicairkan</div>
            <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 3 }}>{rpK(claim.approved || claim.amount)} ditransfer ke {claim.bankName} · {claim.bankAcc} a.n. {claim.bankHolder}.</div>
          </div>
          <b style={{ fontSize: 18, color: "var(--atr-arti)", whiteSpace: "nowrap" }}>{rpK(claim.approved || claim.amount)}</b>
        </div>
      )}

      {/* action */}
      <div style={kStyles.formActions}>
        <button style={ps.btnGhost} onClick={onBack}>Kembali</button>
        {!done
          ? <button style={ps.btnPrimary} onClick={() => setAuto(true)} disabled={auto}>{auto ? "Memproses…" : "Lanjutkan proses (simulasi)"}</button>
          : <button style={ps.btnGhost} onClick={onBack}>Selesai</button>}
      </div>
    </div>
  );
}

export default function InsurancePage() {
  const [viewState, setViewState] = useState("list"); // list, detail, claim-form, claim-status
  const [selectedInsCode, setSelectedInsCode] = useState("492JYGK1");
  const [selectedClaimId, setSelectedClaimId] = useState("");

  const [claimsStore, setClaimsStore] = useState({
    "492JYGK1": [
      {
        id: "KLM-20260520-882", insCode: "492JYGK1", typeKey: "delay", type: "Keterlambatan Penerbangan",
        policyName: "Aulia Priyono", incidentDate: "2026-05-10", filedDate: "20 Mei 2026",
        amount: 750000, approved: 750000, bankName: "BCA", bankAcc: "1290 8xxx xxxx 4499", bankHolder: "Aulia Priyono",
        desc: "Penerbangan GA-452 dari CGK delay 5 jam 20 menit, dialihkan ke penerbangan berikutnya.",
        docs: ["Boarding pass.pdf", "Surat keterangan delay.pdf", "Bukti pengeluaran makan.jpg"], stage: 4
      },
    ],
  });

  function handleOpenDetail(code) {
    setSelectedInsCode(code);
    setViewState("detail");
  }

  function handleOpenClaimForm(code) {
    setSelectedInsCode(code);
    setViewState("claim-form");
  }

  function handleOpenClaimStatus(id) {
    setSelectedClaimId(id);
    setViewState("claim-status");
  }

  function handleClaimSubmitted(code, newClaim) {
    setClaimsStore((prev) => ({
      ...prev,
      [code]: [newClaim, ...(prev[code] || [])],
    }));
    setSelectedClaimId(newClaim.id);
    setViewState("claim-status");
  }

  switch (viewState) {
    case "detail":
      return (
        <InsuranceDetailView
          code={selectedInsCode}
          onBack={() => setViewState("list")}
          onOpenKlaimForm={handleOpenClaimForm}
          onOpenKlaimStatus={handleOpenClaimStatus}
          claimsStore={claimsStore}
        />
      );
    case "claim-form":
      return (
        <ClaimFormView
          code={selectedInsCode}
          onBack={() => setViewState("detail")}
          onSubmitted={handleClaimSubmitted}
        />
      );
    case "claim-status":
      return (
        <ClaimStatusView
          claimId={selectedClaimId}
          onBack={() => setViewState("detail")}
          claimsStore={claimsStore}
          setClaimsStore={setClaimsStore}
        />
      );
    default:
      return <InsuranceListView onOpenDetail={handleOpenDetail} />;
  }
}
