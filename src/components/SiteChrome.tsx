"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Assistance from "@/components/Assistance";
import Bot from "@/components/Bot";
import Footer2 from "@/components/Footer2";
import Navbar2 from "@/components/Navbar2";
import Process from "@/components/Process";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <Navbar2 />
      </Suspense>
      <main>{children}</main>
      <Process />
      <Assistance />
      <Footer2 />
      <Bot />
    </>
  );
}
