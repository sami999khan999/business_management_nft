import { CreateInvoiceType, SympleInvoiceCreateType } from "@/types";

const url = process.env.NEXT_PUBLIC_API_URL;

export const getFilterInventory = async (filterParam: {
  product: number | string;
  employee: number | string;
}) => {
  try {
    const response = await fetch(`${url}api/inventory/filter/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filterParam),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't fetch filtered inventory",
      };
    }

    return {
      success: true,
      message: "Filtered inventory fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error fetching filtered inventory",
    };
  }
};

export const createInvoice = async (invoiceData: CreateInvoiceType) => {
  try {
    const response = await fetch(`${url}api/challan/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't create invoice",
      };
    }

    console.log(data);

    return {
      success: true,
      message: data.message || "Invoice created successfully",
      challan_id: data.challan_id,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating invoice",
    };
  }
};

export const getInvoice = async (page: number) => {
  try {
    const response = await fetch(`${url}api/challan/view/${page}/`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't fetch invoice",
        data: null,
      };
    }

    return {
      success: true,
      message: "Invoice fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error fetching invoice",
      data: null,
    };
  }
};

export const getSingleInvoice = async (id: number) => {
  try {
    const response = await fetch(`${url}api/challan/${id}/`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't fetch invoice",
        data: null,
      };
    }

    return {
      success: true,
      message: data.message || "Invoice fetched successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error fetching invoice",
      data: null,
    };
  }
};

export const createInvoiceSimpleVersion = async (
  invoiceData: SympleInvoiceCreateType
) => {
  try {
    const response = await fetch(`${url}api/invoice/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't create invoice",
      };
    }

    return {
      success: true,
      message: data.message || "Invoice created successfully",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error creating invoice",
    };
  }
};

export const deleteInvoice = async ({
  id,
  deleteRelatedData,
}: {
  id: number | undefined;
  deleteRelatedData: boolean;
}) => {
  try {
    const response = await fetch(`${url}api/challan/delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, deleteRelatedData: deleteRelatedData }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't delete Invoice",
      };
    }

    return {
      success: true,
      message: data.message || "Invoice deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error deleting Invoice",
    };
  }
};
