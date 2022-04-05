import React, { FC, useState } from "react";

import SearchBar from "../../components/SearchBar";

const ServicesPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>();

  return (
    <div className="w-full space-y-10">
      <h1 className="text-6xl">Services</h1>
      <div className="flex flex-col space-y-5">
        <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      </div>
    </div>
  );
};

export default ServicesPage;
