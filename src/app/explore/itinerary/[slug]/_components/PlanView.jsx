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
            onClick={() => alert(`Membuka rute ke: ${activity.location}`)}
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

export default function PlanView({ itinerary }) {
  const [activeDay, setActiveDay] = useState(1);

  const city = itinerary.destination?.name || itinerary.city || '';
  const isDbItinerary = Array.isArray(itinerary.days);

  const numDays = isDbItinerary ? itinerary.days.length : (parseInt(itinerary.days) || 1);
  const daysList = isDbItinerary
    ? itinerary.days.map((d) => ({
        id: d.dayNumber,
        label: d.title?.id || d.title?.en || `Hari ${d.dayNumber}`,
        date: `Day ${d.dayNumber}`,
        title: d.title?.id || d.title?.en || `Eksplorasi ${city} - Rute ${d.dayNumber}`,
      }))
    : Array.from({ length: numDays }).map((_, i) => ({
        id: i + 1,
        label: `Hari ${i + 1}`,
        date: `Day ${i + 1}`,
        title: `Eksplorasi ${city} - Rute ${i + 1}`,
      }));

  const day1Activities = itinerary.day1 || [];
  const getActivitiesForDay = (dayId) => {
    if (isDbItinerary) {
      const dayObj = itinerary.days.find((d) => d.dayNumber === dayId);
      if (!dayObj) return [];
      return (dayObj.timeline || []).map((event, idx) => {
        const durMin = event.durationMinutes;
        const durStr = durMin
          ? (durMin >= 60 ? `${Math.floor(durMin / 60)} jam${durMin % 60 ? ` ${durMin % 60} mnt` : ''}` : `${durMin} menit`)
          : null;

        const locationName = event.stop?.name?.id || event.stop?.name?.en || '';
        let type = event.stop?.type || 'wisata';
        if (type === 'food') type = 'meal';
        let typeLabel = type === 'meal' ? 'Makan' : type === 'transport' ? 'Transportasi' : 'Wisata';

        const title = event.title?.id || event.title?.en || '';
        const desc = event.description?.id || event.description?.en || '';

        return {
          id: event.id || `act-${dayId}-${idx}`,
          time: event.time,
          duration: durStr,
          type,
          typeLabel,
          title,
          location: locationName,
          desc,
          tags: event.includes || [],
          cost: event.travelInfo || 'Termasuk paket',
        };
      });
    }

    if (dayId === 1) {
      if (day1Activities.length === 0) {
        return [
          {
            id: `act-${dayId}-empty`,
            time: "09:00",
            duration: "2 jam",
            type: "wisata",
            typeLabel: "Wisata",
            title: `Eksplorasi ${city}`,
            location: city,
            desc: `Jelajahi objek-objek wisata terbaik di sekitar kota ${city}.`,
            tags: [itinerary.tag || "Wisata"],
            cost: "Gratis",
          },
        ];
      }
      return day1Activities.map((place, idx) => ({
        id: `act-${dayId}-${idx}`,
        time: idx === 0 ? "09:00" : idx === 1 ? "13:00" : "16:00",
        endTime: idx === 0 ? "11:30" : idx === 1 ? "15:00" : "18:00",
        duration: idx === 0 ? "2.5 jam" : idx === 1 ? "2 jam" : "2 jam",
        type: idx === 1 ? "meal" : "wisata",
        typeLabel: idx === 1 ? "Makan Siang" : "Wisata",
        title: place,
        location: `${place}, ${city}`,
        desc: `Kunjungan menarik ke ${place} untuk menikmati keindahan pariwisata lokal dan mengabadikan momen foto terbaik.`,
        tags: [itinerary.tag || "Wisata", "Populer"],
        cost: idx === 1 ? "Termasuk paket" : "Gratis",
        tips: `Disarankan berkunjung ke ${place} saat cuaca cerah. Bawa kamera.`,
      }));
    } else {
      return [
        {
          id: `act-${dayId}-1`,
          time: "08:30",
          endTime: "10:30",
          duration: "2 jam",
          type: "wisata",
          typeLabel: "Wisata",
          title: `Spot Menarik di ${city} (Hari ${dayId})`,
          location: `${city}`,
          desc: `Eksplorasi destinasi alam dan pemandangan indah di sekitar ${city}.`,
          tags: ["Alam", "Spot Foto"],
          cost: "Rp 15.000",
          tips: "Bawa topi dan air mineral ekstra.",
        },
        {
          id: `act-${dayId}-2`,
          time: "12:00",
          endTime: "13:30",
          duration: "1.5 jam",
          type: "meal",
          typeLabel: "Makan Siang",
          title: `Makan Siang Kuliner Khas`,
          location: `Resto Lokal ${city}`,
          desc: `Menikmati hidangan khas masakan tradisional setempat.`,
          tags: ["Kuliner", "Khas"],
          cost: "Termasuk paket",
        },
      ];
    }
  };

  const dayActivities = getActivitiesForDay(activeDay);
  const stats = computeDayStats(dayActivities);
  const dayInfo = daysList.find((d) => d.id === activeDay);

  return (
    <div style={detailStyles.planWrap}>
      <DaySelector
        days={daysList}
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
        {activeDay < daysList.length ? (
          <button
            style={detailStyles.nextDayBtn}
            onClick={() => setActiveDay(activeDay + 1)}
          >
            Lanjut ke {daysList.find((d) => d.id === activeDay + 1)?.label}{" "}
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
