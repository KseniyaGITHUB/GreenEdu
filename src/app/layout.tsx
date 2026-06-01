import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/layout/header";
import { Providers } from "@/providers/provider";
import { siteConfig } from "@/config/site.config";
import { AuthSessionProvider } from "@/providers/session-provider";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
import { AssetPreloaderProvider } from "@/providers/asset-preloader";
import { ALL_SITE_ASSETS } from "@/config/site-assets";
import CookieBanner from "@/components/UI/cookie-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ru">
      <head>
        {ALL_SITE_ASSETS.map((href) => (
          <link key={href} rel="preload" as="image" href={href} />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AuthSessionProvider session={session}>
            <AssetPreloaderProvider>
            <AppLoader>
              <div className="flex flex-col max-md:min-h-dvh">
              <Header />
              <main className="w-full flex flex-col flex-1 md:flex-none min-h-0">{children}</main>
              <footer
                className="w-full py-2 text-center px-3 text-xs text-gray-600 leading-snug"
                style={{ background: "var(--footer-background)" }}
              >
                {siteConfig.description}
              </footer>
              </div>
            </AppLoader>
            <CookieBanner />
            </AssetPreloaderProvider>
          </AuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}
