"use client";

import { MemoColumnType, MemoHeadingType } from "@/types";
import { getSingleMemo } from "@/utils/memoApiRequests";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import SingleViewSkeletonLoader from "./SingleViewSkeletonLoader";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import DiscountModal from "./DiscountModal";

const MemoSingleView = ({ id }: { id: number }) => {
  const path = useRouter();
  const [memoHeadingData, setMemoHeadingData] =
    useState<MemoHeadingType | null>(null);
  const [memoColumnData, setMemoColumnData] = useState<MemoColumnType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [column, setColumn] = useState<string[]>();
  const [format, setFormat] = useState<"format1" | "format2">("format1");
  const [isDiscountModal, setIsDiscountModal] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchMemoSingleData = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 250));

        const response = await getSingleMemo(id, format);

        console.log(response);

        if (response.success) {
          const headingData = response.data[0];

          if (headingData) {
            setMemoHeadingData(headingData);

            console.log(response);
            const columns = response.data.slice(1);

            if (columns.length > 0) {
              setMemoColumnData(columns);
              setColumn(Object.keys(columns[0]));
            } else {
              console.log("Invalid response format: Missing Column Data");
              setMemoColumnData([]);
            }
          } else {
            console.log("Invalid response format: Missing Heading Data");
            setMemoHeadingData(null);
            setMemoColumnData([]);
          }
        } else {
          console.log(response.message || "Failed to fetch memo data");
          setMemoHeadingData(null);
          setMemoColumnData([]);
        }
      } catch (err) {
        console.error("Error while fetching memo data:", err);
        setMemoHeadingData(null);
        setMemoColumnData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemoSingleData();
  }, [id, format, reload]);

  const handlePrint = () => {
    const printContent = document.getElementById("pdf-content");
    const printButton = document.getElementById("print-button");

    if (printContent) {
      // Hide the print button before printing
      if (printButton) printButton.style.display = "none";

      const printWindow = window.open("", "", "width=900,height=600");
      if (printWindow) {
        // Manually interpolate invoiceData values into the HTML template
        // const columns = invoiceData
        //   ? Object.keys(invoiceData.total_column[0])
        //   : [];

        const customerName = memoHeadingData?.customer;
        const customerAddress = memoHeadingData?.address;
        const date = memoHeadingData?.date;
        const challanNo = memoHeadingData?.memo_id;
        const grandTotal = memoHeadingData?.total_amount;
        const totalColumnHtml = memoColumnData
          .map((item) => {
            const challanContent =
              format === "format1"
                ? item.challan
                    ?.map(
                      (product, i) =>
                        `${product}${
                          item.challan && i < item.challan.length - 1
                            ? ", "
                            : ""
                        }`
                    )
                    .join("")
                : item.date
                ? item.date
                : "";

            return `
            <div class="table-body border-b flex justify-between px-8 py-1 text-sm gap-5">
              <div class="w-[5rem] break-words cursor-auto">
                ${format === "format1" ? item.slno : item.challanid}
              </div>
              <div class="flex-1 break-words cursor-auto">
                ${item.products}
              </div>
               <div class="flex-1 break-words cursor-auto">
               ${challanContent}
             </div>
              <div class="flex-1 break-words cursor-auto">
                ${item.quantity}
              </div>
              <div class="flex-1 break-words cursor-auto">
                ${formatNumberWithCommas(item.rate)}/=
              </div>
            
              <div class="flex-1 break-words cursor-auto">
                ${formatNumberWithCommas(item.amount)}/=
              </div>

            </div>
          `;
          })
          .join("");

        printWindow.document.write(`
          <html>
  <head>
    <title>Invoice</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      /* Styles go here */
      .break-words {
        overflow-wrap: break-word; /* Ensures text breaks within container */
        word-wrap: break-word; /* Provides similar behavior */
        white-space: normal; /* Allows text to wrap to new lines */
        word-break: break-word; /* Breaks long words as needed */
      }
      @media print {
        .print-button {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="invoice-content flex flex-col items-center justify-center mt-2">
      <div class="bg-white w-[100%]">
        <div class="text-center pt-4 pb-3">
          <h1 class="text-4xl mb-1 font-semibold">Next Fashion Textile</h1>
          <p class="text-base mb-1 text-[#5c5f63] font-medium">
            Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
            mustafatex@gmail.com
          </p>
          <div class="border-b border-gray-400"></div>
        </div>

        <div class="flex justify-between px-4">
          <div class="text-gray-900">
            <p class="tracking-wide font-bold text-lg capitalize">
              ${customerName}
            </p>
            <p class="text-base font-medium capitalize ">
              ${customerAddress}
            </p>
          </div>
          <div class="text-base">
            <p>Date: <span class="bold font-semibold text-gray-950">${date}</span></p>
            <p>Memo No: <span class="bold font-semibold text-gray-950">${challanNo}</span></p>
          </div>
        </div>

        <div class="table w-full mt-4">
          <div class="flex text-white px-8 py-2 rounded-t-lg text-base bg-[#2dac5c] w-full justify-between font-bold gap-5 capitalize">
            <p class="w-[5rem] break-words ${
              format === "format2" && "hidden"
            }">slno</p>
            
            <p class="w-[5rem] break-words ${
              format === "format1" && "hidden"
            }">challan id</p>

            

            <p class="flex-1 break-words">Products</p>
            <p class="flex-1 break-words ${
              format === "format1" ? "" : "hidden"
            }">
              Challan
            </p>
             <p class="flex-1 break-words ${
               format === "format2" ? "" : "hidden"
             }">
              Date
            </p>
            <p class="flex-1 break-words">Quantity</p>
            <p class="flex-1 break-words">Rate</p>
        
            <p class="flex-1 break-words">Amount</p>
          </div>

          ${totalColumnHtml}

          <div class="px-8 flex border-b justify-between py-2 gap-5">
            <div class="w-1/12 font-bold text-gray-900 text-base">Total</div>
            <div class="flex-1"></div>
            <div class="flex-1"></div>
            <div class="flex-1"></div>
            <div class="flex-1"></div>
            <div class="flex-1 font-bold text-gray-900 text-base">${formatNumberWithCommas(
              grandTotal
            )}/=</div>
          </div>

          <div class="mt-20 text-right pr-4">
            <div class="inline-block text-center">
              <div class="border-t-2 border-gray-900 w-48"></div> <!-- Signature line -->
              <p class="mt-1 text-sm font-semibold text-gray-900">Authorized Signature</p>
            </div>
          </div>

          <div>
            <div class="bg-[#2dac5c] text-white text-center py-8 mt-8 rounded-xl">
              <h2 class="text-2xl font-bold">Thank You!</h2>
              <p class="mt-2 text-lg">
                Your business means the world to us!
              </p>
              <p class="mt-2 text-base">
                We appreciate your trust and look forward to serving you again.
              </p>
            </div>

            <div class="text-gray-600 py-4 text-center text-sm">
              <p class="">
                For any inquiries, please contact us at |
                <span class="font-semibold tracking-wide">
                  marufsarkar512@gmail.com
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="print-button" id="print-button">
          <button onClick="window.print()">Print Invoice</button>
        </div>
      </div>
    </div>
  </body>
</html>

        `);

        printWindow.document.close();
        printWindow.print();

        // Show the print button again after printing
        if (printButton) printButton.style.display = "block";
      }
    }
  };

  return (
    <div className="flex justify-center text-primary-foreground   ">
      <div
        className="relative bg-secondary w-[98%] xl:w-[90%] h-fit px-3 xl:px-10 pb-10 rounded-xl table-wrapper mb-10"
        id="pdf-content"
      >
        <div
          className="absolute w-fit top-4 xl:top-8 left-4 xl:left-8 text-base xl:text-2xl text-primary-foreground px-4 py-1 rounded-md hover:bg-secondary-foreground duration-200"
          onClick={() => path.back()}
        >
          <FaArrowLeftLong />
        </div>

        <div className="absolute top-4 xl:top-8 right-4 xl:right-8 flex gap-3 1080p:text-xl 720p:text-base text-xs rounded-full bg-secondary-foreground font-semibold ">
          <div
            className={`${
              format === "format1" && "bg-primary text-background rounded-full"
            } px-5 py-1`}
            onClick={() => setFormat("format1")}
          >
            Format-1
          </div>
          <div
            className={`${
              format === "format2" && "bg-primary text-background rounded-full"
            } px-5 py-1`}
            onClick={() => setFormat("format2")}
          >
            Format-2
          </div>
        </div>

        <div className="header text-center pb-5 pt-4 mt-5">
          <h1 className="text-2xl xl:text-4xl font-semibold text-primary">
            Next Fashion Textile
          </h1>
          <p className="text-sm xl:text-lg mb-3">
            Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
            mustafatex@gmail.com
          </p>
          <div className="border border-border_color"></div>
        </div>

        {isLoading && (
          // <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
          //   Loading...
          // </div>
          <SingleViewSkeletonLoader />
        )}

        {!isLoading &&
          (memoColumnData.length === 0 || memoHeadingData === null) && (
            <div className="text-primary-foreground tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
              <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
                There is no memos available
              </div>
            </div>
          )}

        {!isLoading &&
          memoHeadingData !== null &&
          memoColumnData.length > 0 && (
            <>
              <div className="hidden xl:block">
                <div className="customer-info flex justify-between px-4">
                  <div className="left">
                    <p className="customer-name tracking-wider font-bold text-base xl:text-xl capitalize text-primary">
                      {memoHeadingData?.customer}
                    </p>
                    <p className="address text-sm xl:text-lg font-normal">
                      {memoHeadingData?.address}
                    </p>
                  </div>
                  <div className="right text-base xl:text-xl">
                    <p>
                      Date:{" "}
                      <span className="bold font-semibold text-primary">
                        {memoHeadingData?.date}
                      </span>
                    </p>
                    <p>
                      Memo No:{" "}
                      <span className="bold font-semibold text-primary">
                        {memoHeadingData?.memo_id}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="xl:hidden ">
                <div className="px-2 flex flex-col gap-4">
                  <div className="left text-center">
                    <p className="customer-name tracking-wider font-bold text-base xl:text-xl capitalize text-primary">
                      {memoHeadingData?.customer}
                    </p>
                    <p className="address text-sm xl:text-lg font-medium">
                      {memoHeadingData?.address}
                    </p>
                  </div>
                  <div className="right text-sm xl:text-xl flex justify-between">
                    <p>
                      Date:{" "}
                      <span className="bold font-semibold text-primary">
                        {memoHeadingData?.date}
                      </span>
                    </p>
                    <p>
                      Challan No:{" "}
                      <span className="bold font-semibold text-primary">
                        {memoHeadingData?.memo_id}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="w-[41rem] xl:w-full mt-4">
                  <div className="table-header py-3">
                    {column &&
                      column.map((col, i) => (
                        <p
                          key={i}
                          className={` ${
                            (i === 0 || i === column.length - 1) &&
                            "w-1/12 xl:w-1/12"
                          }  ${
                            i !== 0 && i !== column.length - 1 && "flex-1"
                          } break-words`}
                        >
                          {col}
                        </p>
                      ))}
                  </div>

                  <div>
                    {memoColumnData?.map((item, i) => (
                      <div key={i} className="table-col py-2">
                        <div className="w-1/12 xl:w-1/12 break-words cursor-auto">
                          {format === "format1" ? item.slno : item.challanid}
                        </div>
                        <div className="flex-1 break-words cursor-auto">
                          {item.products}
                        </div>
                        <div className="flex-1 ">
                          {format === "format1" ? (
                            <div className="flex gap-1 break-words cursor-auto">
                              {item.challan?.map((challanNumber, i) => (
                                <p key={i}>
                                  {challanNumber}
                                  {item.challan &&
                                    i < item.challan.length - 1 &&
                                    ", "}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <div>{item.date}</div>
                          )}
                        </div>
                        <div className="flex-1 break-words cursor-auto">
                          {item.quantity}
                        </div>
                        <div className="flex-1 break-words cursor-auto">
                          {formatNumberWithCommas(item.rate)}
                          <span className="xl:text-sm text-[8px]"> TK</span>
                        </div>
                        <div className="w-1/12 break-words cursor-auto">
                          {formatNumberWithCommas(item.amount)}
                          <span className="xl:text-sm text-[8px]"> TK</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 xl:px-6 flex border-b border-border_color justify-between py-2 xl:py-3 text-sm xl:text-xl">
                    <div className="w-1/12 font-bold text-primary">Total</div>
                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                    <div className="w-1/12 font-bold text-primary">
                      {formatNumberWithCommas(memoHeadingData?.total_amount)}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="w-full mt-10 xl:space-x-4 space-y-2"
                id="print-button"
              >
                <button
                  onClick={handlePrint}
                  className="border border-border_color w-full xl:w-fit text-primary-foreground hover:bg-primary hover:text-background duration-200 font-semibold px-8 py-1 rounded-full text-lg"
                >
                  Print Invoice
                </button>
                <button
                  onClick={() => setIsDiscountModal(true)}
                  className="border border-border_color w-full xl:w-fit text-primary-foreground hover:bg-primary hover:text-background duration-200 font-semibold px-8 py-1 rounded-full text-lg"
                >
                  Add Discount{" "}
                </button>
              </div>
            </>
          )}
      </div>
      {isDiscountModal && (
        <DiscountModal
          isModalOpen={setIsDiscountModal}
          discountData={{
            total: memoHeadingData?.total_amount,
            total_after_discount: memoHeadingData?.total_after_discount,
          }}
          setReload={setReload}
        />
      )}
    </div>
  );
};

export default MemoSingleView;
