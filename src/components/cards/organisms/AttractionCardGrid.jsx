"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import cs from "@/styles/card-styles";
import CardCover from "../molecules/CardCover";
import CardBody from "../molecules/CardBody";
import CardFooter from "../molecules/CardFooter";
import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";
import Rating from "../atoms/Rating";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * AttractionCardGrid — grid-format attraction card.
 *
 * Composes CardCover (image + category badge + save button),
 * CardBody (name, description, meta), and CardFooter (price + CTA).
 */
export function AttractionCardGrid({ a }) {
  const [save, setSave] = useState(false);
  const router = useRouter();
  const slug = a.slug || slugify(a.name);

  const badges = [
    {
      content: a.cat,
      style: {
        ...cs.atrCat,
        background:
          a.catBg || a.catColor || "var(--atr-bg-soft)",
        color: a.catFg || "var(--atr-text)",
      },
    },
  ];

  return (
    <article
      onClick={() => router.push(`/explore/attractions/${slug}`)}
      style={{
        ...cs.atrCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <CardCover src={a.img} alt="" badges={badges}>
        <IconButton
          saved={save}
          onClick={(e) => {
            e.stopPropagation();
            setSave(!save);
          }}
          style={cs.atrSave}
        />
      </CardCover>
      <CardBody
        name={a.name}
        desc={a.desc || a.description || ""}
        meta={
          <>
            <Rating rating={a.rating} reviews={a.reviews} />
            <span style={cs.atrLoc}>
              📍 {a.kecamatan || a.region || a.location}
            </span>
          </>
        }
      >
        <CardFooter
          price={a.price}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/explore/attractions/${slug}`);
          }}
        />
      </CardBody>
    </article>
  );
}
