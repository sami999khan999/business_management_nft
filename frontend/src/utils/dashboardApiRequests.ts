const url = process.env.NEXT_PUBLIC_API_URL;

export const getDashboardData = async () => {
  try {
    const response = await fetch(`${url}api/dashboard/`);

    const data = await response.json();
    console.log(response);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch Dashboard data!",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Failed to get Dashboard data!",
    };
  }
};
