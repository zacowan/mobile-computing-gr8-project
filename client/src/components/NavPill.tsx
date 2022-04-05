import React, { FC } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

type Props = {
  text: string;
  to: string;
};

const NavPill: FC<Props> = ({ text, to }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Link
      className={`flex w-fit items-center space-x-5 rounded-full text-sm uppercase ${
        match ? "bg-slate-900" : "bg-slate-100"
      } px-4 py-2 ${
        match ? "text-slate-50" : "text-slate-900"
      } transition-colors ${match ? "" : "hover:bg-slate-200"}`}
      to={to}
    >
      {text}
    </Link>
  );
};

export default NavPill;
