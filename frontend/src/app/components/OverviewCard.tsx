import React, { ReactNode } from "react";

const OverviewCard = ({
  title,
  logo,
  value,
}: {
  title: string;
  logo: ReactNode;
  value: number | undefined;
}) => {
  return (
    <div className="border border-border_color rounded-md text-xl text-primary-foreground bg-background font-medium w-full flex flex-col items-center justify-center relative group">
      <div className="absolute 1080p:text-lg 720p:text-xs sm:text-sm text-xs top-2 xl:top-4 left-2 xl:left-4 w-full rounded-t-md opacity-40 flex gap-2 items-center">
        {title}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 1080p:text-[7rem] 720p:text-[5rem] sm:text-[4rem] text-[3rem] opacity-5">
        {logo}
      </div>
      <div className="text-primary 1080p:text-5xl 720p:text-4xl sm:text-3xl text-2xl border-border_color rounded-full xl:w-28 sm:w-20 w-16 aspect-square flex items-center justify-center group-hover:1080p:text-[5rem] group-hover:720p:text-[3rem] duration-200 ease-in-out origin-center">
        {value}
      </div>
    </div>
  );
};

export default OverviewCard;
