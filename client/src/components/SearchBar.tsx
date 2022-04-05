import React, { FC } from "react";

type Props = {
  onChange: (value: string) => void;
};

const SearchBar: FC<Props> = ({ onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="w-full max-w-md rounded border-slate-600 px-5 py-3 text-slate-600"
      onChange={handleChange}
    />
  );
};

export default SearchBar;
