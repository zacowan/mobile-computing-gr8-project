import React, { FC } from "react";

import NavButton from "./NavButton";
import { HomeIcon, TerminalIcon, CogIcon } from "../assets/icons";
import { useStatusQuery } from "../utils/queries";

const NavSidebar: FC = () => {
  const statusQuery = useStatusQuery();

  const getConnectionStatusText = () => {
    if (statusQuery.isSuccess) return "Connected";

    if (statusQuery.isFetching) return "Attempting connection...";

    return "Not connected";
  };

  const getErrorsText = () => {
    if (!statusQuery.isError) return "No errors";

    return statusQuery.error.message;
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
            Server
          </span>
          <span className="block">{getConnectionStatusText()}</span>
          <span
            className={`block ${
              statusQuery.isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {getErrorsText()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
