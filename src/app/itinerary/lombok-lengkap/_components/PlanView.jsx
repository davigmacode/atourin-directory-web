"use client";

import React, { useState } from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import {
  CarIcon,
  PinIcon,
  InfoIcon,
  DollarIcon,
  ClockIcon,
  ArrowRightSm,
} from "./Shared";

const LBK_IMGS = {
  kuta: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=70",
  merese: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&auto=format&fit=crop&q=70",
  tanjungaan: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1000&auto=format&fit=crop&q=70",
  sade: "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1000&auto=format&fit=crop&q=70",
  ayam: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1000&auto=format&fit=crop&q=70",
  sasak: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1000&auto=format&fit=crop&q=70",
  mandalika: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1000&auto=format&fit=crop&q=70",
};

export const DAYS = [
  {
    id: 1,
    label: "Hari 1",
    date: "12 Jun",
    title: "Kedatangan & Kuta Mandalika",
  },
  {
    id: 2,
    label: "Hari 2",
    date: "13 Jun",
    title: "Bukit Merese & Tanjung Aan",
  },
  {
    id: 3,
    label: "Hari 3",
    date: "14 Jun",
    title: "Desa Sade & Pantai Selatan",
  },
  { id: 4, label: "Hari 4", date: "15 Jun", title: "Pulau Seribu & Check-out" },
];

