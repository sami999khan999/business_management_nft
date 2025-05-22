const url = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async () => {
  try {
    const response = await fetch(`${url}api/catagory/view/`);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Can't find any category.",
      };
    }

    console.log(response.body);

    return {
      success: true,
      message: data.message || "Category fetch successfully.",
      data: data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while fetching categories.",
    };
  }
};

export const createCategory = async (category: {
  name: string;
  unit: string | undefined;
}) => {
  try {
    const response = await fetch(`${url}api/catagory/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    // const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: "Can't create a new category.",
      };
    }

    return {
      success: true,
      message: "Category created successfully.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while creating a new category.",
    };
  }
};

export const categoryDelete = async (id: number) => {
  try {
    const response = await fetch(`${url}api/catagory/delete/${id}/`);

    if (!response.ok) {
      return {
        success: false,
        message: "Can't delete the category.",
      };
    }

    return {
      success: true,
      message: "Category deleted successfully.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred while deleting the category.",
    };
  }
};
