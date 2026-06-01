import { basePath } from "@/config/base-path";

export const COOKIE_CONSENT_NAME = "eco-cookie-consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export type CookieConsent = "accepted" | "declined";

function cookiePath(): string {
  return basePath || "/";
}

export function getCookieConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_CONSENT_NAME}=([^;]*)`)
  );

  const value = match?.[1];
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function setCookieConsent(value: CookieConsent): void {
  if (typeof document === "undefined") return;

  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = [
    `${COOKIE_CONSENT_NAME}=${value}`,
    `path=${cookiePath()}`,
    `max-age=${COOKIE_CONSENT_MAX_AGE}`,
    "SameSite=Lax",
    secure
  ].join("; ");
}

export function hasCookieConsent(): boolean {
  return getCookieConsent() !== null;
}
