import axios from "axios";
import type { MutateFunction } from "react-query";
import type { App, AppComponent } from "../../types/app";
import { API_URL } from "./utils";

const URL = `${API_URL}/apps`;

export const getApps = async () => {
  const { data } = await axios.get(URL);
  return data;
};

type PostApps = MutateFunction<void, Error, PostAppsParams, void>;

export type PostAppsParams = {
  name: string;
  type: string;
  components: AppComponent[];
  loopDelay?: number;
};

export const postApps: PostApps = async ({
  name,
  type,
  components,
  loopDelay,
}) => {
  const data: Partial<App> = {
    name,
    continuous: type === "Continuous",
    loopDelay,
    components,
  };
  await axios.post(URL, data);
  console.log("FINISHED POST");
};
