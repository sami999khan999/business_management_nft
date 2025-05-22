import { CreateEmployeeType } from "@/types";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getEmployee = async (page: number | undefined) => {
  try {
    const response = await fetch(`${url}api/employee/view/${page}`);

    const data = await response.json();

    if (!response.ok) {
      return { success: true, message: data.message };
    }

    return { success: true, data };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to fetch employee data" };
  }
};

export const createEmployee = async (employee: CreateEmployeeType) => {
  try {
    const response = await fetch(`${url}api/employee/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return {
        success: false,
        message: data.error || "Failed to create employee",
      };
    }

    return { success: true, message: "Employee created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create employee" };
  }
};

export const deleteEmployee = async (id: number | undefined) => {
  try {
    const response = await fetch(`${url}api/employee/delete/${id}/`);

    console.log(response);
    if (!response.ok) {
      return { success: false, message: "Failed to delete employee" };
    }

    return { success: true, message: "Employee deleted successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to delete employee" };
  }
};

export const updateEmployee = async (
  id: number | undefined,
  employee: CreateEmployeeType
) => {
  try {
    const response = await fetch(`${url}api/employee/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      return { success: false, message: "Failed to update employee" };
    }

    return { success: true, message: "Employee updated successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Failed to update employee" };
  }
};
