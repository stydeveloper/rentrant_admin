import { toast } from "react-toastify";
import { userRequest } from "./axiosSetup";

export const getAllReviews = async () => {
  try {
    const response = await userRequest.get("/reviewsbyip"); // Assuming you have an API endpoint for fetching all reviews
    return response.data;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.message || "Failed to fetch reviews", {
      position: "top-right",
    });
    console.error("Error fetching reviews:", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const getReviewsByIp = async (ip) => {
  try {
    const response = await userRequest.get(`/reviews/${ip}`); // Assuming you have an API endpoint for fetching all reviews
    return response.data;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.message || "Failed to fetch reviews", {
      position: "top-right",
    });
    console.error("Error fetching reviews:", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const deleteReviewById = async (reviewId) => {
  try {
    const response = await userRequest.delete(`/reviews/${reviewId}`); // Assuming you have an API endpoint for fetching all reviews
    return response.data;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to delete review", {
      position: "top-right",
    });
    console.error("Error deleting reviews:", error.response.data.error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const getAllReviewsByLatLng = async () => {
  try {
    const response = await userRequest.get("/reviewsbyLatLng"); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to fetch reviews", {
      position: "top-right",
    });
    console.error("Error fetching reviews:", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const editReview = async (reviewId, updatedReview) => {
  try {
    if (!reviewId) {
      console.log(`id ${reviewId} not received`);
      return;
    }
    const response = await userRequest.patch(`/reviews/${reviewId}`, {
      ...updatedReview,
    }); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to edit review", {
      position: "top-right",
    });
    console.error("Error editing reviews:", error.response.data.error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const addReview = async (newReview) => {
  try {
    const response = await userRequest.post("/reviews", {
      ...newReview,
    }); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(error.response?.data?.error || "Failed to add reviews", {
      position: "top-right",
    });
    console.error("Error in adding reviews:", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const getAllReviewsForAdmin = async () => {
  try {
    const response = await userRequest.get("/admin/reviews"); // Assuming you have an API endpoint for fetching all reviews
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(
      error.response?.data?.message || "Failed to fetch admin reviews",
      {
        position: "top-right",
      }
    );
    console.error("Error fetching admin reviews:", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};

export const getSearchedReviews = async (q, isAdmin) => {
  try {
    const response = await userRequest.get(
      `/search?q=${q}&is_admin=${isAdmin}`
    );
    return response;
  } catch (error) {
    // Show toast message for failure to fetch reviews
    toast.error(
      error.response?.data?.message || "Failed to fetch searched reviews",
      {
        position: "top-right",
      }
    );
    console.error("Error fetching searched reviews:", error);

    throw error; // Re-throw the error for additional handling if needed
  }
};
