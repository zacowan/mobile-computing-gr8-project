import React, { FC } from "react";

type Props = {
  labels?: string[];
  options: any[];
};

const Select: FC<Props & React.ComponentProps<"select">> = ({
  labels,
  className,
  options,
  ...props
}) => {
  return (
    <select
      className={`${className} rounded border-none bg-slate-100 py-3 pl-5 pr-10 font-light capitalize transition-colors hover:cursor-pointer hover:bg-slate-200`}
      {...props}
    >
      <option />
      {options.map((op, index) => (
        <option key={index} value={op}>
          {labels ? labels[index] : op}
        </option>
      ))}
    </select>
  );
};

export default Select;
