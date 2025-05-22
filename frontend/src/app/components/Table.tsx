import { CustomerType, EmployeeType } from "@/types";
import { deleteCustomer } from "@/utils/customerApiRerquest";
import { deleteEmployee } from "@/utils/employeeApiRequest";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AddFormModal from "./AddFormModal";
import DeleteModal from "./DeleteModal";
import { ErrorToast, SuccessToast } from "./Toast";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// type TableDataType = EmployeeType | CustomerType;

const Table = ({
  tableData,
  columns,
  format,
  setReload,
}: {
  tableData: EmployeeType[] | CustomerType[];
  columns: string[];
  format: string;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeId, setActiveId] = useState<number | undefined>();
  const [modalAction, setModalAction] = useState<"update" | "delete" | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  // const handleActionClick = (id: number) => {
  //   setActiveId(activeId === id ? null : id);
  // };

  // const openModal = (action: "update" | "delete", id: number) => {
  //   setModalAction(action);
  //   setActiveId(id);
  // };

  const closeModal = () => {
    setModalAction(null);
    setActiveId(undefined);
  };

  const deleteHandler = async () => {
    if (path === "/employees") {
      const response = await deleteEmployee(activeId);
      console.log(activeId);

      if (response.success) {
        if (closeModal) {
          closeModal();
        }
        setReload((prv) => !prv);

        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Employee Deleted Successfully!
          </SuccessToast>
        ));
      } else {
        console.log(response.message);

        toast.custom((t) => (
          <ErrorToast visible={t.visible}>
            Failed To Delete Employee!
          </ErrorToast>
        ));
      }
    }

    if (path === "/customers") {
      const response = await deleteCustomer(activeId);
      console.log(response);

      if (response.success) {
        if (closeModal) {
          closeModal();
        }
        setReload((prv) => !prv);

        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Customer Deleted Successfully!
          </SuccessToast>
        ));
      } else {
        console.log(response.message);

        toast.custom((t) => (
          <ErrorToast visible={t.visible}>
            Failed To Delete Customer!
          </ErrorToast>
        ));
      }
    }
  };

  const activeElement = tableData.find((item) => item.id === activeId);
  const activeElementData = {
    id: activeElement?.id,
    name: activeElement?.name,
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-[35rem] xl:w-full">
        <div className="table-header">
          {columns.map((col, i) => {
            return (
              <p
                key={i}
                className={`${
                  i === 0 &&
                  "w-1/12                                                      "
                } ${i === columns.length - 1 && "w-1/12"} ${
                  i !== 0 && i !== columns.length - 1 && "flex-1"
                } cursor-pointer truncate-text`}
              >
                {col}
              </p>
            );
          })}
          <p className="cursor-pointer xl:w-[6rem] w-[3rem]">Action</p>
        </div>
        <div>
          {tableData?.map((data, i) => (
            <div key={i} className="table-col capitalize">
              {format === "Employee" ? (
                <>
                  <div className="w-1/12 text-xs xl:text-xl">
                    {(data as EmployeeType).id}
                  </div>
                  <div className="flex-1 truncate-text text-xs xl:text-xl">
                    {(data as EmployeeType).name}
                  </div>
                  <div className="flex-1 truncate-text text-xs xl:text-xl">
                    {(data as EmployeeType).address}
                  </div>
                  <div className="flex-1 truncate-text text-xs xl:text-xl">
                    {(data as EmployeeType).nid_no}
                  </div>
                  <div className="w-1/12 truncate-text text-xs xl:text-xl">
                    {(data as EmployeeType).mobile}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-1/12 text-xs xl:text-xl">
                    {(data as CustomerType).id}
                  </div>
                  <div className="flex-1 truncate-text text-xs xl:text-xl">
                    {(data as CustomerType).name}
                  </div>
                  <div className="flex-1 truncate-text text-xs xl:text-xl">
                    {(data as CustomerType).company_name === ""
                      ? "NONE"
                      : (data as CustomerType).company_name}
                  </div>
                  <div className="flex-1 truncate-text text-xs xl:text-xl">
                    {(data as CustomerType).address}
                  </div>
                  <div className="w-1/12 truncate-text text-xs xl:text-xl">
                    {(data as CustomerType).mobile}
                  </div>
                </>
              )}

              <div className="flex xl:w-[6rem] w-[3rem] justify-center items-center gap-1 xl:gap-2 text-primary-foreground">
                <div
                  className="hover:bg-primary p-1 rounded-md hover:text-background duration-200 flex items-center justify-center"
                  onClick={() => {
                    setActiveId(data.id);
                    setModalAction("update");
                  }}
                >
                  <MdOutlineEdit />
                </div>
                <div
                  className="hover:bg-primary p-1 rounded-md hover:text-background duration-200 flex items-center justify-center"
                  onClick={() => {
                    setActiveId(data.id);
                    setModalAction("delete");
                    setIsOpen(true);
                  }}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          ))}
        </div>
        {modalAction === "delete" && isOpen && (
          <DeleteModal
            activeElement={activeElementData}
            handler={deleteHandler}
            setIsOpen={setIsOpen}
            title={format}
          />
        )}
        {modalAction === "update" && (
          <AddFormModal
            title="Update Employee"
            closeModal={closeModal}
            // setData={setData}
            action={`update${format}`}
            // data={tableData}
            currentData={
              activeId != null
                ? tableData.find((emp) => emp.id === activeId)
                : undefined
            }
            setReload={setReload}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
