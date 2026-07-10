import React from "react";
import cs from "@/styles/card-styles";

/**
 * CreatorInfo — creator avatar + name + role for itinerary cards.
 *
 * Props:
 *   avatar — image URL for the avatar
 *   name   — creator display name
 *   role   — creator role label
 */
export default function CreatorInfo({ avatar, name, role }) {
  if (!name) return null;

  return (
    <div style={cs.itinCreator}>
      {avatar && <img src={avatar} alt="" style={cs.itinCreatorAv} />}
      <div>
        <div style={cs.itinCreatorName}>{name}</div>
        {role && <div style={cs.itinCreatorRole}>{role}</div>}
      </div>
    </div>
  );
}
