import React, { FC } from "react";

type Props = {
  primary?: boolean;
  icon?: React.ReactNode;
};

const Button: FC<Props & React.ComponentProps<"button">> = ({
  primary,
  icon,
  children,
  className,
  ...props
}) => {
  const bgColor = primary ? "bg-blue-600" : "bg-slate-100";
  const hoverBgColor = primary ? "hover:bg-blue-700" : "hover:bg-slate-200";
  const textColor = primary ? "text-slate-50" : "text-slate-900";

  return (
    <button
      className={`${className} ${
        props.disabled === true
          ? hoverBgColor + " hover:cursor-not-allowed"
          : ""
      } w-fit rounded ${bgColor} px-5 py-3 transition-colors ${hoverBgColor} ${textColor} flex items-center space-x-2 font-light`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
