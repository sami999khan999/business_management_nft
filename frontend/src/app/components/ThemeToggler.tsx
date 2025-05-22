"use client";

import { useTheme } from "next-themes";
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="px-4 transition-transform">
      <div
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-2xl xl:text-3xl text-primary-foreground border border-border_color  rounded-full relative"
      >
        <div className="absolute h-[2.2rem] xl:h-[2.8rem] w-[2.2rem] xl:w-[2.8rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 flex items-center justify-center">
          <RxMoon />
        </div>
        <div className="h-[2.2rem] xl:h-[2.8rem] w-[2.2rem] xl:w-[2.8rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 flex items-center justify-center">
          <IoSunnyOutline />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggler;
