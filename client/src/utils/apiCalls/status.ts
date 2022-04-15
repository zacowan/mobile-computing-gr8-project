import axios from "axios";
import { API_URL } from "./utils";

const URL = `${API_URL}/status`;

export const getStatus = async () => {
  const { data } = await axios.get<{ available: boolean }>(URL);
  if (data.available) {
    return true;
  } else {
    return false;
  }
};
