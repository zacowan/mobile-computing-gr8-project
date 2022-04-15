import React, { FC } from "react";

import NavButton from "./NavButton";
import { HomeIcon, TerminalIcon, CogIcon } from "../assets/icons";
import { UseQueryResult } from "react-query";
import { DiscoverData } from "../types/DiscoverData";
import { AppData } from "../types/AppData";

type Props = {
  discoverQueryResult: UseQueryResult<DiscoverData, Error>;
  appQueryResult: UseQueryResult<AppData, Error>;
};

const NavSidebar: FC<Props> = ({ discoverQueryResult, appQueryResult }) => {
  const determineConnectedStatus = (qr: UseQueryResult) => {
    if (discoverQueryResult.isFetching && !discoverQueryResult.isSuccess) {
      return "Attempting connection...";
    }
    if (discoverQueryResult.isFetched && discoverQueryResult.isSuccess) {
      return "Connected";
    } else {
      return "Not connected";
    }
  };

  return (
    <div className="h-screen max-w-xs px-10 py-20">
      {/* Title */}
      <div className="text-center">
        <span className="block text-lg font-medium">Atlas IoT IDE</span>
        <span className="block text-xs font-light text-slate-600">GR8</span>
      </div>
      {/* Navigation */}
      <nav className="py-20">
        <ul className="space-y-5">
          <li>
            <NavButton icon={<HomeIcon />} text={"Home"} to="home" />
          </li>
          <li>
            <NavButton icon={<TerminalIcon />} text={"Apps"} to="apps" />
          </li>
          <li>
            <NavButton icon={<CogIcon />} text={"Settings"} to="settings" />
          </li>
        </ul>
      </nav>
      {/* Status */}
      <div className="space-y-5">
        <span className="block text-center text-lg font-medium">
          API Status
        </span>
        <div className="rounded bg-slate-100 px-5 py-3 text-sm font-light text-slate-600">
          <span className="flex items-center font-normal text-slate-900">
            Things and Services
          </span>
          <span className="block">
            {determineConnectedStatus(discoverQueryResult)}
          </span>
          <span
            className={`block ${
              discoverQueryResult.isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {discoverQueryResult.error?.message || "No errors"}
          </span>
          <span className="flex items-center font-normal text-slate-900">
            Apps
          </span>
          <span className="block">
            {determineConnectedStatus(appQueryResult)}
          </span>
          <span
            className={`block ${
              appQueryResult.isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {appQueryResult.error?.message || "No errors"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
