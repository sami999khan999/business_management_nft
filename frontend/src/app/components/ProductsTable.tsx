"use client";

import { ProductType } from "@/types";
import { logo } from "@/utils/logo";
import { formatNumberWithCommas } from "@/utils/numberFormat";
import { getProducts } from "@/utils/productApiRequests";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import Pagination from "./Pagination";
import ProductModal from "./ProductModal";
import TableActions from "./TableActions";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

const ProductsTable = () => {
  const param = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    "create" | "update" | "delete" | undefined
  >();
  const [activeId, setActiveId] = useState<number | undefined | string>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = products.length > 0 ? Object.keys(products[0]) : [];

  const activeProduct = products.find((porduct) => porduct.id === activeId);

  useEffect(() => {
    const productsGet = async () => {
      setIsLoading(true);

      try {
        const response = await getProducts(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement?.total_page !== null) {
            setTotalPage(firstElement.total_page);
            setProducts(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setProducts([]);
          }
        } else {
          console.error("Error Fetching Products:", response.message);
          setTotalPage(undefined);
          setProducts([]);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Products:", err);
        setTotalPage(undefined);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    productsGet();
  }, [reload, currentPage]);

  return (
    <div>
      {isModalOpen && (
        <ProductModal
          modalAction={modalAction}
          activeProduct={activeProduct}
          setIsModalOpen={setIsModalOpen}
          setReload={setReload}
          reload={reload}
        />
      )}

      <div className="table-wrapper">
        <TableActions
          setIsOpen={setIsModalOpen}
          tableName="Products"
          setModalAction={setModalAction}
          logo={logo.Products}
        />

        {isLoading && (
          // <div className="text-primary-foreground tracking-wide text-xl xl:text-4xl text-center font-semibold flex items-center justify-center">
          //   Loading...
          // </div>
          <LoadingSkeleton />
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer ">
              There are no memos available
            </div>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <div className="overflow-x-auto">
            <div className="w-[40rem] xl:w-full">
              <div className="table-header">
                {columns.map((cols, i) => (
                  <div
                    key={i}
                    className={`truncate-text ${
                      i === 0 &&
                      "w-1/12                                                      "
                    } ${i === columns.length - 1 && "w-1/12"} ${
                      i !== 0 && i !== columns.length - 1 && "flex-1"
                    } `}
                  >
                    {cols}
                  </div>
                ))}
                <div className="w-[5rem]">Actions</div>
              </div>
              <div>
                {products.map((product, i) => (
                  <div key={i} className={`table-col capitalize`}>
                    <div className="w-1/12 truncate-text">{product.id}</div>
                    <div className="flex-1 truncate-text">{product.name}</div>
                    <div className="flex-1 truncate-text">
                      {product.category}
                    </div>
                    <div className="flex-1 truncate-text">
                      {formatNumberWithCommas(product.rate)}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                    <div className="flex-1 truncate-text">
                      {formatNumberWithCommas(product.production_cost)}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                    <div className="w-1/12 truncate-text">
                      {product.other_cost === 0
                        ? 0
                        : formatNumberWithCommas(product.other_cost)}
                      <span className="xl:text-sm text-[8px]"> TK</span>
                    </div>
                    <div className="w-[5rem] flex items-center justify-center gap-2 text-primary-foreground">
                      <div
                        className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                        onClick={() => {
                          setActiveId(product.id);
                          setModalAction("update");
                          setIsModalOpen(true);
                        }}
                      >
                        <MdOutlineEdit />
                      </div>
                      <div
                        className="hover:bg-primary p-1 rounded-md hover:text-gray-200 duration-200"
                        onClick={() => {
                          setActiveId(product.id);
                          setModalAction("delete");
                          setIsModalOpen(true);
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

export default ProductsTable;
