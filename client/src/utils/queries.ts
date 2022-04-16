import { useQuery, useMutation, UseMutationOptions } from "react-query";
import type { DiscoverData } from "../types/DiscoverData";
import type { AppData } from "../types/AppData";
import type { WorkingDirData } from "../types/WorkingDirData";
import fetchDiscover from "./apiCalls/fetchDiscover";
import { deleteApps, getApps, patchApps, postApps } from "./apiCalls/apps";
import { getStatus } from "./apiCalls/status";
import { getWorkingDir, putWorkingDir } from "./apiCalls/workingDir";
import type { App } from "../types/app";

const DATA_FETCH_RATE_MS = 5000; // 5 seconds

const DISCOVER_KEY = "discover";
export const APPS_KEY = "app";
export const WORKING_DIR_KEY = "workingDir";
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
  useQuery<AppData, Error>(APPS_KEY, getApps, {
    initialData: {
      apps: [],
    },
  });

export const useAddApp = (
  config?: Omit<
    UseMutationOptions<void, Error, Partial<App>, void>,
    "mutationFn" | "mutationKey"
  >
) => useMutation<void, Error, Partial<App>, void>(APPS_KEY, postApps, config);

export const useUpdateApp = (
  config?: Omit<
    UseMutationOptions<void, Error, Partial<App>, void>,
    "mutationFn" | "mutationKey"
  >
) => useMutation<void, Error, Partial<App>, void>(APPS_KEY, patchApps, config);

export const useDeleteApp = (
  config?: Omit<
    UseMutationOptions<void, Error, string, void>,
    "mutationFn" | "mutationKey"
  >
) => useMutation<void, Error, string, void>(APPS_KEY, deleteApps, config);

export const useWorkingDirQuery = () =>
  useQuery<WorkingDirData, Error>(WORKING_DIR_KEY, getWorkingDir);

export const useUpdateWorkingDir = (
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
