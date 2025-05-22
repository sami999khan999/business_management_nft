"use client";

import React from "react";

const DeleteModal = ({
  activeElement,
  handler,
  setIsOpen,
  title,
  isLoading,
}: {
  activeElement?: { id: number | undefined; name: string | undefined };
  handler: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  isLoading?: boolean;
}) => {
  return (
    <div
      className="flex items-center justify-center absolute  top-0 left-0 z-50 w-full h-full backdrop-blur-md"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="bg-secondary border border-border_color rounded-xl py-5 px-3 xl:px-5 w-[90%] xl:w-[40%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center font-semibold xl:text-2xl text-primary-foreground mb-3">
          {title}
        </h2>

        <p className="text-xs xl:text-xl text-primary-foreground">
          Would you like to delete{" "}
          <span className="text-primary font-semibold ">
            {`{ id: ${activeElement?.id} | Name: ${activeElement?.name} } `}
          </span>
          this {title}?
        </p>
        <div className="flex justify-end gap-2 xl:gap-3 mt-2 xl:mt-4">
          <button
            className="bg-primary-foreground hover:bg-gray-700 dark:hover:bg-gray-300 duration-200 font-semibold tracking-wide xl:text-xl text-background text-sm px-4 xl:px-10 xl:py-2 py-1 rounded-md"
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            Cancle
          </button>
          <button
            className="bg-primary text-background font-semibold tracking-wide hover:bg-[#0ea30e] duration-200 rounded-md xl:text-xl text-sm px-4 xl:px-10 xl:py-2 py-1 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={() => {
              handler();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
