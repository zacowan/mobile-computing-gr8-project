import React, { FC } from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

const SearchBar: FC<Props> = ({ onChange, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="w-full max-w-md rounded border-slate-600 px-5 py-3 text-slate-600"
      onChange={handleChange}
      value={value}
    />
  );
};

export default SearchBar;
