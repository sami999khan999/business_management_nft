"use client";

import { DeleteDataType } from "@/types";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import { SuccessToast } from "./Toast";

const DeleteTimerModal = ({
  element,
  setDeleteRelatedData,
  deleteHandler,
  setIsOpen,
  isLoading,
  title,
  deleteRelatedData,
  checkBoxMessage,
}: {
  element: DeleteDataType | undefined;
  setDeleteRelatedData: React.Dispatch<React.SetStateAction<boolean>>;
  deleteHandler: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  title: string;
  deleteRelatedData: boolean;
  checkBoxMessage: string;
}) => {
  // const [isDisabled, setIsDisabled] = useState(true);
  const [deletInput, setDeletInput] = useState("");

  const textToCopy = "Delete" + " " + title;

  const columnData = element ? Object.keys(element) : [];
  const RowData = element ? Object.values(element) : [];

  console.log(RowData);

  return (
    <div
      className="flex items-center justify-center absolute  top-0 left-0 z-50 w-full h-full backdrop-blur-md"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="bg-secondary border border-border_color rounded-xl xl:py-10 py-5 px-3 xl:px-8 w-[90%] xl:w-[70%] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close-btn" onClick={() => setIsOpen((prv) => !prv)}>
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>

        <div className="text-xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center ">
          Delete {title}
        </div>

        <div className="space-y-6">
          <div className="overflow-x-auto">
            <div className="w-[35rem] xl:w-full">
              <div className="table-header mt-6">
                {columnData.map((col, i) => (
                  <div
                    key={i}
                    className={` ${
                      i === 0 || i === RowData.length - 1
                        ? "w-[4rem] xl:w-[7rem]"
                        : "flex-1"
                    }`}
                  >
                    {col}
                  </div>
                ))}
              </div>
              <div>
                <div className="table-col capitalize">
                  {RowData.map((row, i) => (
                    <div
                      key={i}
                      className={` ${
                        i === 0 || i === RowData.length - 1
                          ? "w-[4rem] xl:w-[7rem]"
                          : "flex-1"
                      }`}
                    >
                      {row}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-b-4 border-border_color"></div> */}

          <div className="">
            <div className="flex items-center gap-3 xl:text-xl text-base font-light text-primary-foreground mb-1">
              <p className="text-xs xl:text-xl">{checkBoxMessage}</p>
              <div
                className="text-primary cursor-pointer xl:text-lg text-sm"
                onClick={() => {
                  setDeleteRelatedData((prv) => !prv);
                }}
              >
                {deleteRelatedData ? (
                  <ImCheckboxChecked />
                ) : (
                  <ImCheckboxUnchecked />
                )}
              </div>
            </div>
            <div className="xl:text-xl flex gap-2 text-base font-light text-primary-foreground mb-1">
              To confirm, type{" "}
              <div
                className="text-primary font-semibold cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(textToCopy);

                  toast.custom((t) => (
                    <SuccessToast visible={t.visible}>Copied!</SuccessToast>
                  ));
                }}
              >
                {`"Delete ${title}"`}
              </div>{" "}
              in the box below
            </div>
            <input
              type="text"
              className="inputfield rounded-md bg-secondary"
              onChange={(e) => setDeletInput(e.target.value)}
            />
            <button
              className="w-full h-11 text-xl rounded-md mt-4 bg-secondary-foreground border border-border_color disabled:text-red-700/60 disabled:cursor-not-allowed text-primary"
              disabled={
                deletInput === `Delete ${title}` ? false : true || isLoading
              }
              onClick={deleteHandler}
            >
              {isLoading ? (
                <div className="flex items-center justify-center w-full ">
                  <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-background" />
                </div>
              ) : (
                <div>Delete</div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTimerModal;
