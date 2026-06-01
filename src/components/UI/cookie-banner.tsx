"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
  getCookieConsent,
  setCookieConsent,
  type CookieConsent
} from "@/utils/cookies";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  const dismiss = (value: CookieConsent) => {
    setCookieConsent(value);
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 320);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className={`fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 md:pb-5 pointer-events-none transition-all duration-300 ${
        leaving ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div
        className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-green-900/10 bg-white/95 backdrop-blur-md shadow-2xl shadow-green-900/10 p-4 md:p-5"
        style={{ background: "color-mix(in srgb, #fff0d1 88%, white)" }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600/10 text-xl"
              aria-hidden
            >
              🍪
            </span>

            <div className="space-y-1.5 min-w-0">
              <p
                id="cookie-banner-title"
                className="text-green-900 font-bold text-sm md:text-base"
              >
                Мы используем cookie
              </p>
              <p
                id="cookie-banner-desc"
                className="text-gray-700 text-xs md:text-sm leading-relaxed"
              >
                Файлы cookie помогают сайту работать корректно: сохранять вход в
                аккаунт и запоминать ваши настройки. Продолжая пользоваться
                платформой, вы соглашаетесь с{" "}
                <Link
                  href="/about#cookies"
                  className="text-green-700 font-medium underline underline-offset-2 hover:text-green-600"
                >
                  политикой cookie
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0 md:min-w-[220px]">
            <Button
              className="bg-green-600 text-white font-semibold hover:bg-green-500"
              onPress={() => dismiss("accepted")}
            >
              Принять
            </Button>
            <Button
              variant="bordered"
              className="border-green-700/30 text-green-800 font-medium"
              onPress={() => dismiss("declined")}
            >
              Только необходимые
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
