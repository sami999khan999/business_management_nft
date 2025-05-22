"use client";

import { CustomerType, FilterMemoType } from "@/types";
import { getCustoer } from "@/utils/customerApiRerquest";
import { createMemo, getFilterMemo } from "@/utils/memoApiRequests";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import Dropdown from "./Dropdown";
import MemoFilterTable from "./MemoFilterTable";
import { ErrorToast, SuccessToast } from "./Toast";

const MemoModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const path = useRouter();
  const [customers, setCustomers] = useState<CustomerType[] | undefined>();
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
  const [customerTotalpage, setCustomerTotalPage] = useState<
    number | undefined
  >();
  const [customerActiveId, setCustomerActiveId] = useState<
    number | undefined
  >();
  const [customerSelectionError, setCustomerSelectionError] = useState("");

  const [filteredData, setFilteredData] = useState<
    FilterMemoType[] | undefined
  >();
  const [selectedData, setSelectedData] = useState<
    FilterMemoType[] | undefined
  >();
  const [selectedId, setSelectedId] = useState<number[] | undefined>();
  const [totalAmount, setTotalAmount] = useState<number | undefined>();
  const [discount, setDiscount] = useState("");
  const [finalDiscount, setFinalDiscount] = useState("");
  const [discountInputError, setDiscountInputError] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number>();
  const [removeDiscount, setRemoveDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");

  const getFilteredDataHandler = async () => {
    try {
      if (!customerActiveId) {
        setCustomerSelectionError("Select a customer to continue");
        return;
      }

      setCustomerSelectionError("");
      setSelectedData(undefined);
      setIsLoading(true);

      const response = await getFilterMemo(customerActiveId);

      if (response.success) {
        setFilteredData(response.data);
      } else {
        console.log("Error fetching Filter Memo:", response.message);
        setFilteredData(undefined);
      }
    } catch (err) {
      console.log("Error fetching Filter Memo:", err);
      toast.custom((t) => (
        <ErrorToast visible={t.visible}>Failed to fetch data</ErrorToast>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const addDiscountHandler = () => {
    const matcher = /^(?:\d+(\.\d+)?|(\d+(\.\d+)?)%)?$/;
    if (!matcher.test(discount)) {
      setDiscountInputError("Invalid discount input");
      return;
    } else if (discount === "") {
      setDiscountInputError("Enter a value!");

      return;
    } else {
      if (discount[discount.length - 1] === "%") {
        const discountPersent = Number(discount.slice(0, discount.length - 1));
        const totalDiscount = (Number(totalAmount) / 100) * discountPersent;

        const totalAmountAfterDiscount = Number(totalAmount) - totalDiscount;

        setTotalAfterDiscount(totalAmountAfterDiscount);
        setFinalDiscount(discount);
      } else {
        const totalAmountAfterDiscount = Number(totalAmount) - Number(discount);

        setTotalAfterDiscount(totalAmountAfterDiscount);
        setFinalDiscount(discount);
      }
    }
  };

  const createMemoHandler = async () => {
    try {
      if (!selectedId) {
        toast.error("Select at least one memo to create a momo");
        return;
      }

      const discountMethod: "percent" | "amount" | null =
        finalDiscount !== ""
          ? finalDiscount[finalDiscount.length - 1] === "%"
            ? "percent"
            : "amount"
          : null;

      const discountAmount =
        discountMethod !== null
          ? discountMethod === "percent"
            ? finalDiscount.slice(0, finalDiscount.length - 1)
            : finalDiscount
          : 0;

      const data = {
        challanId: selectedId,
        discount: Number(discountAmount),
        discountMethod: discountMethod,
        date: date ? date : "",
      };

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await createMemo(data);

      if (response.success) {
        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Memo Created Successfully
          </SuccessToast>
        ));
        path.push(`memo/${response.data.cashmemo}`);
        setSelectedData(undefined);
      } else {
        console.log("Error creating Momo: ", response.message);
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>{response.message}</ErrorToast>
        ));
      }
    } catch (err) {
      console.log("Unexpected Error creating Momo: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getCustoer(customerCurrentPage);

        if (response.success) {
          const firstElement = response.data.shift();
          const totalPage = firstElement.total_page;

          setCustomers(response.data);
          setCustomerTotalPage(totalPage);
        } else {
          console.error("Error fetching customers:", response.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [customerCurrentPage]);

  useEffect(() => {
    if (selectedData && selectedData?.length > 0) {
      const total = selectedData.reduce(
        (acc, item) => acc + Number(item.amount),
        0
      );

      setDiscount("");
      setTotalAfterDiscount(undefined);
      setTotalAmount(total);
    }
  }, [selectedData, removeDiscount]);

  return (
    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-20">
      <div className="relative bg-secondary w-[95%] xl:w-[90%] h-[85%] border border-border_color rounded-lg py-6 xl:px-8 px-3 overflow-x-auto remove-scrollbar">
        <div className="close-btn" onClick={() => setIsOpen((prv) => !prv)}>
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center text-center border-b border-border_color pb-4">
          <h2 className="text-xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center">
            Generate Cash Memo
          </h2>
          <p className="text-primary-foreground text-lg w-[70%] hidden xl:block">
            Generate professional cash memos instantly to provide customers with
            clear, accurate receipts, ensuring smooth transactions,
            transparency, and a hassle-free checkout experience every time.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row justify-between gap-4 mt-6">
          <div className="left w-full xl:w-[50%] flex flex-col gap-2">
            <div className="space-y-3">
              <div className="w-full flex flex-col xl:flex-row gap-3">
                <div className="w-full">
                  <Dropdown
                    data={customers}
                    currentPage={customerCurrentPage}
                    totalPage={customerTotalpage}
                    setCurrentPage={setCustomerCurrentPage}
                    setId={setCustomerActiveId}
                    setSelectionError={setCustomerSelectionError}
                    type="customer"
                  />
                  <p className="error_message">{customerSelectionError}</p>
                </div>
                <button
                  className="submit-btn mt-0 xl:w-fit disabled:cursor-not-allowed xl:h-11 h-8"
                  onClick={getFilteredDataHandler}
                  disabled={isLoading}
                >
                  Get
                </button>
              </div>

              <div>
                <input
                  type="date"
                  className="inputfield "
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {filteredData ? (
              <div>
                <MemoFilterTable
                  data={filteredData}
                  type="selection"
                  setSelectedData={setSelectedData}
                  selectedData={selectedData}
                  setSelectedId={setSelectedId}
                />
              </div>
            ) : (
              <div className="absolute w-full top-[70%] xl:top-[60%] flex justify-center text-xl xl:text-3xl font-semibold text-primary-foreground">
                <p>
                  Select <span className="text-primary">Customer</span> to get
                  started
                </p>
              </div>
            )}
          </div>

          <div className="xl:border-r-4 border-t-4 border-border_color"></div>

          <div className="right xl:w-[50%] overflow-x-hidden">
            {selectedData && selectedData?.length > 0 ? (
              <div>
                <div className="flex flex-col xl:flex-row gap-3">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter discount [ 1000 or 10% ]"
                      className="inputfield"
                      value={discount}
                      onChange={(e) => {
                        setDiscount(e.target.value);
                        setDiscountInputError("");
                      }}
                    />
                    <p className="error_message">{discountInputError}</p>
                  </div>
                  <button
                    className="submit-btn mt-0 xl:w-fit xl:h-11 h-8"
                    onClick={addDiscountHandler}
                  >
                    Add
                  </button>
                  <button
                    className="submit-btn mt-0 xl:w-fit xl:h-11 h-8"
                    onClick={() => {
                      setRemoveDiscount((prv) => !prv);
                      setTotalAfterDiscount(undefined);
                      setDiscountInputError("");
                      setDiscount("");
                      setFinalDiscount("");
                    }}
                  >
                    Remove
                  </button>
                </div>

                <div>
                  <div className="flex gap-6 text-primary-foreground text-sm xl:text-xl justify-between px-2 font-semibold mt-8">
                    <div>
                      <span className="text-primary">Selected: </span>
                      {selectedData.length}
                    </div>
                    <div className="flex gap-2">
                      <span className="text-primary">Total Amount: </span>
                      {totalAfterDiscount ? (
                        <div className="flex justify-center items-center gap-3">
                          <p className="line-through xl:text-lg text-xs">
                            {formatNumberWithCommas(totalAmount)}
                          </p>
                          <p>
                            {formatNumberWithCommas(totalAfterDiscount)}
                            <span className="xl:text-sm text-[8px]"> TK</span>
                          </p>
                        </div>
                      ) : (
                        <span>
                          {formatNumberWithCommas(totalAmount)}
                          <span className="xl:text-sm text-[8px]"> TK</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <MemoFilterTable
                    data={selectedData}
                    type="selected"
                    setSelectedData={setSelectedData}
                    selectedData={selectedData}
                  />
                  <div className="w-full flex items-center justify-center">
                    <button
                      className="submit-btn mx-0 xl:w-fit xl:px-16"
                      onClick={createMemoHandler}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center w-full ">
                          <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-background" />
                        </div>
                      ) : (
                        <div>Create Memo</div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              filteredData &&
              filteredData?.length > 0 && (
                <div className="text-xl xl:text-3xl text-primary-foreground font-semibold text-center xl:mt-20 h-[5rem]">
                  No Selected Data
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoModal;
