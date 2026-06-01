"use client";

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";

const Title = () => {
  const pathname = usePathname();

  const currentNavItem = siteConfig.navItems.find(
    (item) => item.href === pathname
  );

  const pageTitle = currentNavItem ? currentNavItem.label : siteConfig.title;

  return (
    <div className="w-full flex justify-center pt-3 px-6" style={{ background: 'var(--home-background)' }}>
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
    </div>
  );
};

export default Title;
