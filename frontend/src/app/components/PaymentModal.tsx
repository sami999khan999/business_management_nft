"use client";

import { EmployeeType, FilteredBill } from "@/types";
import React, { SetStateAction, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Dropdown from "./Dropdown";
import { getEmployee } from "@/utils/employeeApiRequest";
import BillInvoiceModal from "./BillInvoiceModal";
import {
  createBill,
  getFilteredEmployeeBillData,
} from "@/utils/employeeBillApiRequests";
import BillFilterTable from "./BillFilterTable";
import { CgSpinnerTwo } from "react-icons/cg";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import toast from "react-hot-toast";
import { ErrorToast, SuccessToast } from "./Toast";

const PaymentModal = ({
  setIsopen,
  setReload,
}: {
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
  setReload: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [filterEmployeeId, setFilterEmployeeId] = useState<
    number | undefined
  >();
  const [fliterInoviceId, setFliterInoviceId] = useState<
    number[] | undefined
  >();
  const [filterMethod, setfilterMethod] = useState<string | undefined>();
  const [employees, setEmployees] = useState<EmployeeType[]>();
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [employeeTotalPage, setEmployeeTotalpage] = useState<
    number | undefined
  >();
  const [methodCurrentPage, setMethodCurrentPage] = useState(1);

  const [employeeSelectionError, setEmployeeSelectionError] = useState("");
  const [methodSelectionError, setMethodSelectionError] = useState("");
  const [filteredData, setFilteredData] = useState<
    FilteredBill[] | undefined
  >();
  const [selectedData, setSelectedData] = useState<
    FilteredBill[] | undefined
  >();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");

  const methodData = [
    {
      method: "challan",
    },
    {
      method: "production",
    },
  ];

  console.log(date);

  const filterHandler = async () => {
    const newError = {
      method: "",
      employeeId: "",
      invoiceId: "",
    };

    setSelectedData([]);

    if (filterMethod === undefined) {
      newError.method = "Please select a method";
    }

    if (filterEmployeeId === undefined) {
      newError.employeeId = "Please select an employee";
    }

    if (
      filterMethod === "challan" &&
      (fliterInoviceId?.length === 0 || fliterInoviceId === undefined)
    ) {
      newError.invoiceId = "Select Invoice to continye";
    }

    if (newError.employeeId || newError.method || newError.invoiceId) {
      if (newError.employeeId) {
        setEmployeeSelectionError(newError.employeeId);
      }
      if (newError.method) {
        setMethodSelectionError(newError.method);
      }
      if (newError.invoiceId) {
        setMethodSelectionError(newError.invoiceId);
      }
      return;
    }

    const filterParameters = {
      employee: filterEmployeeId,
      challan: filterMethod === "challan" ? fliterInoviceId : "",
      filter_method: filterMethod,
    };

    try {
      const response = await getFilteredEmployeeBillData(filterParameters);

      if (response?.success) {
        setFilteredData(response.data);
      } else {
        console.error(
          "Error: Could not fetch filtered employee bill data",
          response.message
        );
      }
    } catch (error) {
      console.error("Error during filter operation:", error);
    }
  };

  const billCreateHandler = async () => {
    try {
      if (!selectedData || selectedData?.length === 0) {
        throw new Error("No data selected!");
      }

      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await createBill(selectedData);

      if (response.success) {
        setIsopen(false);
        setReload((prv) => !prv);

        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Payment Created Successfully!
          </SuccessToast>
        ));
      } else {
        console.log("Error: Failed to create bill", response.message);

        toast.custom((t) => (
          <ErrorToast visible={t.visible}>Failed To Create Payment!</ErrorToast>
        ));
      }
    } catch (err) {
      console.log(err);
      toast.custom((t) => (
        <ErrorToast visible={t.visible}>Failed To Create Payment!</ErrorToast>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployee(employeeCurrentPage);

        if (response.success) {
          const firstElement = response.data.shift();
          const totalPage = firstElement.total_page;

          setEmployeeTotalpage(totalPage);
          setEmployees(response.data);
        } else {
          console.log("Error: Failed to fetch employees", response.message);
        }
      } catch (error) {
        console.error("Error fetching employees:", error); // Logs the error to the console
      }
    };

    fetchEmployees();
  }, [employeeCurrentPage]);

  useEffect(() => {
    if (selectedData && selectedData?.length > 0) {
      const total = selectedData.reduce((acc, item) => acc + item.amount, 0);

      setTotalAmount(total);
    }
  }, [selectedData]);

  return (
    <div>
      {isInvoiceModalOpen === true && (
        <BillInvoiceModal
          setInoviceId={setFliterInoviceId}
          invoiceId={fliterInoviceId}
          setIsInvoiceModalOpen={setIsInvoiceModalOpen}
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-30 ">
        <div className="relative w-[97%] xl:w-[90%] h-[80%] xl:h-[75%] bg-secondary px-3 xl:px-8 py-6 xl:pt-10 rounded-xl border border-border_color overflow-y-auto remove-scrollbar">
          <div className="close-btn" onClick={() => setIsopen((prv) => !prv)}>
            <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center text-center border-b border-border_color pb-3">
            <h2 className="text-xl xl:text-3xl font-sour_gummy text-primary font-semibold text-center">
              Employee Payment
            </h2>
            <p className="text-primary-foreground text-lg w-[60%] hidden xl:block">
              Simplify your payroll process with timely and accurate payments.
              Ensure your team stays motivated and valued with secure,
              hassle-free employee payment solutions.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 mt-6">
            <div className="left xl:w-[50%] flex flex-col gap-3">
              <div className="w-full flex flex-col gap-3 xl:flex-row">
                <div className="xl:w-[70%] ">
                  <Dropdown
                    data={methodData}
                    currentPage={methodCurrentPage}
                    setCurrentPage={setMethodCurrentPage}
                    setValue={setfilterMethod}
                    setSelectionError={setMethodSelectionError}
                    type="Method"
                  />
                  {filterMethod === "challan" && (
                    <div>
                      <button
                        className="w-full border border-border_color rounded-full mt-2 text-primary-foreground font-semibold text-lg hover:bg-primary hover:text-background duration-200"
                        onClick={() => {
                          setIsInvoiceModalOpen(true);
                          setMethodSelectionError("");
                        }}
                      >
                        Get Invoice
                      </button>
                    </div>
                  )}
                  <p className="error_message">{methodSelectionError}</p>
                </div>

                <div className="w-full">
                  <Dropdown
                    data={employees}
                    totalPage={employeeTotalPage}
                    currentPage={employeeCurrentPage}
                    setCurrentPage={setEmployeeCurrentPage}
                    setId={setFilterEmployeeId}
                    setSelectionError={setEmployeeSelectionError}
                    type="employee"
                  />
                  <p className="error_message">{employeeSelectionError}</p>
                </div>
                <div className="">
                  <button className="submit-btn mt-0" onClick={filterHandler}>
                    Get
                  </button>
                </div>
              </div>

              {filteredData?.length === 0 ||
                (filteredData === undefined && (
                  <div className="hidden xl:block absolute top-[50%] left-[35%] text-primary-foreground font-bold text-2xl">
                    <p>
                      Select{" "}
                      <span className="text-primary">Payment Method</span> and{" "}
                      <span className="text-primary">Employee</span> to get
                      started
                    </p>
                  </div>
                ))}

              <BillFilterTable
                data={filteredData}
                // method={filterMethod}
                setSelectedData={setSelectedData}
                selectedData={selectedData}
                type="select"
              />
            </div>
            <div className="border-2 border-border_color"></div>
            <div className="right xl:w-[50%]">
              <input
                type="date"
                className="inputfield"
                onChange={(e) => setDate(e.target.value)}
              />

              {selectedData && selectedData?.length > 0 ? (
                <div className="mt-7">
                  <div className="flex gap-6 text-primary-foreground xl:text-xl justify-between px-2 font-semibold text-sm">
                    <div>
                      <span className="text-primary">Selected:</span>{" "}
                      {selectedData.length}
                    </div>
                    <div>
                      <span className="text-primary">Total Amount:</span>{" "}
                      {formatNumberWithCommas(totalAmount)}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                  </div>
                  {/* <div className="text-primary-foreground font-bold text-xl xl:text-2xl text-center ">
                    Selected Data
                  </div> */}
                  <BillFilterTable
                    data={selectedData}
                    // method={filterMethod}
                  />
                  <div className="flex items-center justify-center mt-4">
                    <button
                      className="submit-btn mt-0 xl:w-[17rem]"
                      onClick={billCreateHandler}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center w-full">
                          <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-background" />
                        </div>
                      ) : (
                        <div>Pay</div>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {filteredData && filteredData?.length > 0 && (
                    <div className="text-xl xl:text-3xl text-primary-foreground font-semibold text-center xl:mt-20">
                      No Selected Data
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