export const ACTIVITIES_BY_DAY = {
  1: [
    {
      id: "a1-1",
      order: 1,
      time: "08:00",
      endTime: "10:00",
      duration: "2 jam",
      type: "transport",
      typeLabel: "Transportasi",
      title: "Penjemputan Bandara",
      location: "Bandara Internasional Lombok (LOP)",
      img: null,
      desc: "Penjemputan dari bandara menuju hotel di kawasan Kuta Mandalika.",
      tags: ["Airport Transfer", "AC"],
      tips: "Pastikan nomor penerbangan kamu sudah dikonfirmasi H-1.",
      cost: "Termasuk paket",
    },
    {
      id: "a1-2",
      order: 2,
      time: "10:30",
      endTime: "12:00",
      duration: "1.5 jam",
      type: "activity",
      typeLabel: "Aktivitas",
      title: "Check-in Hotel & Relaksasi",
      location: "Kuta Mandalika",
      img: null,
      desc: "Check-in hotel, istirahat sejenak, dan persiapan eksplorasi.",
      tags: ["Akomodasi", "Sarapan"],
      tips: "Manfaatkan welcome drink yang disediakan hotel.",
      cost: "Termasuk paket",
    },
    {
      id: "a1-3",
      order: 3,
      time: "14:00",
      endTime: "17:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Pantai Kuta Mandalika",
      location: "Pantai Kuta, Lombok Tengah",
      img: LBK_IMGS.kuta,
      desc: "Nikmati pasir putih dan ombak tenang di Pantai Kuta Mandalika. Cocok untuk berenang, bermain pasir, atau sekadar bersantai.",
      tags: ["Pantai", "Pasir Putih", "Spot Foto"],
      tips: "Bawa sunscreen dan topi karena cuaca bisa sangat terik.",
      cost: "Gratis",
    },
    {
      id: "a1-4",
      order: 4,
      time: "19:00",
      endTime: "21:00",
      duration: "2 jam",
      type: "meal",
      typeLabel: "Makan Malam",
      title: "Makan Malam Seafood",
      location: "Warung Seafood Kuta",
      img: null,
      desc: "Makan malam dengan hidangan seafood khas Lombok.",
      tags: ["Seafood", "Kuliner"],
      tips: "Coba sambal beberuk khas Lombok!",
      cost: "Termasuk paket",
    },
  ],
  2: [
    {
      id: "a2-1",
      order: 1,
      time: "06:30",
      endTime: "08:00",
      duration: "1.5 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Sunrise di Bukit Merese",
      location: "Bukit Merese, Lombok Tengah",
      img: LBK_IMGS.merese,
      desc: "Pendakian singkat ke Bukit Merese untuk menikmati sunrise spektakuler dengan panorama Samudra Hindia.",
      tags: ["Sunrise", "Bukit", "Spot Foto"],
      tips: "Bawa senter kecil — jalur pendakian masih gelap sebelum 06.00.",
      cost: "Gratis",
    },
    {
      id: "a2-2",
      order: 2,
      time: "09:00",
      endTime: "12:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Tanjung Aan",
      location: "Tanjung Aan, Lombok Tengah",
      img: LBK_IMGS.tanjungaan,
      desc: "Teluk dengan dua pasir putih yang unik: pasir seperti merica dan pasir seperti gula. Tempat sempurna untuk snorkeling.",
      tags: ["Teluk", "Snorkeling", "Pasir Unik"],
      tips: "Sewa snorkeling set di lokasi hanya Rp 50.000.",
      cost: "Rp 10.000",
    },
    {
      id: "a2-3",
      order: 3,
      time: "12:30",
      endTime: "13:30",
      duration: "1 jam",
      type: "meal",
      typeLabel: "Makan Siang",
      title: "Makan Siang di Pinggir Pantai",
      location: "Warung Makan Tanjung Aan",
      img: null,
      desc: "Makan siang dengan nasi campur dan ikan bakar segar.",
      tags: ["Ikan Bakar", "Kuliner"],
      tips: null,
      cost: "Termasuk paket",
    },
  ],
  3: [
    {
      id: "a3-1",
      order: 1,
      time: "08:00",
      endTime: "11:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Budaya",
      title: "Desa Sade — Kampung Tradisional Sasak",
      location: "Desa Sade, Pujut, Lombok Tengah",
      img: LBK_IMGS.sade,
      desc: "Kunjungi desa adat Suku Sasak yang masih mempertahankan arsitektur dan tradisi leluhur. Lihat proses menenun kain khas Lombok.",
      tags: ["Budaya", "Tradisional", "Tenun"],
      tips: "Jangan lupa mampir ke rumah tenun dan beli kain songket khas.",
      cost: "Rp 15.000",
    },
    {
      id: "a3-2",
      order: 2,
      time: "11:30",
      endTime: "13:00",
      duration: "1.5 jam",
      type: "meal",
      typeLabel: "Makan Siang",
      title: "Kuliner Khas Lombok",
      location: "Rumah Makan Sasak",
      img: LBK_IMGS.ayam,
      desc: "Mencicipi ayam taliwang dan plecing kangkung — dua ikon kuliner Lombok.",
      tags: ["Ayam Taliwang", "Kuliner"],
      tips: "Pilih level pedas yang sesuai; ayam taliwang asli cukup pedas.",
      cost: "Termasuk paket",
    },
    {
      id: "a3-3",
      order: 3,
      time: "14:00",
      endTime: "17:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Pantai Selatan Lombok",
      location: "Pantai Selong Belanak / Mawun",
      img: LBK_IMGS.sasak,
      desc: "Eksplorasi pantai selatan Lombok yang masih alami dengan ombak cocok untuk pemula surfing.",
      tags: ["Pantai", "Surfing", "Alami"],
      tips: "Cocok untuk belajar surfing — ombaknya bersahabat untuk pemula.",
      cost: "Gratis",
    },
  ],
  4: [
    {
      id: "a4-1",
      order: 1,
      time: "07:00",
      endTime: "10:00",
      duration: "3 jam",
      type: "activity",
      typeLabel: "Wisata",
      title: "Pulau Seribu (Gili)",
      location: "Gili Kedis / Gili Nanggu",
      img: LBK_IMGS.mandalika,
      desc: "Trip singkat ke gili-gili kecil di Lombok Barat. Snorkeling di perairan jernih dengan biota laut yang indah.",
      tags: ["Gili", "Snorkeling", "Laut"],
      tips: "Bawa roti untuk memberi makan ikan — pengalaman snorkeling lebih seru.",
      cost: "Rp 150.000",
    },
    {
      id: "a4-2",
      order: 2,
      time: "12:00",
      endTime: "14:00",
      duration: "2 jam",
      type: "meal",
      typeLabel: "Makan Siang",
      title: "Makan Siang & Check-out",
      location: "Hotel Kuta Mandalika",
      img: null,
      desc: "Makan siang terakhir di hotel, check-out, dan persiapan transfer ke bandara.",
      tags: ["Hotel", "Check-out"],
      tips: "Pastikan barang bawaan lengkap sebelum meninggalkan hotel.",
      cost: "Termasuk paket",
    },
    {
      id: "a4-3",
      order: 3,
      time: "14:30",
      endTime: null,
      duration: null,
      type: "transport",
      typeLabel: "Transportasi",
      title: "Transfer ke Bandara",
      location: "Bandara Internasional Lombok (LOP)",
      img: null,
      desc: "Antar-jemput ke bandara untuk penerbangan kembali.",
      tags: ["Airport Transfer"],
      tips: "Tiba di bandara minimal 2 jam sebelum jadwal terbang.",
      cost: "Termasuk paket",
    },
  ],
};

