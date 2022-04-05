import React, { FC } from "react";

import SearchBar from "../components/SearchBar";

const AppsPage: FC = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className="mt-20 w-full space-y-10">
      <h1 className="text-6xl">Apps</h1>
      <SearchBar onChange={handleSearch} />
    </div>
  );
};

export default AppsPage;
