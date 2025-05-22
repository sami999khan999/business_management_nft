"use client";

import { CustomerType, EmployeeType } from "@/types";
import { getCustoer } from "@/utils/customerApiRerquest";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddFormModal from "./AddFormModal";
import Pagination from "./Pagination";
import Table from "./Table";
import TableActions from "./TableActions";
import LoadingSkeleton from "./LoadingSkeleton";
import { logo } from "@/utils/logo";

type TableDataType = EmployeeType | CustomerType;

const CustomerTable = () => {
  const param = useSearchParams();
  const [customer, setcustomer] = useState<TableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(param.get("page")) || 1
  );
  const [totalPage, setTotalPage] = useState<number | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);

  const columns = customer?.length > 0 ? Object.keys(customer[0]) : [];

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);

      try {
        const response = await getCustoer(currentPage);

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (response.success && response.data) {
          const firstElement = response.data[0];
          const totalPages = firstElement ? firstElement.total_page : undefined;

          if (totalPages !== undefined) {
            setTotalPage(totalPages);
            setcustomer(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setTotalPage(undefined);
            setcustomer([]);
          }
        } else {
          console.error(response.message || "Failed to fetch customer");
          setcustomer([]);
          setTotalPage(undefined);
        }
      } catch (error) {
        console.error("Unexpected Error Fetching Customer:", error);
        setcustomer([]);
        setTotalPage(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [currentPage, reload]);

  return (
    <div>
      {isFormOpen && (
        <div className="">
          <div onClick={(e) => e.stopPropagation()}>
            <AddFormModal
              title="Add Customer"
              setIsFormOpen={setIsFormOpen}
              action="addCustomer"
              closeModal={() => {}}
              setReload={setReload}
            />
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <TableActions
          setIsOpen={setIsFormOpen}
          tableName="Customer"
          logo={logo.Customers}
        />

        {isLoading && <LoadingSkeleton />}

        {!isLoading && customer.length === 0 && (
          <div className="text-mutated tracking-wide text-xl xl:text-3xl text-center font-semibold xl:my-[6rem] my-[2rem] flex w-full items-center justify-center">
            <div className="w-fit px-6 py-2 rounded-lg cursor-pointer">
              There are no customer data available
            </div>
          </div>
        )}

        {!isLoading && customer.length > 0 && (
          <Table
            tableData={customer}
            columns={columns}
            format="Customer"
            setReload={setReload}
          />
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

export default CustomerTable;
