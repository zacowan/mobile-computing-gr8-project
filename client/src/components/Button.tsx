import React, { FC } from "react";

type Props = {
  label: string;
  onClick: () => void;
  primary?: boolean;
  icon?: React.ReactNode;
};

const Button: FC<Props> = ({ label, onClick, primary, icon }) => {
  return (
    <button
      className={`w-fit rounded ${
        primary ? "bg-blue-600" : "bg-slate-100"
      } px-5 py-3 transition-colors ${
        primary ? "hover:bg-blue-500" : "hover:bg-slate-200"
      } ${
        primary ? "text-slate-50" : "text-slate-900"
      } flex items-center space-x-2 font-light`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
