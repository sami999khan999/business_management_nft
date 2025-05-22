import { LoginUserType, SignupUserType } from "@/types";

const url = process.env.NEXT_PUBLIC_API_URL;

export const userSignup = async (userData: SignupUserType) => {
  try {
    const response = await fetch(`${url}api/register/`, {
      // API route for POST request
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Convert payload to JSON string
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Registration failed");

      return { success: false, message: data.message || "Registration failed" };
    }

    return {
      success: true,
      message: data.message || "Registration successful",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
    };
  }
};

export const userLogin = async (userData: LoginUserType) => {
  try {
    const response = await fetch(`${url}api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      console.log("Login failed");
      return { success: false, message: data.message || "Login failed" };
    }

    return { success: true, message: data.message || "Login succeeded" };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err || "An error occurred during login. Please try again.",
    };
  }
};

export const setCookie = (sessoinName: string, value: string, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Set expiration

  document.cookie = `${sessoinName}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax;`;

  console.log("Cookies after setting:", document.cookie);
};
