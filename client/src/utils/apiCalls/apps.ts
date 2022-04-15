import axios from "axios";
import type { MutateFunction } from "react-query";
import type { App } from "../../types/app";
import { API_URL } from "./utils";

const URL = `${API_URL}/apps`;

export const getApps = async () => {
  const { data } = await axios.get(URL);
  return data;
};

export const postApps: MutateFunction<void, Error, Partial<App>, void> = async (
  app
) => {
  await axios.post(URL, app);
};