function computeDayStats(activities) {
  let totalCost = 0;
  const types = new Set();
  activities.forEach((a) => {
    types.add(a.type);
    const num = parseInt(a.cost?.replace(/[^0-9]/g, "") || "0", 10);
    totalCost += num;
  });
  return {
    activityCount: activities.length,
    totalCost,
    types: Array.from(types),
  };
}

function getTypeColor(type) {
  const map = {
    transport: { bg: "#EDE9FF", color: "#7068D5" },
    activity: { bg: "#E4F4E4", color: "#51B054" },
    meal: { bg: "#FFFBEE", color: "#C29B00" },
    wisata: { bg: "#E1F0FA", color: "#2C7FB8" },
    budaya: { bg: "#F3E8FF", color: "#8B5CF6" },
  };
  return (
    map[type] || { bg: "var(--atr-bg-soft)", color: "var(--atr-text-muted)" }
  );
}

function TransportLink({ activity }) {
  return (
    <div style={detailStyles.transportLink}>
      <div />
      <div style={detailStyles.transportConnector} />
      <div style={detailStyles.transportCard}>
        <CarIcon />
        <span>
          <div style={detailStyles.transportTitle}>{activity.title}</div>
          {activity.desc && (
            <div style={detailStyles.transportMeta}>{activity.desc}</div>
          )}
        </span>
        {activity.location && (
          <button
            style={detailStyles.viewMapLink}
            onClick={() =>
              alert(`Membuka peta rute ke: ${activity.location}`)
            }
          >
            <PinIcon /> Lihat Peta
          </button>
        )}
      </div>
    </div>
  );
}

