"use client";

import React from "react";
import tc from "../tab-card-styles";

/**
 * CardCreatorInfo — avatar + name + role, used by itinerary cards.
 */
export default function CardCreatorInfo({ src, name, role }) {
  return (
    <div style={tc.itinCreator}>
      <img src={src} alt="" style={tc.itinCreatorAv} />
      <div>
        <div style={tc.itinCreatorName}>{name}</div>
        <div style={tc.itinCreatorRole}>{role}</div>
      </div>
    </div>
  );
}
