import axios from "axios";
import { API_URL } from "./utils";

import type { MutateFunction } from "react-query";

const URL = `${API_URL}/workingdir`;

export const getWorkingDir = async () => {
  const { data } = await axios.get(URL);
  return data;
};

export const putWorkingDir: MutateFunction<void, Error, string, void> = async (
  newWorkingDir: string
) => {
  const data = {
    workingDir: newWorkingDir,
  };
  await axios.put(URL, data);
};
