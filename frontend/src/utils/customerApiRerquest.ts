import { CreateCustomerType } from "@/types";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getCustoer = async (page: number) => {
  try {
    const response = await fetch(`${url}api/customer/view/${page}`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch employee data.",
      };
    }

    return { success: true, data };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to fetch employee data." };
  }
};

export const createCustomer = async (data: CreateCustomerType) => {
  try {
    const response = await fetch(`${url}api/customer/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to create customer.",
      };
    }

    return { success: true, message: "Customer created successfully." };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to create customer." };
  }
};

export const deleteCustomer = async (id: number | undefined) => {
  try {
    const rsoponse = await fetch(`${url}api/customer/delete/${id}/`);

    if (!rsoponse.ok) {
      return {
        success: false,
        message: "Failed to delete customer.",
      };
    }

    return { success: true, message: "Customer deleted successfully." };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to delete customer." };
  }
};

export const updateCustomer = async (
  id: number | undefined,
  data: CreateCustomerType
) => {
  try {
    const response = await fetch(`${url}api/customer/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to update customer.",
      };
    }

    return { success: true, message: "Customer updated successfully." };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update customer." };
  }
};
