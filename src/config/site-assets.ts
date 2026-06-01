import { publicPath } from "./base-path";

/** Критичные для первого экрана (главная). */
export const CRITICAL_ASSETS = [
  publicPath("/greenLogo.webp"),
  publicPath("/hero-eco.webp")
] as const;

/** Фоны и иконки курсов — подгружаем сразу после старта. */
export const SECONDARY_ASSETS = [
  publicPath("/courses-bg.webp"),
  publicPath("/course-bg.webp"),
  publicPath("/course-icons/icon1.webp"),
  publicPath("/course-icons/icon2.webp"),
  publicPath("/course-icons/icon3.webp"),
  publicPath("/course-icons/icon4.webp")
] as const;

export const ALL_SITE_ASSETS = [
  ...CRITICAL_ASSETS,
  ...SECONDARY_ASSETS
] as const;

export type SiteAssetUrl = (typeof ALL_SITE_ASSETS)[number];
