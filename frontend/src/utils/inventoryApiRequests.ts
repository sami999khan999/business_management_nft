import { CreateInventoryType } from "@/types";

const url = process.env.NEXT_PUBLIC_API_URL;

export const createInventory = async (inventory: CreateInventoryType) => {
  try {
    const response = await fetch(`${url}api/inventory/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Inventory create failed.",
      };
    }

    return {
      success: true,
      message: data.message || "Inventory created successfully.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while creating the inventory.",
    };
  }
};

export const getInventory = async (page: number) => {
  try {
    const response = await fetch(`${url}api/inventory/view/${page}`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Inventory fetch failed.",
        data: [],
      };
    }

    return {
      success: true,
      message: data.message || "Inventory fetched successfully.",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while fetching the inventory.",
      data: [],
    };
  }
};

export const updateInventory = async (
  id: number | undefined,
  inventory: { current_status: string | undefined }
) => {
  try {
    const response = await fetch(`${url}api/inventory/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    });
    console.log(response);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Inventory update failed.",
      };
    }

    return {
      success: true,
      message: data.message || "Inventory updated successfully.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while updating the inventory.",
    };
  }
};
