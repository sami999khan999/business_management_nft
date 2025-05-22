import { InventoryType, PorductionType, ProductType } from "@/types";
import { createInventory, updateInventory } from "@/utils/inventoryApiRequests";
import { getProduction } from "@/utils/productionApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import Dropdown from "./Dropdown";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { ErrorToast, SuccessToast } from "./Toast";

const InventoryModal = ({
  setIsOpen,
  defaultValue,
  setDefalutValue,
  action,
  setReload,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  defaultValue?: InventoryType | undefined;
  setDefalutValue?: React.Dispatch<SetStateAction<InventoryType | undefined>>;
  action: "create" | "update" | "delete" | undefined;
  setReload: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [production, setProduction] = useState<PorductionType[]>();
  const [productionTotalPage, setProductionTotalPage] = useState<
    number | undefined
  >();
  const [productionCurrentPage, setProductionCurrentPage] = useState(1);
  const [productionId, setProductionId] = useState<number | undefined>();
  const [statusCurrentPage, setStatusCurrentPage] = useState(1);
  const [productionStatus, setProductionStatus] = useState<
    string | undefined
  >();
  const [activeProduction, setActiveProduction] = useState<
    PorductionType | undefined
  >();
  const [productionSelectionError, setProductionSelectionError] = useState("");
  const [statusSelectionError, setStatusSelectionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log(productionId);
  // console.log(productionStatus);

  const adtiveElement = {
    id: defaultValue?.id,
    name: defaultValue?.product.name,
  };

  const status = [
    {
      status: "IN-STOCK",
    },
    {
      status: "OUT-OF-STOCK",
    },
  ];

  const handleSubmit = async () => {
    const newError = {
      productionId: !productionId ? "Select a Porduction to continue..." : "",
      status: !productionStatus ? "Select Porduction to continue..." : "",
    };

    const hasError = Object.values(newError).some(
      (errorMessage) => errorMessage !== ""
    );

    if (hasError) {
      setProductionSelectionError(newError.productionId);
      setStatusSelectionError(newError.status);
      return;
    } else {
      setIsLoading(true);

      setTimeout(async () => {
        const data = {
          production: productionId,
          current_status: productionStatus,
        };

        if (action === "create") {
          const response = await createInventory(data);

          if (response.success) {
            setIsOpen((prv) => !prv);
            setReload((prv) => !prv);

            toast.custom((t) => (
              <SuccessToast visible={t.visible}>
                Inventory Created Successfully!
              </SuccessToast>
            ));
          } else {
            console.log(response.message);

            toast.custom((t) => (
              <ErrorToast visible={t.visible}>
                Failed To Create Inventory!
              </ErrorToast>
            ));
          }
        }

        if (action === "update") {
          const updateData = {
            current_status: data.current_status,
          };
          const response = await updateInventory(defaultValue?.id, updateData);

          if (response.success) {
            setIsOpen((prv) => !prv);
            setReload((prv) => !prv);

            toast.custom((t) => (
              <SuccessToast visible={t.visible}>
                Inventory Updated Successfully!
              </SuccessToast>
            ));
          } else {
            console.log(response.message);

            toast.custom((t) => (
              <ErrorToast visible={t.visible}>
                Failed To Update Inventory!
              </ErrorToast>
            ));
          }
        }

        setIsLoading(false);
      }, 1000);
    }
  };
  const deleteHandler = () => {};

  useEffect(() => {
    const productions = async () => {
      const response = await getProduction(productionCurrentPage);

      if (response.success) {
        const firstElement = response.data.shift();
        const totalPages = firstElement.total_page;

        setActiveProduction(
          response.data?.find(
            (element: ProductType) => element.id === defaultValue?.product.id
          )
        );
        setProductionTotalPage(totalPages);
        setProduction(response.data);
      }
    };

    productions();
  }, [productionCurrentPage, defaultValue]);

  useEffect(() => {
    if (defaultValue) {
      setProductionId(defaultValue.id);
      setProductionStatus(defaultValue.status);
    }
  }, [defaultValue]);

  useEffect(() => {
    setActiveProduction(
      production?.find((element) => element.id === productionId)
    );
  }, [productionId, production]);

  return (
    <>
      {action === "delete" ? (
        <DeleteModal
          activeElement={adtiveElement}
          handler={deleteHandler}
          setIsOpen={setIsOpen}
          title={"Production"}
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-20 remove-scrollbar"
          onClick={() => {
            setIsOpen((prv) => !prv);
            if (setDefalutValue) {
              setDefalutValue(undefined);
            }
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary w-[90%] xl:w-[80%] border border-border_color rounded-xl px-3 xl:px-8 py-6 xl:py-8 relative"
          >
            <div
              className="close-btn"
              onClick={() => {
                setIsOpen((prv) => !prv);
              }}
            >
              <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
            </div>

            <div className="text-primary-foreground text-center border-b border-border_color pb-6 xl:pb-8">
              {defaultValue ? (
                <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
                  <p>Update Production</p>
                  <div className="hidden xl:block text-base w-[60%]">
                    To update production records, include{" "}
                    <span className="text-primary">
                      dropdowns for selecting an employee and product
                    </span>
                    , along with input fields for rate and quantity. This
                    ensures accurate assignments and streamlines data tracking.
                  </div>
                </div>
              ) : (
                <div className="text-xl xl:text-3xl font-semibold flex flex-col items-center justify-center gap-2">
                  <p className="text-primary font-sour_gummy">Add Production</p>
                  <div className="hidden xl:block text-base w-[60%]">
                    To create production records, include{" "}
                    <span className="text-primary">
                      dropdowns for selecting an employee and product
                    </span>
                    , along with input fields for rate and quantity. This
                    ensures accurate assignments and streamlines data tracking.
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col xl:flex-row mt-6 xl:mt-8 gap-6 xl:gap-10">
              <div className="xl:w-[50%] space-y-3">
                <p className="text-primary-foreground text-xl font-medium text-center">
                  Select{" "}
                  <span className="text-primary font-semibold">Production</span>{" "}
                  and
                  <span className="text-primary font-semibold"> Status</span>
                </p>
                <div className="space-y-9">
                  {action === "create" ? (
                    <div>
                      <Dropdown
                        data={production}
                        totalPage={productionTotalPage}
                        currentPage={productionCurrentPage}
                        setCurrentPage={setProductionCurrentPage}
                        setId={setProductionId}
                        defalutValue={defaultValue}
                        setSelectionError={setProductionSelectionError}
                        type="production"
                      />
                      <p className="error_message">
                        {productionSelectionError}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-secondary-foreground text-primary-foreground rounded-full py-2 px-5 border border-border_color text-base xl:text-xl flex items-center justify-between">
                      <p>{defaultValue?.product.name}</p>
                    </div>
                  )}
                  <div>
                    <Dropdown
                      data={status}
                      currentPage={statusCurrentPage}
                      setCurrentPage={setStatusCurrentPage}
                      defalutValue={defaultValue}
                      setValue={setProductionStatus}
                      setSelectionError={setStatusSelectionError}
                      type="status"
                    />
                    <p className="error_message">{statusSelectionError}</p>
                  </div>
                </div>
              </div>
              <div className="border-b xl:border-l  border-border_color"></div>

              <div className="w-full h-[15rem] rounded-lg xl:w-[50%] space-y-2 border border-border_color xl:space-y-3">
                {activeProduction && (
                  <div className="text-primary-foreground rounded-md text-base xl:text-[21px] flex p-3">
                    <div className="flex flex-col gap-1 w-[40%] xl:w-[25%] ">
                      <p className="font-semibold bg-secondary px-2 py-1 border-r border-border_color">
                        ID:
                      </p>
                      <p className="font-semibold bg-secondary px-2 py-1 border-r border-border_color">
                        Product:
                      </p>
                      <p className="font-semibold bg-secondary px-2 py-1 border-r border-border_color">
                        Employee:
                      </p>
                      <p className="font-semibold bg-secondary px-2 py-1 border-r border-border_color">
                        Rate:{" "}
                      </p>
                      <p className="font-semibold bg-secondary px-2 py-1 border-r border-border_color">
                        Quantity:
                      </p>
                      <p className="font-semibold bg-secondary px-2 py-1 border-r border-border_color">
                        Date:{" "}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 w-[60%] xl:w-[75%] capitalize">
                      <p className="bg-secondary font-medium px-4 py-1">
                        {activeProduction.id}
                      </p>
                      <p className="bg-secondary font-medium px-4 py-1">
                        {activeProduction.product.name}
                      </p>
                      <p className="bg-secondary font-medium px-4 py-1">
                        {activeProduction.employee.name}
                      </p>
                      <p className="bg-secondary font-medium px-4 py-1">
                        {activeProduction.rate}
                      </p>
                      <p className="bg-secondary font-medium px-4 py-1">
                        {activeProduction.quantity}
                      </p>
                      <p className="bg-secondary font-medium px-4 py-1">
                        {activeProduction.date}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-center mb-4">
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-background" />
                  </div>
                ) : (
                  <div>{defaultValue ? "Update" : "Add"} Inventory</div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryModal;