function ActivityCard({ activity, index }) {
  const [showTip, setShowTip] = useState(false);
  const colors = getTypeColor(activity.type);
  return (
    <div
      style={{
        ...detailStyles.activityCard,
        ...(activity.type === "transport"
          ? detailStyles.activityCardCompact
          : {}),
      }}
    >
      {/* Time column */}
      <div style={detailStyles.timeCol}>
        <div style={detailStyles.timeNum}>{activity.time}</div>
        {activity.endTime && (
          <div style={detailStyles.timeEnd}>{activity.endTime}</div>
        )}
        {activity.duration && (
          <div style={detailStyles.timeDur}>{activity.duration}</div>
        )}
      </div>

      {/* Connector column */}
      <div style={detailStyles.connectorCol}>
        <div style={detailStyles.numBubble}>{index + 1}</div>
        <div style={detailStyles.connectorLine} />
      </div>

      {/* Body */}
      <div style={detailStyles.actBody}>
        <div style={detailStyles.actHeader}>
          {activity.img && (
            <img
              src={activity.img}
              alt={activity.title}
              style={detailStyles.actImg}
            />
          )}
          <div style={{ flex: 1 }}>
            <span
              style={{
                ...detailStyles.actTypeChip,
                background: colors.bg,
                color: colors.color,
              }}
            >
              {activity.typeLabel}
            </span>
            <div style={detailStyles.actTitle}>{activity.title}</div>
            {activity.location && (
              <div style={detailStyles.actLocation}>
                <PinIcon /> {activity.location}
              </div>
            )}
          </div>
        </div>

        {activity.desc && (
          <div style={detailStyles.actDesc}>{activity.desc}</div>
        )}

        {activity.tags && activity.tags.length > 0 && (
          <div style={detailStyles.actTagRow}>
            {activity.tags.map((tag, i) => (
              <span key={i} style={detailStyles.actTagSm}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div style={detailStyles.actMetaRow}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={detailStyles.actCost}>
              <DollarIcon />
              <span style={detailStyles.actCostLabel}>Biaya:</span>
              <span style={detailStyles.actCostVal}>{activity.cost}</span>
            </div>
            {activity.tips && (
              <button
                style={detailStyles.tipBtn}
                onClick={() => setShowTip(!showTip)}
              >
                <InfoIcon /> Tip
              </button>
            )}
          </div>
        </div>

        {showTip && activity.tips && (
          <div style={detailStyles.tipBox}>
            <span style={detailStyles.tipBoxIcon}>
              <InfoIcon />
            </span>
            <span>{activity.tips}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DayStat({ icon, label }) {
  return (
    <div style={detailStyles.dayStat}>
      <span style={detailStyles.dayStatIcon}>{icon}</span>
      <span style={detailStyles.dayStatLabel}>{label}</span>
    </div>
  );
}

function DaySelector({ days, activeDay, setActiveDay }) {
  return (
    <div style={detailStyles.daySelector}>
      <div style={detailStyles.daySelectorTitle}>Pilih Hari</div>
      <div style={detailStyles.dayChips}>
        {days.map((d) => {
          const isActive = d.id === activeDay;
          return (
            <button
              key={d.id}
              style={{
                ...detailStyles.dayChip,
                ...(isActive ? detailStyles.dayChipActive : {}),
              }}
              onClick={() => setActiveDay(d.id)}
            >
              <div
                style={{
                  ...detailStyles.dayChipNum,
                  background: isActive
                    ? "var(--atr-purple)"
                    : "var(--atr-purple-light)",
                  color: isActive ? "#fff" : "var(--atr-text-muted)",
                }}
              >
                {d.id}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={detailStyles.dayChipLabel}>{d.label}</div>
                <div style={detailStyles.dayChipDate}>{d.date}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PlanView() {
  const [activeDay, setActiveDay] = useState(1);
  const dayActivities = ACTIVITIES_BY_DAY[activeDay] || [];
  const stats = computeDayStats(dayActivities);
  const dayInfo = DAYS.find((d) => d.id === activeDay);

  return (
    <div style={detailStyles.planWrap}>
      <DaySelector
        days={DAYS}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />

      {/* Day Overview */}
      <div style={detailStyles.dayOverview}>
        <div>
          <div style={detailStyles.dayOverviewTop}>
            <span style={detailStyles.dayBadge}>HARI KE-{activeDay}</span>
            <span style={detailStyles.dayDate}>{dayInfo?.date || ""}</span>
          </div>
          <div style={detailStyles.dayTitle}>{dayInfo?.title || ""}</div>
        </div>
        <div style={detailStyles.dayStats}>
          <DayStat
            icon={<ClockIcon />}
            label={`${stats.activityCount} Aktivitas`}
          />
          <DayStat
            icon={<DollarIcon />}
            label={`Rp ${stats.totalCost.toLocaleString("id-ID")}`}
          />
        </div>
      </div>

      {/* Timeline */}
      <div style={detailStyles.timeline}>
        {dayActivities.map((activity, i) =>
          activity.type === "transport" ? (
            <TransportLink key={activity.id} activity={activity} />
          ) : (
            <ActivityCard key={activity.id} activity={activity} index={i} />
          ),
        )}
      </div>

      {/* End marker + next day */}
      <div style={detailStyles.afterTimeline}>
        {activeDay < DAYS.length ? (
          <button
            style={detailStyles.nextDayBtn}
            onClick={() => setActiveDay(activeDay + 1)}
          >
            Lanjut ke {DAYS.find((d) => d.id === activeDay + 1)?.label}{" "}
            <ArrowRightSm />
          </button>
        ) : (
          <div style={detailStyles.endMarker}>
            <div style={detailStyles.endDot} />
            Akhir Perjalanan — Selesai
          </div>
        )}
      </div>
    </div>
  );
}
