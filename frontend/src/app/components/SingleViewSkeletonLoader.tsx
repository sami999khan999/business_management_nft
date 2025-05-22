import React from "react";

const SingleViewSkeletonLoader = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-between px-4">
        <div className="space-y-3">
          <div className="dark:bg-secondary-foreground bg-gray-200 w-[8rem] h-5"></div>
          <div className="dark:bg-secondary-foreground bg-gray-200 w-[10rem] h-3"></div>
        </div>
        <div className="space-y-3">
          <div className="dark:bg-secondary-foreground bg-gray-200 w-[8rem] h-5"></div>
          <div className="dark:bg-secondary-foreground bg-gray-200 w-[10rem] h-3"></div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex bg-gray-200 dark:text-primary-foreground dark:bg-background justify-between px-4 xl:px-6 py-2 xl:py-4 xl:text-lg gap-4 mt-3 rounded-t-lg">
          <div className="w-1/12 bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          <div className="flex-1 bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          <div className="flex-1 bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          <div className="flex-1 bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          <div className="flex-1 bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          <div className="flex-1 bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          <div className="flex-1 bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
        </div>
        <div>
          <div className="flex justify-between border-b border-underline px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-4 relative duration-200 ">
            <div className="w-1/12 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-between border-b border-underline px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-4 relative duration-200 ">
            <div className="w-1/12 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-between border-b border-underline px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-4 relative duration-200 ">
            <div className="w-1/12 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-between border-b border-underline px-4 xl:px-6 py-2 xl:py-4 text-xs xl:text-lg gap-4 relative duration-200 ">
            <div className="w-1/12 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
            <div className="flex-1 bg-gray-200 dark:bg-secondary-foreground h-6 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleViewSkeletonLoader;
