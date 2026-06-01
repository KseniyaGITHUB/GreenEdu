"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { publicPath } from "@/config/base-path";
import { useAssetPreloader } from "@/providers/asset-preloader";

const SPLASH_KEY = "eco-splash-seen";

export default function HomeSplash() {
  const { allReady, heroReady, progress } = useAssetPreloader();
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SPLASH_KEY) === "1") return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || !allReady) return;

    sessionStorage.setItem(SPLASH_KEY, "1");
    setFadeOut(true);
    const timer = window.setTimeout(() => setVisible(false), 500);
    return () => window.clearTimeout(timer);
  }, [allReady, visible]);

  if (!visible) return null;

  const statusText = allReady
    ? "Готово!"
    : heroReady
      ? "Загружаем материалы курсов…"
      : "Подготавливаем главную…";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "var(--home-background)" }}
      aria-live="polite"
      aria-busy={!allReady}
    >
      <div className="flex flex-col items-center gap-7 w-full max-w-sm">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl scale-150 animate-pulse" />
          <Image
            src={publicPath("/greenLogo.webp")}
            alt=""
            width={80}
            height={80}
            priority
            className="relative drop-shadow-md"
          />
        </div>

        <div className="text-center space-y-1.5">
          <p className="text-green-800 font-bold text-xl tracking-tight">
            Зеленое образование
          </p>
          <p className="text-green-700/75 text-sm min-h-[1.25rem]">{statusText}</p>
        </div>

        <div className="w-full space-y-2">
          <div className="w-full h-2.5 rounded-full bg-white/80 overflow-hidden shadow-inner ring-1 ring-green-900/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${Math.max(progress, allReady ? 100 : 6)}%` }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
          <p className="text-center text-xs font-medium text-green-800/60 tabular-nums">
            {allReady ? 100 : progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
