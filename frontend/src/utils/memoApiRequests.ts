const url = process.env.NEXT_PUBLIC_API_URL;

export const getFilterMemo = async (id: number) => {
  try {
    const response = await fetch(`${url}api/memo/filter/${id}`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch filtered data",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (err) {
    console.log("Failed To Filter Memo: ", err);
    return {
      success: false,
      message: "Failed to fetch filtered data",
    };
  }
};

export const createMemo = async ({
  challanId,
  discountMethod,
  discount,
  date,
}: {
  challanId: number[];
  discountMethod: "percent" | "amount" | null;
  discount: number;
  date: string;
}) => {
  try {
    const response = await fetch(`${url}api/memo/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challan: challanId,
        discount: discount,
        discountMethod: discountMethod,
        date: date,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create memo",
      };
    }

    return {
      success: true,
      message: data.message || "Memo created successfully",
      data: data,
    };
  } catch (err) {
    console.log("Failed To Create Memo: ", err);
    return {
      success: false,
      message: "Failed to create memo",
    };
  }
};

export const getMemo = async (page: number) => {
  try {
    const response = await fetch(`${url}api/memo/view/${page}`);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch memo",
      };
    }

    return {
      success: true,
      message: data.message || "Successfully Fetched Memo",
      data: data,
    };
  } catch (err) {
    console.log("Failed to fetch memo: ", err);
    return {
      success: false,
      message: "Failed to fetch memo",
    };
  }
};

export const getSingleMemo = async (id: number, format: string) => {
  try {
    const response = await fetch(`${url}api/memo/single/view/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ format: format }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to fetch memo",
      };
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message || "Successfully Fetched Memo",
      data: data,
    };
  } catch (err) {
    console.log("Failed to fetch memo: ", err);
    return {
      success: false,
      message: "Failed to fetch memo",
    };
  }
};

export const deleteMemo = async ({
  id,
  deleteRelatedData,
}: {
  id: number | undefined;
  deleteRelatedData: boolean;
}) => {
  try {
    const response = await fetch(`${url}api/memo/delete/`, {
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
        message: data.message || "Can't delete Memo",
      };
    }

    return {
      success: true,
      message: data.message || "Memo deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error deleting Memo",
    };
  }
};

export const updateDiscount = async ({
  amount,
  method,
}: {
  amount: number;
  method: "number" | "percent";
}) => {
  try {
    const response = await fetch(`${url}api/memo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discount: amount, discountMethod: method }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't update discount",
      };
    }

    return {
      success: true,
      message: data.message || "Discount updated successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error updating discount",
    };
  }
};
