import { toast } from "react-toastify";
import { userRequest } from "./axiosSetup";
export const addBlackListIp = async (ip) => {
  try {
    const response = await userRequest.post("/users/blacklist", { ip }); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to block user", {
      position: "top-right",
    });
    console.error("Failed to block user", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const removeBlackListIp = async (ip) => {
  try {
    const response = await userRequest.delete(`/users/blacklist/${ip}`); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to unblock user", {
      position: "top-right",
    });
    console.error("Failed to unblock user", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const getAllUsers = async () => {
  try {
    const response = await userRequest.get("/users/getAll"); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(
      error.response?.data?.error || "Failed to fetch all admins list",
      {
        position: "top-right",
      }
    );
    console.error("Failed to fetch all admins list", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const editUser = async (id, updatedUser) => {
  try {
    const response = await userRequest.patch(
      `/users/updateUser/${id}`,
      updatedUser
    ); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to edit user", {
      position: "top-right",
    });
    console.error("Failed to edit user", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await userRequest.delete(`/users/deleteUser/${id}`); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to delete user", {
      position: "top-right",
    });
    console.error("Failed to delete user", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};
