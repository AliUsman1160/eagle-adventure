"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { IMG } from "@/data/images";

/** next/image with a graceful fallback so a broken remote image never breaks the layout. */
export default function SafeImage({ src, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      {...props}
      src={failed ? IMG.fallback : src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
