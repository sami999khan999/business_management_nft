"use client";

import { SingleEmployeeBillType } from "@/types";
import { getSingleEmployeeBill } from "@/utils/employeeBillApiRequests";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const EmployeePayment = ({ id }: { id: number }) => {
  const path = useRouter();
  const [employeeBills, setEmployeeBills] = useState<
    SingleEmployeeBillType | undefined
  >();

  useEffect(() => {
    const fetchEmployeeBill = async () => {
      const response = await getSingleEmployeeBill(id);

      if (response.success) {
        setEmployeeBills(response.data);
      }
    };
    fetchEmployeeBill();
  }, [id]);

  return (
    <div className="w-full h-full xl:px-12 px-2 py-10 xl:py-8 rounded-xl ">
      <div className="bg-secondary border border-border_color rounded-lg relative">
        <div
          className="absolute top-3 xl:top-8 left-2 xl:left-8 text-base xl:text-2xl text-primary-foreground px-4 py-1 rounded-md dark:hover:bg-secondary-foreground hover:bg-gray-100 duration-200 "
          onClick={() => path.back()}
        >
          <FaArrowLeftLong />
        </div>
        <h2 className="text-primary font-sour_gummy text-2xl xl:pt-8 pt-5 xl:text-3xl font-semibold text-center">
          Employee Bill
        </h2>
        <div className=" text-primary-foreground text-xl font-semibold flex flex-col xl:flex-row text-center xl:text-left justify-between xl:gap-4 gap-2 xl:px-6 py-6 px-3">
          <div className="flex-1 px-6 xl:py-3 py-1 xl:rounded-l-md rounded-md space-y-1 dark:hover:bg-secondary-foreground hover:bg-gray-100 duration-200 text-base xl:text-2xl border border-border_color cursor-pointer">
            <div className="">
              <span className="text-primary font-bold font-sour_gummy">
                ID:
              </span>{" "}
              {employeeBills?.employee.id}
            </div>
            <div className="font-semibold">{employeeBills?.employee.name}</div>
          </div>

          <div className="border border-border_color rounded-md flex-1 px-6 xl:py-3 py-1 space-y-1 dark:hover:bg-secondary-foreground hover:bg-gray-100 duration-200 text-base xl:text-2xl cursor-pointer">
            <div className="font-bold text-primary  font-sour_gummy">Paid</div>
            <div>
              <span className="font-normal">Grand Total: </span>{" "}
              {formatNumberWithCommas(employeeBills?.grand_total)}
              <span className="xl:text-sm text-[8px]"> TK</span>
            </div>
          </div>

          <div className="flex-1 px-6 xl:py-3 py-1 rounded-md space-y-1 dark:hover:bg-secondary-foreground hover:bg-gray-100 duration-200 text-base xl:text-2xl border border-border_color cursor-pointer">
            <div className="font-bold text-primary font-sour_gummy">Date</div>
            <div>{employeeBills?.date}</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-8 bg-secondary xl:px-6 py-6 px-3 rounded-lg border border-border_color">
        <div className="w-[35rem] xl:w-full">
          <div className="table-header">
            <p className="w-1/12">ID</p>
            <p className="flex-1">Products</p>
            <p className="flex-1">Quantity</p>
            <p className="flex-1">Rate</p>
            <p className="flex-1">Total QTY</p>
            <p className="flex-1">Amount</p>
          </div>
          <div>
            {employeeBills?.data.map((item, i) => (
              <div key={i} className="table-col py-2">
                <p className="w-1/12">{item.sl_no}</p>
                <p className="flex-1">{item.products}</p>
                <p className="flex-1">{item.quantity}</p>
                <p className="flex-1">
                  {formatNumberWithCommas(item.rate)}
                  <span className="xl:text-sm text-[8px]"> TK</span>
                </p>
                <p className="flex-1">{item.total_qty}</p>
                <p className="flex-1">
                  {formatNumberWithCommas(item.amount)}
                  <span className="xl:text-sm text-[8px]"> TK</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePayment;
