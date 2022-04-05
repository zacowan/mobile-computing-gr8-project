import React, { FC } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

type Props = {
  icon: React.ReactNode;
  text: string;
  to: string;
};

const NavButton: FC<Props> = ({ icon, text, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Link
      className={`flex items-center space-x-5 rounded ${
        match ? "bg-slate-900" : "bg-slate-100"
      } px-5 py-3 pr-20 ${
        match ? "text-slate-50" : "text-slate-900"
      } transition-colors ${match ? "" : "hover:bg-slate-200"}`}
      to={to}
    >
      <span>{icon}</span>
      <span className="text-lg">{text}</span>
    </Link>
  );
};

export default NavButton;
