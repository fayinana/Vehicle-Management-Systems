import { Vehicle } from "@/types";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = import.meta.env.VITE_API_URL;

export async function getVehicles() {
  try {
    const res = await axios.get(`${API_URL}/vehicles`);
    return res.data.vehicles;
  } catch (error) {
    handleError(error);
  }
}

export async function addVehicle(data: Vehicle) {
  try {
    const res = await axios.post(`${API_URL}/vehicles`, data);
    return res.data.vehicles;
  } catch (error) {
    handleError(error);
  }
}

export async function editVehicle({ data, id }: { data: string; id: string }) {
  try {
    const res = await axios.patch(`${API_URL}/vehicles/${id}`, {
      status: data,
    });
    return res.data.vehicles;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error: any) {
  let errorMessage = "An unexpected error occurred";

  if (error.response) {
    const statusCode = error.response.status;
    const defaultMessage = "Something went wrong";

    switch (statusCode) {
      case 400:
        errorMessage = "Invalid request. Please check your input.";
        break;
      case 401:
        errorMessage = "You are not authorized to perform this action.";
        break;
      case 403:
        errorMessage =
          "Access denied. You do not have the necessary permissions.";
        break;
      case 404:
        errorMessage = "Requested resource not found.";
        break;
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      default:
        errorMessage = error.response.data.message || defaultMessage;
    }
  } else if (error.message) {
    errorMessage = "Network error or unexpected issue: " + error.message;
  }

  throw new Error(errorMessage);
}
