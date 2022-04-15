import { useQuery, useMutation, UseMutationOptions } from "react-query";
import type { DiscoverData } from "../types/DiscoverData";
import type { AppData } from "../types/AppData";
import type { WorkingDirData } from "../types/WorkingDirData";
import fetchDiscover from "./apiCalls/fetchDiscover";
import { getApps } from "./apiCalls/apps";
import { getStatus } from "./apiCalls/status";
import { getWorkingDir, putWorkingDir } from "./apiCalls/workingDir";

const DATA_FETCH_RATE_MS = 5000; // 5 seconds

const DISCOVER_KEY = "discover";
const APP_KEY = "app";
const WORKING_DIR_KEY = "workingDir";
const STATUS_KEY = "status";

export const useStatusQuery = () =>
  useQuery<boolean, Error>(STATUS_KEY, getStatus, {
    refetchInterval: DATA_FETCH_RATE_MS,
  });

export const useDiscoverQuery = () =>
  useQuery<DiscoverData, Error>(DISCOVER_KEY, fetchDiscover, {
    initialData: {
      things: [],
      services: [],
    },
    refetchInterval: DATA_FETCH_RATE_MS,
  });

export const useAppsQuery = () =>
  useQuery<AppData, Error>(APP_KEY, getApps, {
    initialData: {
      apps: [],
    },
    refetchInterval: DATA_FETCH_RATE_MS,
  });

export const useWorkingDirQuery = () =>
  useQuery<WorkingDirData, Error>(WORKING_DIR_KEY, getWorkingDir);

export const useMutateWorkingDir = (
  config?: Omit<
    UseMutationOptions<void, Error, string, void>,
    "mutationFn" | "mutationKey"
  >
) =>
  useMutation<void, Error, string, void>(
    WORKING_DIR_KEY,
    putWorkingDir,
    config
  );
