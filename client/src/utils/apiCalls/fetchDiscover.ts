import axios from "axios";
import { API_URL } from "./utils";

const URL = `${API_URL}/discover`;

const fetchDiscover = async () => {
  const { data } = await axios.get(URL);
  return data;
};

export default fetchDiscover;
