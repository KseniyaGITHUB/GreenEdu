"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { publicPath } from "@/config/base-path";
import { useAuthStore } from "@/store/auth.store";
import AuthModal from "@/components/UI/modals/auth.modal";
import HomeSplash from "@/components/UI/home-splash";
import CachedImage from "@/components/UI/cached-image";

const ctaClassName = `
  bg-[#FDC969]
  text-gray-900
  text-lg md:text-xl
  font-bold
  px-8
  py-3
  rounded-full
  shadow-lg
  hover:shadow-xl
  hover:-translate-y-[1px]
  transition-all
  duration-200
  w-full
  md:w-fit
  md:w-70
  h-14
  max-md:h-[3.35rem]
  max-md:text-xl
`;

export default function Home() {
  const { isAuth } = useAuthStore();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleGoToCourses = () => {
    if (!isAuth) setIsAuthOpen(true);
  };

  const CtaButton = () =>
    isAuth ? (
      <Link href="/ingredients" className="block w-full">
        <Button className={ctaClassName}>Перейти к курсам</Button>
      </Link>
    ) : (
      <Button onPress={handleGoToCourses} className={ctaClassName}>
        Начнем учиться!
      </Button>
    );

  return (
    <>
      <HomeSplash />
      <section
        className="w-full overflow-hidden flex max-md:flex-1 md:flex-none flex-col"
        style={{ background: "var(--home-background)" }}
      >
        {/* Мобильная версия */}
        <div className="md:hidden flex flex-col justify-between flex-1 min-h-0 px-4 py-5 gap-3">
          <div className="text-center space-y-2 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700/80">
              Экологическое образование онлайн
            </p>
            <h1 className="text-[clamp(1.55rem,6.5vw,2rem)] font-bold text-green-700 leading-tight px-1">
              Сохраняй планету с помощью знаний!
            </h1>
            <p className="text-[clamp(0.95rem,4vw,1.05rem)] text-gray-600 leading-snug px-1">
              Учитесь экологичной жизни в удобном формате — от энергии до
              переработки отходов.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center w-full min-h-0 py-1">
            <div className="w-full flex flex-col gap-0">
              <div className="hero-mobile-photo-wrap w-full overflow-hidden">
                <CachedImage
                  src={publicPath("/hero-eco.webp")}
                  alt=""
                  width={700}
                  height={800}
                  unoptimized
                  priority
                  skeletonClassName="block w-full"
                  className="hero-mobile-photo w-full h-auto"
                />
              </div>
              <div className="hero-mobile-cta w-full">
                <CtaButton />
              </div>
            </div>
          </div>

          <p className="shrink-0 text-[clamp(0.95rem,4vw,1.05rem)] leading-relaxed text-gray-700 text-center pb-1">
            Онлайн-платформа, где собраны практические знания и инструменты,
            чтобы легко учиться и внедрять{" "}
            <strong className="text-green-800">принципы экологичной жизни.</strong>
          </p>
        </div>

        {/* Десктоп — как в оригинале */}
        <div
          className="
            hidden md:grid
            max-w-[1200px]
            mx-auto
            pl-6
            max-h-[100vh]
            grid-cols-[35%_65%]
            gap-18
            items-center
          "
        >
          <div className="flex flex-col gap-6 pl-5 pr-3 pb-40">
            <h1 className="text-4xl font-bold text-green-700">
              Сохраняй планету с помощью знаний!
            </h1>
            <CtaButton />
            <p className="text-lg text-gray-700 max-w-xl">
              Онлайн-платформа, где собраны практические знания и инструменты,
              чтобы легко учиться и внедрять{" "}
              <strong>принципы экологичной жизни.</strong>
            </p>
          </div>

          <div className="flex justify-end w-full">
            <CachedImage
              src={publicPath("/hero-eco.webp")}
              alt="Экологическое образование"
              width={700}
              height={800}
              unoptimized
              priority
              skeletonClassName="block"
              className="w-[500px] md:w-[650px] lg:w-[750px] h-auto"
            />
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
