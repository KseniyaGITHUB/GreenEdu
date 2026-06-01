"use client";

import { useEffect, useState } from "react";
import { useAssetPreloader } from "@/providers/asset-preloader";

interface PreloadedBackgroundProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function PreloadedBackground({
  src,
  className = "",
  style,
  children
}: PreloadedBackgroundProps) {
  const { waitFor, isReady } = useAssetPreloader();
  const [ready, setReady] = useState(isReady(src));

  useEffect(() => {
    if (isReady(src)) {
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

  return (
    <section
      className={`relative ${className}`}
      style={{
        ...style,
        backgroundColor: "var(--home-background)",
        backgroundImage: ready ? `url("${src}")` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.3s ease"
      }}
    >
      {!ready && (
        <div
          className="absolute inset-0 animate-pulse pointer-events-none"
          style={{ background: "var(--home-background)" }}
          aria-hidden
        />
      )}
      <div className="relative">{children}</div>
    </section>
  );
}
