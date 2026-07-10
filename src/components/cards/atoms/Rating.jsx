import React from "react";
import cs from "@/styles/card-styles";

/**
 * Rating — star rating with optional reviews count.
 *
 * Props:
 *   rating      — number, e.g. 4.5
 *   reviews     — number, review count
 *   showReviews — boolean, hide reviews count when false (default true)
 *   style       — React style object
 */
export default function Rating({ rating, reviews, showReviews = true, style }) {
  return (
    <span style={{ ...cs.atrRating, ...style }}>
      ★ <strong>{rating}</strong>
      {showReviews && reviews > 0 && (
        <span style={cs.atrReviews}> ({reviews})</span>
      )}
    </span>
  );
}
