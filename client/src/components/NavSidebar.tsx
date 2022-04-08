import React, { FC } from "react";

import NavButton from "./NavButton";
import { HomeIcon, TerminalIcon } from "../assets/icons";

type Props = {
  isConnected: boolean;
  errorMessage?: string;
};

const NavSidebar: FC<Props> = ({ isConnected, errorMessage }) => {
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
        </ul>
      </nav>
      {/* Status */}
      <div className="space-y-2">
        <span className="block text-center text-lg font-medium">
          API Status
        </span>
        <div className="text-sm font-light text-slate-600">
          <span className="block font-normal text-slate-900">
            Things/Services
          </span>
          <span className="block">
            {isConnected ? "Connected" : "Not connected"}
          </span>
          <span className="block">{errorMessage || "No errors"}</span>
        </div>
      </div>
    </div>
  );
};

export default NavSidebar;
