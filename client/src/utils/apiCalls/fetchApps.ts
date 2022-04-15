import axios from "axios";
import { API_URL } from "./utils";

const URL = `${API_URL}/apps`;

const fetchApps = async () => {
  console.log("Fetching apps");
  const { data } = await axios.get(URL);
  console.log(data);
  return data;
};

export default fetchApps;
