import React, { FC } from "react";

type Props = {};

const TextInput: FC<Props & React.ComponentProps<"input">> = ({
  className,
  ...props
}) => {
  return (
    <input
      type="text"
      className={`${className} w-full max-w-md rounded border-slate-600 px-5 py-3 text-slate-600`}
      {...props}
    />
  );
};

export default TextInput;
