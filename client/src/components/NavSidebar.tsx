import React, { FC } from "react";

import NavButton from "./NavButton";
import { HomeIcon, TerminalIcon, SettingsIcon } from "../assets/icons";

const NavSidebar: FC = () => {
  return (
    <div className="h-screen px-10 py-20">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-lg font-medium">Atlas IoT IDE</h1>
        <h2 className="text-xs font-light text-slate-600">GR8</h2>
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
            <NavButton
              icon={<SettingsIcon />}
              text={"Settings"}
              to="settings"
            />
          </li>
        </ul>
      </nav>
      {/* Version */}
      {process.env.REACT_APP_VERSION && (
        <div className="px-5 py-3 text-center text-xs font-light text-slate-600">
          Version {process.env.REACT_APP_VERSION}
        </div>
      )}
    </div>
  );
};

export default NavSidebar;
