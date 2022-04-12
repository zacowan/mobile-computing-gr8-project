import axios from "axios";
import { API_URL } from "./utils";

const URL = `${API_URL}/discover`;

const fetchDiscover = async () => {
  console.log("Fetching discover");
  const { data } = await axios.get(URL);
  console.log(data);
  return data;
};

export default fetchDiscover;
