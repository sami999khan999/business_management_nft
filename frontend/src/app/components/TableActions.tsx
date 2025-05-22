import React, { SetStateAction } from "react";
import { HiPlus } from "react-icons/hi";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineSort } from "react-icons/md";

const TableActions = ({
  setIsOpen,
  tableName,
  setModalAction,
  logo,
}: {
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
  tableName: string;
  setModalAction?: React.Dispatch<
    SetStateAction<"create" | "update" | "delete" | undefined>
  >;
  logo: React.ReactNode;
}) => {
  return (
    <div className="">
      {/* <div className="bg-black">
        <AddButton text={`Add ${tableName}`} />
      </div> */}

      <div
        className=" xl:w-fit ml-auto mb-3"
        onClick={() => {
          setIsOpen!((prv) => !prv);
          if (setModalAction) {
            setModalAction("create");
          }
        }}
      >
        <div className="bg-primary text-sm lg:text-xl w-full xl:w-fit text-center py-2 lg:py-3 px-3 lg:px-5 flex items-center gap-3 rounded-full self-end text-secondary font-medium hover:bg-primary/90 duration-300 group justify-center cursor-pointer mb-5">
          <HiPlus className="text-xl xl:text-2xl transition-transform group-hover:rotate-180 origin-center" />

          <p className="text-center text-base xl:text-xl font-semibold tracking-wide text-secondary-foreground">
            Add {tableName}
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 justify-between text-center ">
        <div className="text-xl flex items-center justify-center gap-4 xl:text-left font-sour_gummy xl:text-3xl font-semibold tracking-wider text-primary-foreground">
          {logo}
          <p>{`${tableName}`}</p>
        </div>
        <div className="flex gap-2 justify-around">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm rounded-full bg-secondary border-[0.1rem] border-border_color w-[50%] xl:w-[20rem] h-8 xl:h-12 xl:text-xl px-6 text-primary-foreground hover:text-background hover:bg-gray-300 duration-300"
          />
          <div className="font-medium flex gap-2 xl:text-xl text-sm">
            <div className=" flex items-center gap-2 px-4 xl:px-8 text-primary-foreground rounded-full bg-secondary border-[0.1rem] border-border_color cursor-pointer">
              <IoFilterSharp />
              <p>Filter</p>
            </div>
            <div className="font-medium flex items-center gap-2 px-2 xl:px-6 text-primary-foreground rounded-full bg-secondary border-[0.1rem] border-border_color cursor-pointer">
              <MdOutlineSort />
              <p>Sort</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableActions;
