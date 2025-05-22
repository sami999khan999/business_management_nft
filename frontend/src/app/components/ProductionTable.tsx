"use client";

import { PorductionType } from "@/types";
import { logo } from "@/utils/logo";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { deleteProduction, getProduction } from "@/utils/productionApiRequests";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import LoadingSkeleton from "./LoadingSkeleton";
import Pagination from "./Pagination";
import ProductionModal from "./ProductionModal";
import TableActions from "./TableActions";
import DeleteModal from "./DeleteModal";
import { ErrorToast, SuccessToast } from "./Toast";
import toast from "react-hot-toast";

const ProductionTable = () => {
  const param = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [defalutValue, setDefalutValue] = useState<
    PorductionType | undefined
  >();
  const [reload, setReload] = useState(false);
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete"
  >();
  const [production, setProduction] = useState<PorductionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeElement, setActiveElement] = useState<{
    id: number | undefined;
    name: string | undefined;
  }>();
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const columns = production?.length > 0 ? Object.keys(production[0]) : [];

  useEffect(() => {
    const productions = async () => {
      setIsLoading(true);

      try {
        const response = await getProduction(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPage(firstElement.total_page);
            setProduction(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setProduction([]);
          }
        } else {
          console.error("Error Fetching Production:", response.message);
          setTotalPage(undefined);
          setProduction([]);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Production:", err);
        setTotalPage(undefined);
        setProduction([]);
      } finally {
        setIsLoading(false);
      }
    };

    productions();
  }, [currentPage, reload]);

  const deleteHandler = async () => {
    try {
      setDeleteIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 250));
      const id = activeElement?.id;

      const response = await deleteProduction(id);

      if (response.success) {
        setReload(true);
        setIsDeleteModalOpen(false);
        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Production Deleted Successfully!
          </SuccessToast>
        ));
      } else {
        console.log("Error While Deleting Invoice: ", response.message);
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>
            Can Not Deleted Production!
          </ErrorToast>
        ));
      }
    } catch (err) {
      console.log("Unexpected Error While Deleting Invoice: ", err);
      toast.custom((t) => (
        <ErrorToast visible={t.visible}>Can Not Deleted Production!</ErrorToast>
      ));
    } finally {
      setDeleteIsLoading(false);
    }
  };

  console.log(production);

  return (
    <div>
      {isOpen && (
        <ProductionModal
          setIsOpen={setIsOpen}
          defalutValue={defalutValue}
          setDefalutValue={setDefalutValue}
          action={modalAction}
          setReload={setReload}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          activeElement={activeElement}
          handler={deleteHandler}
          setIsOpen={setIsDeleteModalOpen}
          title="Production"
          isLoading={deleteIsLoading}
        />
      )}

      <div className="table-wrapper">
        <TableActions
          tableName="Production"
          setIsOpen={setIsOpen}
          setModalAction={setModalAction}
          logo={logo.Production}
        />

        {isLoading && (
          // <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
          //   Loading...
          // </div>
          <LoadingSkeleton />
        )}

        {!isLoading && production.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
              There are no memos available
            </div>
          </div>
        )}

        {!isLoading && production.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[40rem] xl:w-full">
              <div className="table-header">
                {columns.map((col, i) => (
                  <div
                    key={i}
                    className={`truncate-text ${
                      i === 0 &&
                      "w-1/12                                                      "
                    } ${i === columns.length - 1 && "w-1/12"} ${
                      i !== 0 && i !== columns.length - 1 && "flex-1"
                    } `}
                  >
                    {col}
                  </div>
                ))}
                <div className="w-[4rem]">ACTIONS</div>
              </div>
              <div>
                {production.map((item, i) => (
                  <div key={i} className="table-col capitalize">
                    <div className="w-1/12 truncate-text">{item.id}</div>
                    <div className="flex-1 truncate-text">
                      {item.product.name}
                    </div>
                    <div className="flex-1 truncate-text">
                      {item.employee.name}
                    </div>
                    <div className="flex-1 truncate-text">{item.quantity}</div>
                    <div className="flex-1 truncate-text ">
                      {formatNumberWithCommas(item.rate)}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                    <div className="flex-1 truncate-text">{item.payment}</div>
                    <div className="w-1/12 truncate-text">{item.date}</div>
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
                            name: item.product.name,
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

export default ProductionTable;
