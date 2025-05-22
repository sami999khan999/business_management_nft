// "use client";

import { updateDiscount } from "@/utils/memoApiRequests";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import React, { SetStateAction, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { ErrorToast, SuccessToast } from "./Toast";
import toast from "react-hot-toast";

const DiscountModal = ({
  isModalOpen,
  discountData,
  setReload,
}: {
  isModalOpen: React.Dispatch<SetStateAction<boolean>>;
  discountData: {
    total: number | undefined;
    total_after_discount: number | undefined;
  };
  setReload: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [discountAmount, setDiscountAmount] = useState<number>();
  const [discountError, setDiscountError] = useState("");
  const [discountFormat, setDiscountFormat] = useState<"number" | "percent">();

  const discountChangeHandler = (discount: string) => {
    const matcher = /^(?:\d+(\.\d+)?|(\d+(\.\d+)?)%)?$/;

    if (!matcher.test(discount)) {
      setDiscountError("Invalid Format!");
      return;
    } else {
      setDiscountError("");

      if (discount[discount.length - 1] === "%") {
        const discountPercentage = parseFloat(discount.slice(0, -1));
        if (discountPercentage < 0 || discountPercentage > 100) {
          setDiscountError("Invalid Discount Percentage!");
          return;
        }
        const discountAmount =
          (discountData.total || 0) * (discountPercentage / 100);
        setDiscountAmount(discountAmount);
        setDiscountFormat("percent");
      } else {
        const totalDiscount = parseFloat(discount);
        if (discountData.total && totalDiscount > discountData.total) {
          setDiscountError("Discount must be less than total amount!");
          return;
        }
        setDiscountAmount(parseFloat(discount));
        setDiscountFormat("number");
      }
    }
  };

  const discountSubmitHandler = async () => {
    try {
      if (!discountAmount) {
        setDiscountError("Please enter a valid discount amount!");
        return;
      }

      if (!discountFormat) {
        setDiscountError("Please enter a valid discount format!");
        return;
      }

      if (!discountError) {
        const response = await updateDiscount({
          amount: discountAmount,
          method: discountFormat,
        });

        if (response.success) {
          toast.custom((t) => (
            <SuccessToast visible={t.visible}>
              Successfully updated discount!
            </SuccessToast>
          ));
          isModalOpen(false);
          setReload((prev) => !prev);
        } else {
          console.log("Error creating Momo: ", response.message);
          toast.custom((t) => (
            <ErrorToast visible={t.visible}>{response.message}</ErrorToast>
          ));
        }
      }
    } catch (err) {
      console.log("Unexpected Error Updating Discount: ", err);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-blur-lg">
      <div className="xl:w-[60%] w-[95%] bg-secondary border border-border_color rounded-lg xl:px-8 px-4 xl:py-10 py-5 relative">
        <div className="close-btn" onClick={() => isModalOpen(false)}>
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>
        <h2 className="text-2xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center">
          Add Discount
        </h2>
        <div className="mt-6 xl:mt-10">
          <div className="text-xl xl:text-2xl flex gap-2">
            <span className="font-semibold text-primary">Total Amount:</span>{" "}
            <div className="flex gap-4 font-semibold">
              <p className={`${discountAmount ? "line-through" : ""}`}>
                {formatNumberWithCommas(discountData.total)}
              </p>
              <p>
                {discountAmount &&
                  discountData.total &&
                  formatNumberWithCommas(discountData.total - discountAmount)}
              </p>
            </div>
          </div>
          <input
            type="text"
            className="inputfield mt-3"
            placeholder="Add Discount"
            onChange={(e) => discountChangeHandler(e.target.value)}
          />
          {discountError && <p className="error_message">{discountError}</p>}
          <button className="submit-btn mt-3" onClick={discountSubmitHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
