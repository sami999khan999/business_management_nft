"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiMemoPad } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { LuFactory } from "react-icons/lu";
import {
  MdDashboard,
  MdOutlineInventory,
  MdOutlinePayment,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { RiCustomerServiceFill, RiMenuUnfoldLine } from "react-icons/ri";

export const navitems = [
  { path: "/", name: "Dashboard", logo: <MdDashboard /> },
  {
    path: "/products",
    name: "Products",
    logo: <MdOutlineProductionQuantityLimits />,
  },
  { path: "/production", name: "Production", logo: <LuFactory /> },
  { path: "/inventory", name: "Inventory", logo: <MdOutlineInventory /> },
  { path: "/employees", name: "Employees", logo: <GrUserWorker /> },
  { path: "/customers", name: "Customers", logo: <RiCustomerServiceFill /> },
  { path: "/invoice", name: "Invoice", logo: <FaFileInvoice /> },
  { path: "/payment", name: "Payment", logo: <MdOutlinePayment /> },
  { path: "/memo", name: "Memo", logo: <CiMemoPad /> },
];

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <div className="flex xl:flex-col xl:rounded-none justify-around xl:justify-between h-full ">
      <div className="flex xl:flex-col justify-center xl:justify-start gap-2">
        {/* Sidebar Menu Icon */}
        <div className="hidden xl:block group mb-6">
          <div className="relative text-background px-6 h-[5.4rem] flex items-center mb-3 text-3xl gap-2 bg-primary">
            <RiMenuUnfoldLine className="transition-transform duration-300 group-hover:rotate-180 transform origin-center" />
            <p className="absolute top-[28px] left-[4.5rem] opacity-0 text-2xl font-semibold tracking-wide transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              NFT
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        {navitems.map((navItem, i) => (
          <Link
            key={i}
            href={navItem.path}
            className={`group flex items-center gap-2 px-1 xl:px-6 py-2  duration-300 text-primary-foreground ${
              pathName === navItem.path ||
              (pathName.startsWith(navItem.path) && navItem.path !== "/")
                ? "bg-primary text-secondary dark:hover:bg-secondary-foreground hover:bg-gray-200 hover:text-primary-foreground"
                : "dark:hover:bg-secondary-foreground hover:bg-gray-200"
            }`}
          >
            <div className={`text-xl xl:text-2xl  `}>{navItem.logo}</div>
            <p
              className={`hidden xl:block opacity-0 text-lg font-semibold tracking-wide transition-opacity duration-300 ease-in-out group-hover:opacity-100`}
            >
              {navItem.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
