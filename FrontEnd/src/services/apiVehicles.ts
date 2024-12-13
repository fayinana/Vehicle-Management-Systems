import { Vehicle } from "@/types";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

export async function getVehicles() {
  try {
    const res = await axios.get(`${API_URL}/vehicles`);
    return res.data.vehicles;
  } catch (error) {
    console.error(error);
  }
}

export async function addVehicle(data: Vehicle) {
  try {
    const res = await axios.post(`${API_URL}/vehicles`, data);
    return res.data.vehicles;
  } catch (error) {
    console.error(error);
  }
}

export async function editVehicle({ data, id }: { data: string; id: string }) {
  try {
    console.log(data, id);

    const res = await axios.patch(`${API_URL}/vehicles/${id}`, {
      status: data,
    });
    return res.data.vehicles;
  } catch (error) {
    console.error(error);
  }
}
