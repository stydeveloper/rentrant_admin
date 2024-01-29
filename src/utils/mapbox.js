// apiFunctions.js
import axios from "axios";
import { publicRequest } from "./axiosSetup";

export const fetchMapboxAddressSuggestions = async (query, accessToken) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?autocomplete=true&access_token=${accessToken}`
    );

    return response.data.features;
  } catch (error) {
    console.error("Error fetching Mapbox address suggestions:", error.message);
    throw error;
  }
};

export const getReverseGeocodingData = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        `${lng},${lat}`
      )}.json?access_token=${import.meta.env.VITE_REACT_MAPBOX_ACCESS_TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in reverse geocoding:", error.message);
    throw error;
  }
};

export const fetchReviews = async (lat, lng) => {
  try {
    const response = await axios.publicRequest(`/reviews/${lat}/${lng}`);
    return {
      count: response.data.count,
      reviews: response.data.reviews,
    };
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw error;
  }
};

export const fetchAverageRating = async (lat, lng) => {
  try {
    const response = await axios.publicRequest(`/avgRating/${lat}/${lng}`);
    return response.data.avgRating;
  } catch (error) {
    console.error("Error fetching average rating:", error.message);
    throw error;
  }
};
