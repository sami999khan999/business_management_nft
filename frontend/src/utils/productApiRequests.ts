import { CreateProductType } from "@/types";

const url = process.env.NEXT_PUBLIC_API_URL;

export const createProduct = async (product: CreateProductType) => {
  try {
    const response = await fetch(`${url}api/products/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't create product",
      };
    }

    return {
      success: true,
      message: data.message || "Product created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while creating the product",
    };
  }
};

export const getProducts = async (page: number) => {
  try {
    const response = await fetch(`${url}api/products/view/${page}/`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't fetch products",
        data: [],
      };
    }

    return {
      success: true,
      message: data.message || "Products fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while fetching the products",
      data: [],
    };
  }
};

export const deleteProduct = async (id: number | string) => {
  try {
    const response = await fetch(`${url}api/products/delete/${id}/`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Product deleted failed",
      };
    }

    console.log(data);

    return {
      success: true,
      message: data.message || "Product deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while deleting the product",
    };
  }
};

export const updateProduct = async (
  id: number | string | undefined,
  product: CreateProductType
) => {
  try {
    const response = await fetch(`${url}api/products/update/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't update product",
      };
    }

    return {
      success: true,
      message: data.message || "Product updated successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while updating the product",
    };
  }
};
