"use client";

import { DeleteDataType, InvoiceType } from "@/types";
import { deleteInvoice, getInvoice } from "@/utils/invoiceApiRequests";
import { logo } from "@/utils/logo";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteTimerModal from "./DeleteTimerModal";
import InvoiceModal from "./InvoiceModal";
import LoadingSkeleton from "./LoadingSkeleton";
import Pagination from "./Pagination";
import TableActions from "./TableActions";
import { ErrorToast, SuccessToast } from "./Toast";

const InvoiceTable = () => {
  const path = useRouter();
  const param = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(1);
  const [invoice, setInvoice] = useState<InvoiceType[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeElement, setActiveElement] = useState<
    DeleteDataType | undefined
  >();

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [deleteRelatedData, setDeleteRelatedData] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      setIsLoading(true);

      try {
        const response = await getInvoice(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250)); // Simulate a delay

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPage(firstElement.total_page);
            setInvoice(response.data.slice(1)); // Skip the first element
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setInvoice([]);
          }
        } else {
          console.error("Error Fetching Invoice:", response.message);
          setTotalPage(undefined);
          setInvoice([]);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Invoice:", err);
        setTotalPage(undefined);
        setInvoice([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [currentPage, reload]);

  const deleteHandler = async () => {
    try {
      setDeleteIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 250));
      const id = activeElement?.id;
      const response = await deleteInvoice({
        id: id,
        deleteRelatedData: deleteRelatedData,
      });

      if (response.success) {
        setReload(true);
        setIsDeleteModalOpen(false);
        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Invoice Deleted Successfully!
          </SuccessToast>
        ));
      } else {
        console.log("Error While Deleting Invoice: ", response.message);
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>Can Not Deleted Invoice!</ErrorToast>
        ));
      }
    } catch (err) {
      console.log("Unexpected Error While Deleting Invoice: ", err);
      toast.custom((t) => (
        <ErrorToast visible={t.visible}>Can Not Deleted Invoice!</ErrorToast>
      ));
    } finally {
      setDeleteIsLoading(false);
    }
  };

  return (
    <div>
      {isOpen && <InvoiceModal setIsOpen={setIsOpen} />}

      {isDeleteModalOpen && (
        <DeleteTimerModal
          element={activeElement}
          setDeleteRelatedData={setDeleteRelatedData}
          deleteRelatedData={deleteRelatedData}
          deleteHandler={deleteHandler}
          setIsOpen={setIsDeleteModalOpen}
          isLoading={deleteIsLoading}
          title="Invoice"
          checkBoxMessage="Would you like to delete any releted Data?"
        />
      )}

      <div className="table-wrapper">
        <TableActions
          tableName="Invoice"
          setIsOpen={setIsOpen}
          logo={logo.Invoice}
        />

        {isLoading && <LoadingSkeleton />}

        {!isLoading && invoice.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer">
              There are no invoice data available
            </div>
          </div>
        )}

        {!isLoading && invoice.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[45rem] xl:w-full">
              {/* Table Header */}
              <div className="table-header">
                <p className="w-1/12">ID</p>
                <p className="flex-1 truncate-text">Customer</p>
                <p className="flex-1 truncate-text">Products</p>
                <p className="flex-1 truncate-text">Quantity</p>
                <p className="flex-1 truncate-text">Total</p>
                <p className="flex-1 truncate-text">Status</p>
                <p className="flex-1 truncate-text">Date</p>
                <p className="w-[4rem] truncate-text flex justify-center">
                  Delete
                </p>
              </div>

              {/* Table Rows */}
              <div>
                {invoice.map((item, i) => (
                  <div
                    key={i}
                    className="table-col capitalize"
                    onClick={() => {
                      path.push(`/invoice/${item.id}`);
                    }}
                  >
                    <div className="w-1/12 truncate-text">{item.id}</div>
                    <div className="flex-1 truncate-text">
                      {item.customer.name} ({item.customer.id})
                    </div>
                    <div className="flex-1 truncate-text">{item.products}</div>
                    <div className="flex-1 truncate-text">{item.quantity}</div>
                    <div className="flex-1 truncate-text">{item.total}</div>
                    <div className="flex-1 truncate-text">
                      {item.current_status}
                    </div>
                    <div className="flex-1 truncate-text">{item.date}</div>
                    <div
                      className="w-[4rem] flex items-center justify-center text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div
                        className="w-full flex items-center justify-center hover:bg-primary hover:text-background p-1 rounded-sm duration-200"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setActiveElement({
                            id: item.id,
                            customer: item.customer.name,
                            products: item.products,
                            current_status: item.current_status,
                            date: item.date,
                          });
                        }}
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <Pagination
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
