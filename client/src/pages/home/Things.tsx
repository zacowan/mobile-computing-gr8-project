import React, { FC, useState, useEffect, useContext } from "react";

import SearchBar from "../../components/SearchBar";
import ThingCard from "../../components/ThingCard";
import type { Thing } from "../../types/thing";
import DataContext from "../../DataContext";
import { getSearchResults } from "../../utils/search";

const ThingsPage: FC = () => {
  const { things } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [filteredThings, setFilteredThings] = useState<Array<Thing>>();

  useEffect(() => {
    const filtered = getSearchResults(searchTerm, things, [
      "name",
      "id",
      "description",
    ]);
    setFilteredThings(filtered);
  }, [searchTerm, things]);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-6xl">Things</h1>
      <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      <div className="grid max-w-7xl grid-cols-3 gap-5">
        {filteredThings &&
          filteredThings.map((thing) => <ThingCard thing={thing} />)}
      </div>
    </div>
  );
};

export default ThingsPage;
