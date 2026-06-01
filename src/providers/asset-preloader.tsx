"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  ALL_SITE_ASSETS,
  CRITICAL_ASSETS,
  SECONDARY_ASSETS
} from "@/config/site-assets";
import {
  getLoadedCount,
  isAssetLoaded,
  preloadAsset,
  preloadAssets
} from "@/utils/asset-cache";

type AssetPreloaderContextValue = {
  progress: number;
  heroReady: boolean;
  allReady: boolean;
  waitFor: (src: string) => Promise<void>;
  isReady: (src: string) => boolean;
};

const AssetPreloaderContext = createContext<AssetPreloaderContextValue | null>(
  null
);

export function AssetPreloaderProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const tick = () => {
      if (!cancelled) setLoadedCount(getLoadedCount(ALL_SITE_ASSETS));
    };

    const interval = window.setInterval(tick, 100);

    void preloadAssets(CRITICAL_ASSETS).then(() => {
      if (!cancelled) setHeroReady(true);
    });

    void preloadAssets(SECONDARY_ASSETS).then(() => {
      if (!cancelled) setAllReady(true);
      tick();
    });

    void preloadAssets(ALL_SITE_ASSETS).then(() => {
      if (!cancelled) {
        setAllReady(true);
        setLoadedCount(ALL_SITE_ASSETS.length);
      }
    });

    tick();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const waitFor = useCallback((src: string) => preloadAsset(src), []);

  const isReady = useCallback((src: string) => isAssetLoaded(src), []);

  const value = useMemo(
    () => ({
      progress: Math.round((loadedCount / ALL_SITE_ASSETS.length) * 100),
      heroReady,
      allReady,
      waitFor,
      isReady
    }),
    [allReady, heroReady, isReady, loadedCount, waitFor]
  );

  return (
    <AssetPreloaderContext.Provider value={value}>
      {children}
    </AssetPreloaderContext.Provider>
  );
}

export function useAssetPreloader() {
  const ctx = useContext(AssetPreloaderContext);
  if (!ctx) {
    throw new Error("useAssetPreloader must be used within AssetPreloaderProvider");
  }
  return ctx;
}
