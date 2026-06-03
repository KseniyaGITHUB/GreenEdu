"use client";

import { layoutConfig } from "@/config/layout.config";
import { siteConfig } from "@/config/site.config";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from "@heroui/react";
import CachedImage from "@/components/UI/cached-image";
import Link from "next/link";
import { publicPath } from "@/config/base-path";
import { usePathname } from "next/navigation";
import RegistrationModal from "../modals/registration.modal";
import LoginModal from "../modals/login.modal";
import AuthModal from "../modals/auth.modal";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useAuthStore } from "@/store/auth.store";

export const Logo = () => (
  <CachedImage
    src={publicPath("/greenLogo.webp")}
    alt={siteConfig.title}
    width={60}
    height={60}
    unoptimized
    priority
    skeletonClassName="block rounded-lg"
    className="rounded-lg"
  />
);

const AboutIcon = ({ active }: { active?: boolean }) => (
  <svg
    className={`w-5 h-5 ${active ? "text-green-700" : "text-green-800"}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const { isAuth, session, status, setAuthState } = useAuthStore();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.error("error", error);
    }
    setAuthState("unauthenticated", null);
  };

  const getNavItems = () =>
    siteConfig.navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className={`px-3 py-1 
              ${isActive ? "text-green-700" : "text-foreground"} 
              hover:text-green-500 
              hover:border
              hover:border-green-500 
              hover:rounded-md
              transition-colors
              transition-border
              duration-200`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        );
      });

  return (
    <>
      <Navbar
        maxWidth="full"
        style={{
          height: layoutConfig.headerHeight,
          background: "var(--footer-background)"
        }}
        classNames={{
          base: "border-none shadow-none w-full max-w-none bg-[var(--footer-background)]",
          wrapper: "w-full max-w-none px-4 sm:px-6 lg:px-8 bg-[var(--footer-background)]"
        }}
      >
        <NavbarBrand>
          <Link href="/" className="flex gap-1">
            <Logo />
            <p className="font-bold text-inherit w-32 whitespace-normal break-words">
              {siteConfig.title}
            </p>
          </Link>
        </NavbarBrand>

        {/* Десктоп — как было */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {getNavItems()}
        </NavbarContent>

        <NavbarContent justify="end">
          {/* Десктоп */}
          <div className="hidden sm:flex items-center gap-2">
            {isAuth && <p>Привет, {session?.user?.email}!</p>}
            {status === "loading" ? (
              <p>Загрузка...</p>
            ) : !isAuth ? (
              <>
                <NavbarItem>
                  <Button
                    as={Link}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
                    href="#"
                    variant="flat"
                    onPress={() => setIsLoginOpen(true)}
                  >
                    Логин
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    className="bg-gray-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
                    href="#"
                    variant="flat"
                    onPress={() => setIsRegistrationOpen(true)}
                  >
                    Регистрация
                  </Button>
                </NavbarItem>
              </>
            ) : (
              <NavbarItem>
                <Button
                  as={Link}
                  color="primary"
                  href="#"
                  variant="flat"
                  onPress={handleSignOut}
                >
                  Выйти
                </Button>
              </NavbarItem>
            )}
          </div>

          {/* Мобильный — иконка «О нас» + «Вход» */}
          <div className="flex sm:hidden items-center gap-3">
            <Link
              href="/about"
              aria-label="О нас"
              className={`p-1 transition-colors ${
                pathname === "/about"
                  ? "text-green-700"
                  : "text-green-800 hover:text-green-600"
              }`}
            >
              <AboutIcon active={pathname === "/about"} />
            </Link>

            {status === "loading" ? (
              <span className="text-xs text-gray-500 px-2">...</span>
            ) : isAuth ? (
              <Button
                size="sm"
                className="bg-green-600 text-white font-semibold min-w-[4.5rem]"
                variant="flat"
                onPress={handleSignOut}
              >
                Выйти
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-green-600 text-white font-semibold min-w-[4.5rem]"
                variant="flat"
                onPress={() => setIsAuthOpen(true)}
              >
                Вход
              </Button>
            )}
          </div>
        </NavbarContent>
      </Navbar>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
