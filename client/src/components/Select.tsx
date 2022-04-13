import React, { FC } from "react";

type Props = {
  options: string[];
};

const Select: FC<Props & React.ComponentProps<"select">> = ({
  options,
  className,
  ...props
}) => {
  return (
    <select
      className={`${className} rounded border-none bg-slate-100 py-3 pl-5 pr-10 font-light transition-colors hover:cursor-pointer hover:bg-slate-200`}
      {...props}
    >
      <option />
      {options.map((op, index) => (
        <option key={index} value={op}>
          {op}
        </option>
      ))}
    </select>
  );
};

export default Select;
