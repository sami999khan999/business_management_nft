"use client";

import {
  CustomerType,
  DashboardProductionCreateType,
  DashboardProductionType,
  DropdownType,
  EmployeeType,
  ProductType,
} from "@/types";
import { getCustoer } from "@/utils/customerApiRerquest";
import { getEmployee } from "@/utils/employeeApiRequest";
import { getProducts } from "@/utils/productApiRequests";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Dropdown from "./Dropdown";
import { ErrorToast, SuccessToast } from "./Toast";
import { createInvoiceSimpleVersion } from "@/utils/invoiceApiRequests";
import { useRouter } from "next/navigation";
import { CgSpinnerTwo } from "react-icons/cg";

const DashboardModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const path = useRouter();
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [customerTotalPage, setCustomerTotalPage] = useState<
    number | undefined
  >();
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<
    number | undefined
  >();
  const [customerSelecteonError, setCustomerSelecteonError] = useState("");

  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [originalEmployees, setOriginalEmployees] = useState<EmployeeType[]>(
    []
  );
  const [employeeTotalPage, setEmployeeTotalPage] = useState<
    number | undefined
  >();
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [originalProducts, setOriginalProducts] = useState<ProductType[]>([]);
  const [productTotalPage, setProductTotalPage] = useState<
    number | undefined
  >();
  const [productCurrentPage, setProductCurrentPage] = useState(1);

  const [selectedEmployee, setSelectedEmployee] = useState<
    number | undefined
  >();
  const [selectedProduct, setSelectedProduct] = useState<number | undefined>();

  const [productions, setProductions] = useState<DashboardProductionType[]>([]);

  const [activeProductionIndex, setActiveProductionIndex] = useState<
    number | undefined
  >();

  const [quantity, setQuantity] = useState("");

  const [employeeDefaultValue, setEmployeeDefaultValue] = useState<
    DropdownType | undefined
  >();
  const [productDefaultValue, setProductDefaultValue] = useState<
    DropdownType | undefined
  >();

  const [employeeName, setEmployeeName] = useState<string | undefined>();
  const [productName, setProductName] = useState<string | undefined>();

  const [employeeSelectionError, setEmployeeSelectionError] = useState("");
  const [productSelectionError, setProductSelectionError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [employeeWithDuplicates, setEmployeeWithDuplicates] = useState<
    number[]
  >([]);
  const [date, setDate] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);

  const addProductions = () => {
    if (activeProductionIndex !== undefined) {
      const error = {
        employee: "",
        product: "",
        quantity: "",
      };

      if (selectedEmployee === undefined) {
        error.employee = "Please select an employee";
      }

      if (selectedProduct === undefined) {
        error.product = "Please select a product";
      }

      // Validate quantity format
      const quantityRegex = /^(\d+(\.\d+)?(\+\d+(\.\d+)?)*)?$/; // Matches "38" or "23+48+4+..."
      if (quantity === "") {
        error.quantity = "Please enter a quantity";
      } else if (!quantityRegex.test(quantity)) {
        error.quantity =
          "Quantity must be in the format '23+48.5+...' or a single number";
      }

      if (error.employee || error.product || error.quantity) {
        if (error.employee) {
          setEmployeeSelectionError(error.employee);
        }

        if (error.product) {
          setProductSelectionError(error.product);
        }

        if (error.quantity) {
          setQuantityError(error.quantity);
        }

        return;
      }

      const data = {
        employee: {
          id: selectedEmployee,
          name: employeeName,
        },
        product: {
          id: selectedProduct,
          name: productName,
        },
        quantity: quantity,
      };

      const updatedProductions = productions.map((production, index) =>
        index === activeProductionIndex ? data : production
      );

      setProductions(updatedProductions);

      setQuantity("");
      setEmployeeDefaultValue({
        employee: {
          name: "",
        },
      });
      setProductDefaultValue({
        product: {
          name: "",
        },
      });
      setSelectedProduct(undefined);
      setSelectedEmployee(undefined);
      setActiveProductionIndex(undefined);
    } else {
      const error = {
        employee: "",
        product: "",
        quantity: "",
      };

      if (selectedEmployee === undefined) {
        error.employee = "Please select an employee";
      }

      if (selectedProduct === undefined) {
        error.product = "Please select a product";
      }

      // Validate quantity format
      const quantityRegex = /^(\d+(\.\d+)?(\+\d+(\.\d+)?)*)?$/; // Matches "38" or "23+48+4+..."
      if (quantity === "") {
        error.quantity = "Please enter a quantity";
      } else if (!quantityRegex.test(quantity)) {
        error.quantity =
          "Quantity must be in the format '23+48.5+...' or a single number";
      }

      if (error.employee || error.product || error.quantity) {
        if (error.employee) {
          setEmployeeSelectionError(error.employee);
        }

        if (error.product) {
          setProductSelectionError(error.product);
        }

        if (error.quantity) {
          setQuantityError(error.quantity);
        }

        return;
      }

      const data = {
        employee: {
          id: selectedEmployee,
          name: employeeName,
        },
        product: {
          id: selectedProduct,
          name: productName,
        },
        quantity: quantity,
      };

      setProductions([...productions, data]);
      setQuantity("");
      setEmployeeDefaultValue({
        employee: {
          name: "",
        },
      });
      // setProductDefaultValue({
      //   product: {
      //     name: "",
      //   },
      // });
      // setSelectedProduct(undefined);
      setSelectedEmployee(undefined);
    }
  };

  const removeHandler = (index: number) => {
    setProductions((prv) => prv.filter((_, i) => i !== index));

    const removedProduction = productions[index];

    setEmployeeWithDuplicates((prv) =>
      prv.filter((element) => element !== removedProduction.employee.id)
    );

    // console.log(removedProduction);
  };

  const HandelClear = () => {
    setActiveProductionIndex(undefined);
    setSelectedProduct(undefined);
    setSelectedEmployee(undefined);
    setQuantity("");
    setEmployeeDefaultValue({
      employee: {
        name: "",
      },
    });
    setProductDefaultValue({
      product: {
        name: "",
      },
    });
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true);

      if (selectedCustomer === undefined) {
        setCustomerSelecteonError("Please Select a Customer!");
        return;
      }

      const formatedData = productions.map((production) => {
        return {
          employee: production.employee.id,
          product: production.product.id,
          qty: production.quantity,
        };
      });

      const checkDuplicateProducts = (
        data: DashboardProductionCreateType[]
      ) => {
        const errors: string[] = [];

        const groupedData = data.reduce<{
          [key: string]: DashboardProductionCreateType[];
        }>((acc, item) => {
          const key = `${item.employee}-${item.product}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        }, {});

        Object.keys(groupedData).forEach((key) => {
          if (groupedData[key].length > 1) {
            const { employee, product } = groupedData[key][0];

            setEmployeeWithDuplicates((prv) => {
              return [...(prv || []), employee].filter(
                (id): id is number => id !== undefined
              );
            });

            errors.push(
              `Employee ${employee} has duplicate product ${product}.`
            );
          }
        });

        return errors;
      };

      const errors = checkDuplicateProducts(formatedData);

      if (errors.length > 0) {
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>
            <div>
              <div>
                {errors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))}
              </div>
            </div>
          </ErrorToast>
        ));
        return;
      }

      const invoiceCreateData = {
        customer: selectedCustomer,
        production: formatedData,
        date: date ? date : "",
      };

      await new Promise((resolve) => setTimeout(resolve, 250));

      const response = await createInvoiceSimpleVersion(invoiceCreateData);

      if (response.success) {
        const invoiceId = response.data.challan_id;

        if (invoiceId === undefined) {
          console.log("Invalid Response Format: 'challan_id' Is Missing");
        } else {
          path.push(`/invoice/${invoiceId}`);
        }

        toast.custom((t) => (
          <SuccessToast visible={t.visible}>{response.message}</SuccessToast>
        ));
      } else {
        toast.custom((t) => (
          <ErrorToast visible={t.visible}>{response.message}</ErrorToast>
        ));
        console.log("Error While Creating Invoice: ", response.message);
      }
    } catch (err) {
      toast.custom((t) => (
        <ErrorToast visible={t.visible}>
          An unexpected error occurred!
        </ErrorToast>
      ));
      console.log("Unexpected Error While Creating Invoice:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch customer
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustoer(customerCurrentPage);

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement.total_page !== null) {
            setCustomerTotalPage(firstElement.total_page);
            setCustomers(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setCustomers([]);
            setCustomerTotalPage(undefined);
          }
        } else {
          console.error("Error While Fetching Cusotmers: ", response.message);
          setCustomers([]);
          setCustomerTotalPage(undefined);
        }
      } catch (err) {
        console.log("Unexpected Error While Fetching Customers: ", err);
        setCustomers([]);
        setCustomerTotalPage(undefined);
      }
    };

    fetchCustomers();
  }, [customerCurrentPage]);

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployee(employeeCurrentPage);

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement.total_page !== null) {
            setEmployeeTotalPage(firstElement.total_page);
            setOriginalEmployees(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setOriginalEmployees([]);
            setEmployeeTotalPage(undefined);
          }
        } else {
          console.error("Error While Fetching Employees: ", response.message);
          setOriginalEmployees([]);
          setEmployeeTotalPage(undefined);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Employees: ", err);
        setOriginalEmployees([]);
        setEmployeeTotalPage(undefined);
      }
    };

    fetchEmployees();
  }, [employeeCurrentPage]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(productCurrentPage);

        if (response.success) {
          const firstElement = response.data[0];

          if (firstElement.total_page !== null) {
            setProductTotalPage(firstElement.total_page);
            setOriginalProducts(response.data.slice(1));
          } else {
            console.error("Invalid Response Format: total_page is missing");
            setOriginalProducts([]);
            setProductTotalPage(undefined);
          }
        } else {
          console.error("Error While Fetching Products: ", response.message);
          setOriginalProducts([]);
          setProductTotalPage(undefined);
        }
      } catch (err) {
        console.error("Unexpected Error While Fetching Products: ", err);
        setOriginalProducts([]);
        setProductTotalPage(undefined);
      }
    };

    fetchProducts();
  }, [productCurrentPage]);

  useEffect(() => {
    if (selectedEmployee && originalProducts.length > 0) {
      const filteredProductions = productions.filter(
        (production) => production.employee.id === selectedEmployee
      );

      const productIdsToRemove = filteredProductions.map(
        (production) => production.product.id
      );

      const updatedProducts = originalProducts.filter(
        (product) => !productIdsToRemove.includes(product.id)
      );

      setProducts(updatedProducts);
    } else {
      setProducts(originalProducts);
    }
  }, [selectedEmployee, originalProducts, productions]);

  useEffect(() => {
    if (selectedProduct && originalEmployees.length > 0) {
      const filteredEmployees = productions.filter(
        (production) => production.product.id === selectedProduct
      );

      const employeeIdsToRemove = filteredEmployees.map(
        (production) => production.employee.id
      );

      const updatedEmployees = originalEmployees.filter(
        (product) => !employeeIdsToRemove.includes(product.id)
      );

      console.log(updatedEmployees);
      setEmployees(updatedEmployees);
    } else {
      setEmployees(originalEmployees);
    }
  }, [selectedProduct, originalEmployees, productions]);

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-50">
        <div className="overflow-y-auto xl:w-[85%] w-[95%] h-[90%] relative  bg-secondary rounded-xl border border-border_color remove-scrollbar">
          <div
            className="close-btn"
            onClick={() => {
              setIsOpen((prv) => !prv);
            }}
          >
            <IoMdClose className="transition-transform hover:rotate-90 origin-center" />
          </div>
          <div className="text-center xl:pt-10 pt-8 pb-4  border-b border-border_color flex flex-col items-center justify-center">
            <h2 className="xl:text-4xl text-2xl text-primary font-semibold">
              Create Invoice
            </h2>
            <p className="text-primary-foreground text-xl mt-1 hidden xl:block w-[60%] text-center">
              Easily generate and manage invoices in just a few clicks, ensuring
              accuracy, professionalism, and seamless tracking for all your
              business transactions.
            </p>
          </div>

          <div className="xl:px-8 px-3 pt-8">
            <div className="border-b-4 border-dotted border-border_color pb-8">
              <p className="text-center xl:text-3xl text-2xl text-primary-foreground font-sour_gummy font-semibold mb-2 ">
                Select Customer
              </p>
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="w-full">
                  <Dropdown
                    data={customers}
                    totalPage={customerTotalPage}
                    currentPage={customerCurrentPage}
                    setCurrentPage={setCustomerCurrentPage}
                    setId={setSelectedCustomer}
                    setSelectionError={setCustomerSelecteonError}
                    type="customer"
                  />
                  <p className="error_message absolute">
                    {customerSelecteonError}
                  </p>
                </div>
                <div className="w-full">
                  <input
                    type="date"
                    className="inputfield"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="border-b-4 border-dotted border-border_color mt-7">
                <div className="text-center xl:text-3xl text-2xl text-primary-foreground font-sour_gummy font-semibold mt-4">
                  <p className="xl:mb-2">Add Production</p>
                </div>

                <div className="flex flex-col xl:flex-row w-full justify-between gap-6 ">
                  <div className="flex-1">
                    <Dropdown
                      data={employees}
                      currentPage={employeeCurrentPage}
                      setCurrentPage={setEmployeeCurrentPage}
                      totalPage={employeeTotalPage}
                      setId={setSelectedEmployee}
                      setSelectionError={setEmployeeSelectionError}
                      setValue={setEmployeeName}
                      defalutValue={employeeDefaultValue}
                      type="employee"
                    />
                    <p className="error_message absolute">
                      {employeeSelectionError}
                    </p>
                  </div>
                  <div className="flex-1">
                    <Dropdown
                      data={products}
                      currentPage={productCurrentPage}
                      setCurrentPage={setProductCurrentPage}
                      totalPage={productTotalPage}
                      setId={setSelectedProduct}
                      setSelectionError={setProductSelectionError}
                      setValue={setProductName}
                      defalutValue={productDefaultValue}
                      type="product"
                    />
                    <p className="error_message absolute">
                      {productSelectionError}
                    </p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        setQuantityError("");
                      }}
                      placeholder="Emter Quantity"
                      className="inputfield xl:h-12"
                    />
                    <p className="error_message absolute">{quantityError}</p>
                  </div>
                  <div
                    className="flex items-center justify-center mb-3 xl:mb-0 cursor-pointer"
                    onClick={HandelClear}
                  >
                    <div className="border xl:w-fit w-full border-border_color rounded-full  text-xl text-primary-foreground px-6 xl:py-2 hover:bg-secondary-foreground duration-200 flex items-center justify-center font-semibold">
                      Clear
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row items-center justify-center mb-4 xl:my-8 gap-4 text-xl w-full">
                  <button
                    onClick={addProductions}
                    className="submit-btn xl:w-fit mt-0"
                  >
                    {activeProductionIndex === undefined
                      ? "+ Add Production"
                      : "+ Update Production"}
                  </button>

                  {/* <button
                    type="submit"
                    className="w-full xl:w-fit bg-primary text-background px-10 py-2 font-semibold rounded-full"
                  >
                    Submit
                  </button> */}
                </div>
              </div>

              <div className="mt-6 overflow-x-auto mb-6">
                {productions.length > 0 ? (
                  <div className="w-[25rem] xl:w-full h-full">
                    <div className="table-header">
                      <p className="flex-1">Employee</p>
                      <p className="flex-1">Product</p>
                      <p className="flex-1">Quantity</p>
                      <p className="">Delete</p>
                    </div>
                    <div className="border border-t-0 border-border_color rounded-b-md">
                      {productions.map((production, i) => (
                        <div key={i} className={`table-col py-1`}>
                          <div
                            key={i}
                            className={`text-primary-foreground xl:text-xl flex justify-between capitalize w-full py-2 ${
                              production.employee.id &&
                              employeeWithDuplicates.includes(
                                production.employee.id
                              )
                                ? "text-red-700"
                                : ""
                            }`}
                            onClick={() => {
                              // updateHandler(production, i);

                              setActiveProductionIndex(i);

                              setSelectedEmployee(production.employee.id);
                              setSelectedProduct(production.product.id);
                              setQuantity(production.quantity);

                              setEmployeeDefaultValue(production);
                              setProductDefaultValue(production);
                            }}
                          >
                            <div className="flex-1 flex items-center">
                              {production.employee.name} (
                              {production.employee.id})
                            </div>
                            <div className="flex-1 flex items-center">
                              {production.product.name} ({production.product.id}
                              )
                            </div>
                            <div className="flex-1 flex items-center">
                              {production.quantity}
                            </div>
                          </div>
                          <div
                            className="bg-secondary-foreground  px-3 text-xl group hover:bg-primary hover:text-background my-1 flex items-center text-primary-foreground rounded-sm"
                            onClick={() => removeHandler(i)}
                          >
                            <IoMdClose className="group-hover:scale-125 duration-200" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center">
                      <button
                        className="submit-btn xl:w-fit xl:px-20 xl:text-2xl mb-1"
                        onClick={submitHandler}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center w-full">
                            <CgSpinnerTwo className="animate-spin text-primary-foreground dark:text-background" />
                          </div>
                        ) : (
                          <div className="text-xl">Create Invoice</div>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl text-center text-mutated font-semibold mt-6 overflow-hidden">
                    No Productios
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
