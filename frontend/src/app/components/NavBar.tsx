"use client";

import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";

const NavBar = () => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  // const logOutHandler = () => {
  //   const cookieName = "userSession";
  //   document.cookie = `${cookieName}=; Max-Age=0; path=/`;

  //   const cookieDeleted = !document.cookie
  //     .split("; ")
  //     .find((cookie) => cookie.startsWith(`${cookieName}=`));

  //   if (cookieDeleted) {
  //     path.push("/login");
  //   }
  // };

  return (
    <div className="flex items-center justify-between w-full bg-secondary h-[5.4rem] xl:px-10 px-3 sticky top-0 border-b border-border_color z-10">
      <h1
        className="xl:text-center flex-grow text-lg xl:text-4xl font-bold text-primary tracking-widest font-sour_gummy"
        // style={{ fontFamily: "var(--font-geist)" }}
      >
        NEXT FASHION TEXTILE
      </h1>
      {/* <button
        className="flex items-center gap-5 bg-primary cursor-pointer text-sm xl:text-xl  duration-200 px-6 h-12 hover:text-secondary font-medium rounded-full"
        onClick={logOutHandler}
      >
        Logout
      </button> */}
      <ThemeToggler />
    </div>
  );
};

export default NavBar;
