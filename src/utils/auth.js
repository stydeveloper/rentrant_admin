import { toast } from "react-toastify";
import { publicRequest, userRequest } from "./axiosSetup";
export const login = async (email, password) => {
  try {
    const response = await publicRequest.post("/users/login", {
      email,
      password,
    });

    // Show toast message on successful login
    toast.success(response.data.message, { position: "top-right" });

    return response; // Return the data on success
  } catch (error) {
    // Show toast message for login failure
    toast.error(error.response?.data?.error || "Login failed", {
      position: "top-right",
    });
    console.error(error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await userRequest.post("/users/forgot-password", {
      email,
    }); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to in forgot password", {
      position: "top-right",
    });
    console.error("Failed to in forgot password", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const resetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const response = await userRequest.post(`/users/reset-password/${token}`, {
      newPassword,
      confirmPassword,
    }); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed in reset password", {
      position: "top-right",
    });
    console.error("Failed in reset password", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const register = async (newUser) => {
  try {
    const response = await publicRequest.post("/users/register", {
      ...newUser,
    });

    return response; // Return the data on success
  } catch (error) {
    // Show toast message for login failure
    toast.error(error.response?.data?.error || "registration failed", {
      position: "top-right",
    });
    console.error(error);

    throw error; // Re-throw the error for additional handling if needed
  }
};
