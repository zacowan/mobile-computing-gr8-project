import React, { FC, useState, useEffect } from "react";

import SearchBar from "../../components/SearchBar";
import ThingCard from "../../components/ThingCard";
import type { Thing } from "../../types/thing";
import { getSearchResults } from "../../utils/search";
import { useDiscoverQuery } from "../../utils/queries";

const ThingsPage: FC = () => {
  const { data: discoverData } = useDiscoverQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredThings, setFilteredThings] = useState<Array<Thing>>();

  useEffect(() => {
    const filtered = getSearchResults(searchTerm, discoverData?.things || [], [
      "name",
      "id",
      "description",
    ]);
    setFilteredThings(filtered);
  }, [searchTerm, discoverData]);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-6xl">Things</h1>
      <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      {filteredThings && filteredThings.length === 0 && (
        <span className="block text-sm font-light text-slate-600">
          {discoverData
            ? "Waiting for things to be declared in the smart space..."
            : `No things match the term ${searchTerm}.`}
        </span>
      )}
      {filteredThings && filteredThings.length > 0 && (
        <div className="grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredThings.map((thing, index) => (
            <ThingCard key={index} thing={thing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThingsPage;
