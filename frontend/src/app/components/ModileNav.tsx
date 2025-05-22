"use client";

import React from "react";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";

const ModileNav = () => {
  const pathname = usePathname();

  // Hide the sidebar on login or signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <div className="w-full h-[3rem] xl:hidden rounded shadow-2xl shadow-background xl:rounded-none fixed bottom-0 bg-secondary border-t border-border_color z-20">
      <NavLinks />
    </div>
  );
};

export default ModileNav;
