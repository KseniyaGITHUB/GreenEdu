const raw = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export const basePath = raw;
export const authBasePath = raw ? `${raw}/api/auth` : "/api/auth";

/** Absolute path to a file in /public (respects Next.js basePath). */
export function publicPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${normalized}` : normalized;
}
