'use client';

import React, { useState } from 'react';

const PZ_QUIZ = [
  { q: 'Tipe wisata favoritmu?', sub: 'Pilih 1–3', multi: true, opts: ['Alam & Petualangan', 'Budaya & Sejarah', 'Kuliner & Lifestyle', 'Religi & Ziarah', 'Pantai & Bahari', 'Desa & Pedesaan'] },
  { q: 'Budget tipikal per trip?', multi: false, opts: ['< Rp 500rb', 'Rp 500rb–2jt', 'Rp 2jt–5jt', '> Rp 5jt'] },
  { q: 'Biasanya traveling sama siapa?', multi: false, opts: ['Solo', 'Berdua', 'Keluarga dengan anak', 'Grup teman', 'Komunitas'] },
  { q: 'Wilayah yang ingin dijelajahi?', sub: 'Pilih hingga 3', multi: true, opts: ['Sumatra', 'Jawa', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'] },
  { q: 'Seberapa sering traveling domestik?', multi: false, opts: ['< 1× setahun', '1–2×', '3–4×', 'Lebih dari 4×'] },
];

export default function PrefQuizModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const cur = PZ_QUIZ[step];
  const picked = ans[step] || [];
  const last = step === PZ_QUIZ.length - 1;
  function toggle(o) {
    setAns((a) => {
      const list = a[step] || [];
      if (cur.multi) return { ...a, [step]: list.includes(o) ? list.filter((x) => x !== o) : (list.length < 3 ? [...list, o] : list) };
      return { ...a, [step]: [o] };
    });
  }
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20,18,40,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, background: '#fff', borderRadius: 20, overflow: 'hidden', fontFamily: 'var(--atr-font-sans)' }}>
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--atr-purple)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Kenali Preferensimu</span>
            <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: 22, color: 'var(--atr-text-muted)', cursor: 'pointer', lineHeight: 1 }}>{'\u00D7'}</button>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: 'var(--atr-outline)', overflow: 'hidden', marginTop: 12 }}><div style={{ width: `${((step + 1) / PZ_QUIZ.length) * 100}%`, height: '100%', background: 'var(--atr-purple)', transition: 'width .25s' }} /></div>
          <div style={{ fontSize: 11.5, color: 'var(--atr-text-muted)', marginTop: 8 }}>Langkah {step + 1} dari {PZ_QUIZ.length}</div>
        </div>
        <div style={{ padding: '16px 24px 4px' }}>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em' }}>{cur.q}</div>
          {cur.sub && <div style={{ fontSize: 13, color: 'var(--atr-text-muted)', marginTop: 5 }}>{cur.sub}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
            {cur.opts.map((o) => {
              const on = picked.includes(o);
              return (
                <button key={o} onClick={() => toggle(o)} style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', border: `1.5px solid ${on ? 'var(--atr-purple)' : 'var(--atr-outline)'}`, background: on ? 'var(--atr-purple-50)' : '#fff', borderRadius: 12, padding: '13px 14px', cursor: 'pointer', fontFamily: 'var(--atr-font-sans)' }}>
                  <span style={{ width: 20, height: 20, borderRadius: cur.multi ? 5 : 999, border: `2px solid ${on ? 'var(--atr-purple)' : 'var(--atr-outline)'}`, background: on ? 'var(--atr-purple)' : '#fff', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>{on && '\u2713'}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--atr-text)' }}>{o}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, padding: '18px 24px 24px' }}>
          <button onClick={() => (step ? setStep(step - 1) : onClose())} style={{ flex: 1, height: 48, border: '1px solid var(--atr-outline)', background: '#fff', color: 'var(--atr-text)', borderRadius: 12, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--atr-font-sans)' }}>{step ? 'Kembali' : 'Lewati'}</button>
          <button disabled={!picked.length} onClick={() => (last ? onClose() : setStep(step + 1))} style={{ flex: 1.4, height: 48, border: 'none', background: 'var(--atr-purple)', color: '#fff', borderRadius: 12, fontSize: 14.5, fontWeight: 700, cursor: picked.length ? 'pointer' : 'not-allowed', opacity: picked.length ? 1 : 0.45, fontFamily: 'var(--atr-font-sans)' }}>{last ? 'Simpan & lihat rekomendasi' : 'Lanjut'}</button>
        </div>
      </div>
    </div>
  );
}
