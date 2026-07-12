import React from "react";

export const GREETINGS = [
  { word: "Salama Engka", from: "Bugis" },
  { word: "Sugeng Rawuh", from: "Jawa" },
  { word: "Wilujeng Sumping", from: "Sunda" },
  { word: "Horas", from: "Batak" },
  { word: "Om Swastiastu", from: "Bali" },
  { word: "Yahowu", from: "Nias" },
  { word: "Mejuah-juah", from: "Karo" },
  { word: "Tabik Pun", from: "Lampung" },
];

export const AB_I = {
  spark: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12 4.5 10 10 8.5 12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  link: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 15l6-6M10 6l1-1a4 4 0 016 6l-1 1M14 18l-1 1a4 4 0 01-6-6l1-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  hands: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 11l3-3 4 4 3-3M3 13l4 4a3 3 0 004 0M21 11l-4 4a3 3 0 01-4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  leaf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 15c2-3 5-5 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  tree: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l5 7h-3l3 5H7l3-5H7l5-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 15v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  village: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M3 21V11l5-4 5 4M13 21V8l4-3 4 3v13M3 21h18M7 14v3M17 12v3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  users: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.5 20c0-3.4 2.9-6 6.5-6s6.5 2.6 6.5 6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 5.2A3.4 3.4 0 0118 11M17 14.2c2.3.5 4 2.4 4 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  globe: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  award: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 14l-1.5 7L12 18l4.5 3L15 14" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
};

export const VALUES = [
  { t: "Elevate Tourism", d: "Mengangkat standar pelayanan, kreativitas, dan kualitas pengalaman wisata Indonesia.", c: "#7068D5", icon: "spark" },
  { t: "Connect Tech-Tourism", d: "Menjembatani sektor pariwisata dengan teknologi yang tepat guna & mudah dipakai.", c: "#F46263", icon: "link" },
  { t: "Empower Communities", d: "Memberdayakan masyarakat, desa wisata, dan UMKM lokal lewat pariwisata.", c: "#2F8A5B", icon: "hands" },
  { t: "Regenerative Actions", d: "Mendorong pariwisata berkelanjutan yang ramah lingkungan & berdampak nyata.", c: "#E07B3A", icon: "leaf" },
];

export const IMPACT = [
  { icon: "tree", v: "120.000+", l: "Pohon ditanam lewat ARTI", c: "#2F8A5B" },
  { icon: "village", v: "350+", l: "Desa wisata diberdayakan", c: "#7068D5" },
  { icon: "users", v: "1.200+", l: "Pemandu lokal bersertifikat", c: "#E07B3A" },
  { icon: "globe", v: "180+", l: "Kota & kabupaten terjangkau", c: "#2F6FA5" },
];

export const TIMELINE = [
  ["2019", "Atourin lahir", "Memulai misi digitalisasi pariwisata lokal."],
  ["2021", "100+ desa wisata", "Jaringan mitra desa wisata tersebar di Nusantara."],
  ["2023", "Luncurkan ARTI", "Program tanam pohon di tiap pemesanan."],
  ["2024", "Best Hidden Gem App", "Diakui sebagai aplikasi wisata terbaik."],
  ["2026", "1.200+ pemandu", "Ekosistem pemandu lokal bersertifikat."],
];

export const RECOGNITION = [
  ["NextDev, Local Track", "2020"],
  ["Best Hidden Gem App Indonesia", "2024"],
  ["1000 Startup Digital", "2019"],
  ["BAKTI Kominfo, Digitalisasi Desa", "2022"],
  ["Tourism Week Startup", "2021"],
  ["Wonderful Startup Academy", "2021"],
  ["Juara Bisnis Kemenparekraf", "2023"],
  ["Penerima Pendanaan Inkubasi", "2022"],
];

export const TEAM = [
  { n: "Benarivo Triadi Putra", r: "Chief Executive Officer", lead: true, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=70" },
  { n: "Reza Permadi", r: "Chief Operating Officer", lead: true, img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&q=70" },
  { n: "Yuyud", r: "Chief Commercial Officer", lead: true, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=70" },
  { n: "Leonardo", r: "Partnership", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&q=70" },
  { n: "Khalda Kamiliya", r: "Creative Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=70" },
  { n: "Putri Nur", r: "Digital Marketing", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=70" },
  { n: "Satrio W.", r: "Frontend Engineer", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=70" },
];
