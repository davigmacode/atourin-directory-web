"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

export default function AtrGallery({ attraction }) {
  const images = attraction.images || [
    attraction.img,
    attraction.img,
    attraction.img,
    attraction.img,
    attraction.img,
  ].filter(Boolean);
  const total = attraction.totalPhotos || images.length;

  return (
    <div style={ds.galleryRow}>
      <div style={ds.galleryMain}>
        <img src={images[0]} alt="" style={ds.galleryMainImg} />
      </div>
      <div style={ds.galleryThumbCol}>
        <div style={ds.galleryThumbRow}>
          <div style={ds.galleryThumb}>
            <img src={images[1]} alt="" style={ds.galleryThumbImg} />
          </div>
          <div style={ds.galleryThumb}>
            <img src={images[2]} alt="" style={ds.galleryThumbImg} />
          </div>
        </div>
        <div style={ds.galleryThumbRow}>
          <div style={ds.galleryThumb}>
            <img src={images[3]} alt="" style={ds.galleryThumbImg} />
          </div>
          <div style={ds.galleryThumb}>
            <img src={images[4]} alt="" style={ds.galleryThumbImg} />
            {total > 5 && (
              <button style={ds.galleryMore}>
                <span style={ds.galleryMoreNum}>+{total - 5}</span>
                <span style={ds.galleryMoreLabel}>Lihat semua</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
