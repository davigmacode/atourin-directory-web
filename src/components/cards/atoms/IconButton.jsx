import React from "react";

/**
 * IconButton — save/bookmark toggle icon button.
 *
 * Props:
 *   saved   — boolean, toggles filled/outline state
 *   onClick — click handler (caller should stopPropagation if needed)
 *   style   — React style object (typically cs.atrSave or cs.atrSaveList)
 *   size    — icon size in px (default 14)
 */
export default function IconButton({ saved, onClick, style, size = 14 }) {
  return (
    <button onClick={onClick} style={style}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={saved ? "var(--atr-purple)" : "none"}
      >
        <path
          d="M6 3h12v18l-6-4-6 4V3z"
          stroke={saved ? "var(--atr-purple)" : "var(--atr-text)"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
