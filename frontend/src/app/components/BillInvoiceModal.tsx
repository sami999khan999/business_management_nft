import { InvoiceType } from "@/types";
import { getInvoice } from "@/utils/invoiceApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { IoCloseSharp } from "react-icons/io5";
import Pagination from "./Pagination";

const BillInvoiceModal = ({
  setInoviceId,
  invoiceId,
  setIsInvoiceModalOpen,
}: {
  setInoviceId: React.Dispatch<SetStateAction<number[] | undefined>>;
  invoiceId: number[] | undefined;
  setIsInvoiceModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceType[]>([]);
  const [invoiceCurrentPage, setInvoiceCurrentPage] = useState(1);
  const [invoiceTotalPage, setInvoiceTotalPage] = useState<
    number | undefined
  >();

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const response = await getInvoice(invoiceCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPage = firstElement.total_page;

        setInvoiceData(response.data);
        setInvoiceTotalPage(totalPage);
      }
    };

    fetchInvoiceData();
  }, [setIsInvoiceModalOpen, invoiceCurrentPage]);

  return (
    <div className="absolute top-0 left-0 h-full w-full backdrop-blur-lg flex items-center justify-center z-50">
      <div className="relative border border-border_color rounded-xl bg-secondary w-[95%] xl:w-[60%] px-2 xl:px-6 ">
        <div
          className="close-btn"
          onClick={() => {
            setIsInvoiceModalOpen((prv) => !prv);
            if (invoiceId) {
              setInoviceId(invoiceId?.length === 0 ? undefined : invoiceId);
            }
          }}
        >
          <IoCloseSharp className="transition-transform hover:rotate-90 duration-200 origin-center" />
        </div>

        <div>
          <p className="xl:text-3xl text-2xl text-primary font-semibold text-center py-6 font-sour_gummy">
            Select Inovice
          </p>
        </div>

        <div className="xl:mb-8">
          <div className="xl:h-[20rem] h-[14rem] overflow-y-auto remove-scrollbar">
            <div className="table-header py-4 xl:text-xl">
              <p className="w-1/12 xl:w-2/12">ID</p>
              <p className="flex-1 truncate-text">Products</p>

              <p className="flex-1 truncate-text">Status</p>
              <p className="flex-1">Date</p>
              <p className="">Select</p>
            </div>

            {/* Table Body */}
            <div>
              {invoiceData.map((item, i) => (
                <div key={i}>
                  <div className="table-col py-3">
                    <div className="w-1/12 xl:w-2/12 truncate-text">
                      {item.id}
                    </div>

                    <div className="flex-1 truncate-text">{item.total}</div>
                    <div className="flex-1 truncate-text">
                      {item.current_status}
                    </div>
                    <div className="flex-1 truncate-text">{item.date}</div>
                    <div
                      className="flex items-center justify-center xl:px-5 px-4"
                      onClick={() => {
                        if (invoiceId?.includes(item.id)) {
                          setInoviceId((prv) =>
                            prv?.filter((ele) => ele !== item.id)
                          );
                        } else {
                          setInoviceId((prv) =>
                            prv ? [...prv, item.id] : [item.id]
                          );
                        }
                      }}
                    >
                      {invoiceId?.includes(item.id) ? (
                        <ImCheckboxChecked />
                      ) : (
                        <ImCheckboxUnchecked />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Pagination
              totalPage={invoiceTotalPage}
              currentPage={invoiceCurrentPage}
              setCurrentPage={setInvoiceCurrentPage}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center mb-8 ">
          <button
            className="submit-btn "
            onClick={() => setIsInvoiceModalOpen(false)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillInvoiceModal;
