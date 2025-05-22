import { ProductType } from "@/types";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/utils/productApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import CategoryDropdown from "./CategoryDropdown";
import { ErrorToast, SuccessToast } from "./Toast";
import CreateCategoryModal from "./CreateCategoryModal";

const ProductModal = ({
  modalAction,
  activeProduct,
  setIsModalOpen,
  setReload,
  reload,
}: {
  modalAction: "create" | "update" | "delete" | undefined;
  activeProduct?: ProductType | undefined;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setReload: React.Dispatch<SetStateAction<boolean>>;
  reload: boolean;
}) => {
  const [productName, setProductName] = useState<string>("");
  const [productRate, setProductRate] = useState<number | undefined>();
  const [productionCost, setProductionCost] = useState<number | undefined>();
  const [otherCost, setOtherCost] = useState<number | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [inputError, setInputError] = useState({
    name: "",
    rate: "",
    productionCost: "",
  });
  const [createCategoryModalisOpen, setCreateCategoryModalisOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setIsLoading(true);

      const newError = {
        name: !productName ? "Product name is required" : "",
        rate: !productRate ? "Product rate is required" : "",
        productionCost: !productionCost ? "Production cost is required" : "",
      };

      if (!selectedCategory) {
        setSelectedCategory("Enter a category!");
      }

      setInputError(newError);

      const hasError = Object.values(newError).some((error) => error);

      if (!hasError) {
        const data = {
          name: productName,
          rate: Number(productRate),
          category: categoryId,
          production_cost: productionCost,
          other_cost: otherCost ? otherCost : 0,
        };

        await new Promise((resolve) => setTimeout(resolve, 250));

        const response = await createProduct(data);

        if (response.success) {
          setIsModalOpen((prv) => !prv);
          setReload((prv) => !prv);

          toast.custom((t) => (
            <SuccessToast visible={t.visible}>
              Product Created Successfully!
            </SuccessToast>
          ));
        } else {
          console.log(response.message);
          toast.custom((t) => (
            <ErrorToast visible={t.visible}>
              Failed To Create Product!
            </ErrorToast>
          ));
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
      toast.custom((t) => (
        <ErrorToast visible={t.visible}>Failed To Create Product!</ErrorToast>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (activeProduct) {
      const response = await deleteProduct(activeProduct?.id);

      if (response.success) {
        setIsModalOpen((prv) => !prv);
        setReload((prv) => !prv);
        toast.custom((t) => (
          <SuccessToast visible={t.visible}>
            Product Deleted Successfully!
          </SuccessToast>
        ));
      } else {
        console.log(response.message);
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>Can Not Deleted Invoice!</ErrorToast>
        ));
      }
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const newError = {
        name: !productName ? "Product name is required" : "",
        rate: !productRate ? "Product rate is required" : "",
        productionCost: !productionCost ? "Production cost is required" : "",
      };

      if (!selectedCategory) {
        setSelectedCategory("Inter a category!");
      }

      setInputError(newError);

      const hasError = Object.values(newError).some((error) => error);

      if (!hasError) {
        const data = {
          name: productName,
          rate: Number(productRate),
          category: categoryId,
          production_cost: productionCost,
          other_cost: otherCost ? otherCost : 0,
        };
        console.log(data, activeProduct?.id);

        const response = await updateProduct(activeProduct?.id, data);

        if (response.success) {
          setIsModalOpen((prv) => !prv);
          setReload((prv) => !prv);

          toast.custom((t) => (
            <SuccessToast visible={t.visible}>
              Product Created Successfully!
            </SuccessToast>
          ));
        } else {
          console.log(response.message);

          toast.custom((t) => (
            <ErrorToast visible={t.visible}>
              Failed To Create Product!
            </ErrorToast>
          ));
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);

      toast.custom((t) => (
        <ErrorToast visible={t.visible}>Failed To Create Product!</ErrorToast>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (modalAction === "update" && activeProduct) {
      setProductName(activeProduct.name || "");
      setProductRate(activeProduct.rate || undefined);
      setProductionCost(activeProduct.production_cost || undefined);
      setOtherCost(activeProduct.other_cost || undefined);
    }
  }, [modalAction, activeProduct]);

  // console.log(categoryId, selectedCategory);

  return (
    <>
      <div
        className="flex items-center justify-center absolute top-0 left-0  z-50 w-full h-full backdrop-blur-md"
        onClick={() => {
          setIsModalOpen((prv) => !prv);
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[95%] xl:w-[60%] bg-secondary rounded-xl "
        >
          {modalAction === "create" && (
            <div className="h-full w-full xl:px-8 p-3 py-8 relative remove-scrollbar border border-border_color rounded-xl">
              <div
                className="close-btn"
                onClick={() => {
                  setIsModalOpen((prv) => !prv);
                }}
              >
                <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
              </div>
              <div className="border-b border-border_color flex flex-col items-center justify-center w-full gap-2 pb-6">
                <h2 className="text-2xl xl:text-3xl font-semibold text-center font-sour_gummy text-primary">
                  Add Product
                </h2>
                <p className="text-primary-foreground w-[70%] text-center text-lg hidden xl:block">
                  Easily add new products to your inventory with detailed
                  information for better management and smoother operations.
                </p>
              </div>
              <div className="flex flex-col mt-8 gap-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={productName}
                      placeholder="Product Name"
                      className="inputfield"
                      onChange={(e) => {
                        setProductName(e.target.value);
                        setInputError({ ...inputError, name: "" });
                      }}
                    />
                    <p className="error_message">{inputError.name}</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="rate"
                      value={productRate}
                      placeholder="Product Rate"
                      className="inputfield"
                      onChange={(e) => {
                        setProductRate(Number(e.target.value));
                        setInputError({ ...inputError, rate: "" });
                      }}
                    />
                    <p className="error_message">{inputError.rate}</p>
                  </div>

                  <div>
                    <input
                      type="number"
                      name="productionCost"
                      value={productionCost}
                      placeholder="Production Cost"
                      className="inputfield"
                      onChange={(e) => {
                        setProductionCost(Number(e.target.value));
                        setInputError({ ...inputError, productionCost: "" });
                      }}
                    />
                    <p className="error_message">{inputError.productionCost}</p>
                  </div>

                  <div>
                    <input
                      type="number"
                      name="otherCost"
                      value={otherCost}
                      placeholder="Other Cost"
                      className="inputfield"
                      onChange={(e) => {
                        setOtherCost(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  {/* <div className="text-primary text-center w-full text-xl mb-2 font-semibold tracking-wide antialiased">
                  Select Category
                </div> */}

                  <CategoryDropdown
                    setReload={setReload}
                    reload={reload}
                    setSelectedCategory={setSelectedCategory}
                    setCategoryId={setCategoryId}
                    setCreateCategoryModalisOpen={setCreateCategoryModalisOpen}
                  />
                </div>
              </div>
              <button
                className="submit-btn"
                disabled={isLoading}
                onClick={handleCreate}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-background" />
                  </div>
                ) : (
                  <div>Add Product</div>
                )}
              </button>
            </div>
          )}

          {modalAction === "update" && (
            <div className="h-full w-full xl:px-8 p-3 py-8 rounded-xl relative border border-border_color remove-scrollbar">
              <div
                className="close-btn"
                onClick={() => {
                  setIsModalOpen((prv) => !prv);
                }}
              >
                <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
              </div>
              <div className="border-b border-border_color flex flex-col items-center justify-center w-full gap-2 pb-6">
                <h2 className="text-2xl xl:text-3xl font-semibold text-center font-sour_gummy text-primary">
                  Update Product
                </h2>
                <p className="text-primary-foreground w-[70%] text-center text-lg hidden xl:block">
                  Easily update new products to your inventory with detailed
                  information for better management and smoother operations.
                </p>
              </div>
              <div className="flex flex-col mt-8 gap-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-3 gap-y-2">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={productName}
                      placeholder="Product Name"
                      className="border border-border_color text-primary-foreground text-base xl:text-xl bg-secondary-foreground rounded-full py-2 px-6"
                      onChange={(e) => {
                        setProductName(e.target.value);
                        setInputError({ ...inputError, name: "" });
                      }}
                    />
                    <p className="error_message">{inputError.name}</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="rate"
                      value={productRate}
                      placeholder="Product Rate"
                      className="border border-border_color text-primary-foreground text-base xl:text-xl  bg-secondary-foreground rounded-full py-2 px-6"
                      onChange={(e) => {
                        setProductRate(Number(e.target.value));
                        setInputError({ ...inputError, rate: "" });
                      }}
                    />
                    <p className="error_message">{inputError.rate}</p>
                  </div>

                  <div>
                    <input
                      type="number"
                      name="productionCost"
                      value={productionCost}
                      placeholder="Production Cost"
                      className="border border-border_color text-primary-foreground text-base xl:text-xl  bg-secondary-foreground rounded-full py-2 px-6"
                      onChange={(e) => {
                        setProductionCost(Number(e.target.value));
                        setInputError({ ...inputError, productionCost: "" });
                      }}
                    />
                    <p className="error_message">{inputError.productionCost}</p>
                  </div>

                  <div>
                    <input
                      type="number"
                      name="otherCost"
                      value={otherCost}
                      placeholder="Other Cost"
                      className="border border-border_color text-primary-foreground text-base xl:text-xl  bg-secondary-foreground rounded-full py-2 px-6"
                      onChange={(e) => {
                        setOtherCost(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="">
                  <CategoryDropdown
                    setReload={setReload}
                    reload={reload}
                    setSelectedCategory={setSelectedCategory}
                    // selectedCategory={selectedCategory}
                    setCategoryId={setCategoryId}
                    setCreateCategoryModalisOpen={setCreateCategoryModalisOpen}
                  />
                </div>
              </div>
              <button
                className="submit-btn"
                disabled={isLoading}
                onClick={handleUpdate}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
                    <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-background" />
                  </div>
                ) : (
                  <div>Update Product</div>
                )}
              </button>
            </div>
          )}

          {modalAction === "delete" && (
            <div
              className="flex items-center justify-center absolute top-0 left-0  z-50 w-full h-full backdrop-blur-md remove-scrollbar"
              onClick={() => setIsModalOpen((prv) => !prv)}
            >
              <div
                className="bg-secondary border border-border_color rounded-xl py-5 px-3 xl:px-5 w-[90%] xl:w-[35%]"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-center font-semibold xl:text-2xl text-primary-foreground mb-3">
                  Delete Product
                </h2>

                <p className="text-xs xl:text-xl text-primary-foreground  ">
                  Would you like to delete
                  <span className="text-primary font-semibold ">
                    {`{ id: ${activeProduct?.id} | Product: ${activeProduct?.name} } `}
                  </span>
                  this Product?
                </p>
                <div className="flex justify-end gap-2 xl:gap-3 mt-2 xl:mt-4">
                  <button
                    className="bg-primary-foreground hover:bg-gray-300 duration-200 font-semibold tracking-wide xl:text-lg text-background text-sm px-4 xl:px-6 xl:py-1 py-1 rounded-md"
                    onClick={() => setIsModalOpen((prv) => !prv)}
                  >
                    Cancle
                  </button>
                  <button
                    className="bg-primary text-background font-semibold tracking-wide hover:bg-[#0ea30e] duration-200 rounded-md xl:text-lg text-sm px-4 xl:px-6 xl:py-1 py-1"
                    onClick={deleteHandler}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {createCategoryModalisOpen && (
        <CreateCategoryModal
          setCreateCategoryModalisOpen={setCreateCategoryModalisOpen}
          setReload={setReload}
        />
      )}
    </>
  );
};

export default ProductModal;
