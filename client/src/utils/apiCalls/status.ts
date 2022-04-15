import axios from "axios";
import { API_URL } from "./utils";

const URL = `${API_URL}/status`;

export const getStatus = async () => {
  await axios.get<{ available: boolean }>(URL);
  return true;
};
