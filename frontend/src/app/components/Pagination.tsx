"use client";

import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  totalPage,
  setCurrentPage,
  currentPage,
}: {
  totalPage: number | undefined;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  currentPage: number;
}) => {
  const path = useRouter();

  const handleNext = () => {
    setCurrentPage((pre) => pre + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((pre) => pre - 1);
  };

  const pageNumber = () => {
    const pages: number[] = [];
    const pagesToShow = 5;
    const start = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    const end = Math.min(start + pagesToShow - 1, totalPage!);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    if (currentPage !== null) {
      path.push(`?page=${currentPage}`);
    }
  }, [currentPage, path]);

  return (
    <div>
      {totalPage! > 1 && totalPage !== undefined && (
        <div className="flex items-center mt-6 xl:gap-4 justify-center xl:mb-0 ">
          <div className="flex items-center justify-center text-sm xl:text-xl gap-5 xl:px-8 px-3 rounded-md w-fit cursor-pointer font-semibold">
            <button
              className="text-primary-foreground hover:bg-primary hover:text-background py-1 rounded-full"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <IoIosArrowBack />
            </button>

            <div className="flex justify-center items-center text-primary-foreground">
              <div className=" flex gap-3 items-center">
                {pageNumber().map((i) => (
                  <div
                    key={i}
                    className={`text-center flex items-center justify-center xl:w-7 w-5 xl:h-7 h-5 rounded-full ${
                      currentPage === i && "bg-primary text-secondary"
                    } `}
                    onClick={() => {
                      setCurrentPage(() => {
                        return i;
                      });
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="px-4">•••</p>
              <p
                onClick={() => {
                  setCurrentPage(() => {
                    return totalPage!;
                  });
                }}
              >
                {totalPage}
              </p>
            </div>

            <button
              className="text-primary-foreground hover:bg-primary rounded-full hover:text-background py-1"
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
