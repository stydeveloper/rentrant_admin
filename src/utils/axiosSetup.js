import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_REACT_API_BASE_URL}`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to dynamically set the Authorization header for userRequest
userRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
