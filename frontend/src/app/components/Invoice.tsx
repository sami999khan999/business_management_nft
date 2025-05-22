"use client";

import { InvoiceDataType } from "@/types";
import { getSingleInvoice } from "@/utils/invoiceApiRequests";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import SingleViewSkeletonLoader from "./SingleViewSkeletonLoader";

const Invoice = ({ id }: { id: number }) => {
  const path = useRouter();
  const [invoiceData, setInvoiceData] = useState<InvoiceDataType | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const columns = invoiceData ? Object.keys(invoiceData.total_column[0]) : [];

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 250));

        const response = await getSingleInvoice(id);

        if (response.success) {
          const data = response.data;

          if (data) {
            setInvoiceData(data);
          } else {
            console.log("Invalid response format: Missing Invoice Data");
            setInvoiceData(undefined);
          }
        } else {
          console.log("Error Fetching Invoice:", response.message);
          setInvoiceData(undefined);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Invoice: ", err);
        setInvoiceData(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoiceData();
  }, [id]);

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

        const customerName =
          invoiceData?.customer_company || invoiceData?.customer_name;
        const customerAddress = invoiceData?.customer_address;
        const date = invoiceData?.date;
        const challanNo = invoiceData?.challan_no;
        const grandTotal = invoiceData?.grand_total;
        const totalColumnHtml = invoiceData?.total_column
          .map(
            (item) => `
          <div class="table-body border-b flex justify-between px-8 py-1 text-sm gap-5">
            <div class="w-2/12 break-words capitalize">${item.employee}</div>
            <div class="w-3/12 break-words capitalize">${item.product}</div>
            <div class="flex-1 break-words ">${item.quantity}</div>
            <div class="w-2/12 break-words ">${item.total}</div>
          </div>
        `
          )
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
              <div class=" bg-white w-[95%]">
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
                    <p>Challan No: <span class="bold font-semibold text-gray-950">${challanNo}</span></p>
                  </div>
                </div>
  
                <div class="table w-full mt-4">
                  <div class="flex text-white px-8 py-2 rounded-t-lg text-base bg-[#2dac5c] w-full justify-between font-bold gap-5">
                    <p class="w-2/12 break-words">Employee</p>
                    <p class="w-3/12 break-words">Product</p>
                    <p class="flex-1 break-words">Rolls (yds)</p>
                    <p class="w-2/12 break-words">Total (yds)</p>
                  </div>
  
                  ${totalColumnHtml}
  
                  <div class="px-8 flex border-b justify-between py-2">
                    <div class="w-2/12 font-bold text-gray-900 text-lg">Total</div>
                    <div class="w-3/12"></div>
                    <div class="flex-1"></div>
                    <div class="w-2/12 font-bold text-gray-900 text-lg">${grandTotal}</div>
                  </div>
                </div>

                <div class="mt-20 text-right pr-4">
        <div class="inline-block text-center">
            <div class="border-t-2 border-gray-900 w-48"></div> <!-- Signature line -->
            <p class="mt-1 text-sm font-semibold text-gray-900">Authorized Signature</p>
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

  console.log(invoiceData?.grand_total);

  return (
    <div className="flex justify-center text-primary-foreground">
      <div
        className="relative bg-secondary w-[98%] xl:w-[90%] h-fit px-3 xl:px-10 pb-10 rounded-xl table-wrapper"
        id="pdf-content"
      >
        <div
          className="absolute top-4 xl:top-8 left-4 xl:left-8 text-base xl:text-2xl text-primary-foreground px-4 py-1 rounded-md dark:hover:bg-secondary-foreground duration-200 hover:bg-gray-100"
          onClick={() => path.back()}
        >
          <FaArrowLeftLong />
        </div>
        <div className="header text-center xl:pb-10 pb-4 pt-4">
          <h1 className="text-2xl xl:text-4xl font-semibold text-primary">
            Next Fashion Textile
          </h1>
          <p className="text-sm xl:text-lg mb-3">
            Garashin, Karatia, Tangail-Sadar call: 01711959527 Mail:
            mustafatex@gmail.com
          </p>
          <div className="border-b border-border_color"></div>
        </div>

        {isLoading && (
          // <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
          //   Loading...
          // </div>
          <SingleViewSkeletonLoader />
        )}

        {!isLoading && invoiceData === undefined && (
          <div className="text-primary-foreground tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
              There is no memos available
            </div>
          </div>
        )}

        {!isLoading && invoiceData !== undefined && (
          <div>
            <div className="hidden xl:block">
              <div className="customer-info flex justify-between px-4 ">
                <div className="left">
                  <p className="customer-name tracking-wider font-bold text-base xl:text-xl capitalize text-primary">
                    {invoiceData?.customer_company
                      ? invoiceData?.customer_company
                      : invoiceData?.customer_name}
                  </p>
                  <p className="address text-sm xl:text-lg font-normal">
                    {invoiceData?.customer_address}
                  </p>
                </div>
                <div className="right text-base xl:text-xl">
                  <p>
                    Date:{" "}
                    <span className="bold font-semibold text-primary">
                      {invoiceData?.date}
                    </span>
                  </p>
                  <p>
                    Challan No:{" "}
                    <span className="bold font-semibold text-primary">
                      {invoiceData?.challan_no}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="xl:hidden ">
              <div className="px-2 flex flex-col gap-4">
                <div className="left text-center">
                  <p className="customer-name tracking-wider font-bold text-base xl:text-xl capitalize text-primary">
                    {invoiceData?.customer_company
                      ? invoiceData?.customer_company
                      : invoiceData?.customer_name}
                  </p>
                  <p className="address text-sm xl:text-lg font-medium">
                    {invoiceData?.customer_address}
                  </p>
                </div>
                <div className="right text-sm xl:text-xl flex justify-between">
                  <p>
                    Date:{" "}
                    <span className="bold font-semibold text-primary">
                      {invoiceData?.date}
                    </span>
                  </p>
                  <p>
                    Challan No:{" "}
                    <span className="bold font-semibold text-primary">
                      {invoiceData?.challan_no}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="table w-[30rem] xl:w-full xl:mt-2">
                <div className="table-header py-3">
                  {columns.map((col, i) => (
                    <p
                      key={i}
                      className={`${i === 0 && "w-3/12 xl:w-2/12"} ${
                        i === 1 && "w-3/12"
                      } ${i === 2 && "flex-1"} ${
                        i === 3 && "w-2/12"
                      } break-words`}
                    >
                      {col}
                    </p>
                  ))}
                </div>

                <div>
                  {invoiceData?.total_column.map((item, i) => (
                    <div key={i} className="table-col py-2">
                      <div className="w-3/12 xl:w-2/12 break-words cursor-auto">
                        {item.employee}
                      </div>
                      <div className="w-3/12 break-words cursor-auto">
                        {item.product}
                      </div>
                      <div className="flex-1 break-words cursor-auto">
                        {item.quantity}
                      </div>
                      <div className="w-2/12 break-words cursor-auto">
                        {item.total}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="table-col py-3 text-base xl:text-xl">
                  <div className="w-3/12 font-bold text-primary">Total</div>
                  <div className="w-3/12"></div>
                  <div className="flex-1"></div>
                  <div className="w-2/12 font-bold text-primary">
                    {invoiceData?.grand_total}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-10" id="print-button">
              <button
                onClick={handlePrint}
                className="border border-border_color w-full xl:w-fit hover:bg-primary hover:text-background duration-200 font-medium tracking-wide px-8 py-1 rounded-full text-lg text-primary"
              >
                Print Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
