import axios, { AxiosError, type AxiosInstance } from "axios";
import { toastError } from "../utils";
import { ENVIRONMENTS } from "../config/environment";
import Cookies from "js-cookie";

export type StandardResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type ErrorResponse = {
  message: string;
  error: string;
  response: {
    statusText: string;
    data: {
      error: { name: string };
      message: string;
      status: number;
    };
  };
};

const api: AxiosInstance = axios.create({
  baseURL: `${ENVIRONMENTS.BASE_URL.API}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const errorHandler = (
  error: AxiosError<StandardResponse<ErrorResponse>>,
) => {
  // Check if the error is due to a network issue (e.g., no response received)
  if (!error.response) {
    console.error("Network Error:", error.message);
    toastError("Network error. Please check your internet connection.");
    return Promise.reject({
      message: "Network error. Please check your internet connection.",
      status: "NETWORK_ERROR",
    });
  }

  // Error response exists; handle based on status codes
  const errorResponse = error.response;

  switch (errorResponse.status) {
    case 401:
      console.warn("Unauthorized: Redirecting to login.");

		toastError('Session expired, please login again.');
		sessionStorage.removeItem('access_token');
      Cookies.remove('loggedin');
      window.location.href = "/";
      
      // Optional: Redirect to login or clear token here if needed

      break;
    default:
      console.error("Unhandled Error:", errorResponse.data);
      break;
  }

  // Customize user-facing error messages based on the response
  const errorMessage = Array.isArray(errorResponse?.data?.message)
    ? errorResponse.data.message[0] // Show first error if message is an array
    : errorResponse?.data?.message || "An error occurred. Please try again.";

  // Show the toast notification for the error message
  toastError(errorMessage);

  // Propagate the error for further handling if needed
  return Promise.reject(error);
};

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token") ?? "";

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => errorHandler(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => errorHandler(error), // Use errorHandler for response errors
);

export default api;
