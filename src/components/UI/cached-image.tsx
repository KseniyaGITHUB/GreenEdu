"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { useAssetPreloader } from "@/providers/asset-preloader";

type CachedImageProps = Omit<ImageProps, "onLoad"> & {
  skeletonClassName?: string;
};

export default function CachedImage({
  skeletonClassName = "",
  className = "",
  alt,
  ...props
}: CachedImageProps) {
  const { waitFor, isReady } = useAssetPreloader();
  const src = typeof props.src === "string" ? props.src : "";
  const cached = !src || isReady(src);
  const [ready, setReady] = useState(cached);

  useEffect(() => {
    if (!src || isReady(src)) {
      setReady(true);
      return;
    }

    let cancelled = false;
    void waitFor(src).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [isReady, src, waitFor]);

  const showImage = cached || ready;

  return (
    <span className={`relative inline-block ${skeletonClassName}`}>
      {!showImage && (
        <span
          className="absolute inset-0 rounded-xl animate-pulse bg-green-100/80"
          aria-hidden
        />
      )}
      <Image
        {...props}
        alt={alt}
        className={`transition-opacity duration-200 ${
          showImage ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setReady(true)}
      />
    </span>
  );
}
