import { DropdownType } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DorpdownHeader from "./DorpdownHeader";
import DropdownBody from "./DropdownBody";
import Pagination from "./Pagination";

const Dropdown = ({
  data,
  totalPage,
  currentPage,
  setCurrentPage,
  setId,
  setValue,
  setSelectionError,
  defalutValue,
  type,
  deleteHandler,
}: {
  data: DropdownType[] | undefined;
  totalPage?: number | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  setId?: React.Dispatch<SetStateAction<number | undefined>>;
  setSelectionError?: React.Dispatch<SetStateAction<string>>;
  setValue?: React.Dispatch<SetStateAction<string | undefined>>;
  defalutValue?: DropdownType;
  deleteHandler?: (id: number) => void;
  type:
    | "product"
    | "employee"
    | "production"
    | "status"
    | "customer"
    | "Method"
    | "categories"
    | "unit";
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>();
  const [selectedId, setSelectedId] = useState<number | undefined>();

  useEffect(() => {
    if (defalutValue) {
      if (type === "employee") {
        setSelectedItem(defalutValue?.employee?.name);
        setSelectedId(undefined);
      }
      if (type === "product") {
        setSelectedItem(defalutValue?.product?.name);
        setSelectedId(undefined);
      }
      if (type === "production") {
        setSelectedItem(defalutValue?.product?.name);
      }
      if (type === "status") {
        setSelectedItem(defalutValue?.status);
      }
    }
  }, [defalutValue, type]);

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <div
            className="bg-secondary-foreground text-primary-foreground rounded-full py-2 px-5 border border-border_color text-base xl:text-xl flex items-center justify-between shadow-sm"
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <div>{selectedItem ? selectedItem : <p>Select {type}</p>}</div>
            <div
              className={`transition-transform ${
                isDropdownOpen && "rotate-180"
              }`}
            >
              <IoIosArrowDown />
            </div>
          </div>
          {isDropdownOpen && (
            <div
              className="absolute z-50 w-full h-[14rem] top-14 bg-secondary border border-border_color rounded-md overflow-auto text-primary-foreground text-base px-3 shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* <div className="flex px-4 bg-background rounded-t-md mt-2 gap-10 py-3 font-semibold">
              <div className="w-1/6">ID</div>
              <div className="flex-1">Name</div>
              {type === "product" && <div className="flex-1">Rate</div>}
            </div> */}
              <div>
                <DorpdownHeader type={type} />
              </div>
              <div className="cursor-pointer">
                {data?.map((item, i) => (
                  <div key={i}>
                    <DropdownBody
                      i={i}
                      type={type}
                      setId={setId}
                      setValue={setValue}
                      item={item}
                      setIsDropdownOpen={setIsDropdownOpen}
                      setSelectionError={setSelectionError}
                      setSelectedId={setSelectedId}
                      selectedId={selectedId}
                      setSelectedItem={setSelectedItem}
                      deleteHandler={deleteHandler}
                    />
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isDropdownOpen && (
        <div
          className="absolute top-0 left-0  w-full h-full z-40"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        ></div>
      )}
    </>
  );
};

export default Dropdown;
