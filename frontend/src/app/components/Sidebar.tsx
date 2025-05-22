"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NavLinks from "./NavLinks";

const Sidebar = () => {
  const pathname = usePathname();

  // Hide the sidebar on login or signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <aside className="hidden xl:block h-full bg-secondary group w-20 hover:w-48 transition-all duration-300 ease-in-out border-r border-border_color">
      <NavLinks />
    </aside>
  );
};

export default Sidebar;
