const loaded = new Set<string>();
const inflight = new Map<string, Promise<void>>();

export function isAssetLoaded(src: string): boolean {
  return loaded.has(src);
}

export function preloadAsset(src: string): Promise<void> {
  if (loaded.has(src)) return Promise.resolve();

  const existing = inflight.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = "async";

    const finish = () => {
      loaded.add(src);
      inflight.delete(src);
      resolve();
    };

    img.onload = finish;
    img.onerror = finish;
    img.src = src;

    if (img.complete) finish();
  });

  inflight.set(src, promise);
  return promise;
}

export function preloadAssets(urls: readonly string[]): Promise<void> {
  return Promise.all(urls.map(preloadAsset)).then(() => undefined);
}

export function getLoadedCount(urls: readonly string[]): number {
  return urls.filter((url) => loaded.has(url)).length;
}
