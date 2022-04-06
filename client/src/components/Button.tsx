import React, { FC } from "react";

type Props = {
  primary?: boolean;
  icon?: React.ReactNode;
};

const Button: FC<Props & React.ComponentProps<"button">> = ({
  primary,
  icon,
  children,
  ...props
}) => {
  return (
    <button
      className={`w-fit rounded ${
        primary ? "bg-blue-600" : "bg-slate-100"
      } px-5 py-3 transition-colors ${
        primary ? "hover:bg-blue-700" : "hover:bg-slate-200"
      } ${
        primary ? "text-slate-50" : "text-slate-900"
      } flex items-center space-x-2 font-light`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
