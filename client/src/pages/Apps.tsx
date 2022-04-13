import React, { FC, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { App } from "../types/app";
import DataContext from "../DataContext";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { getSearchResults } from "../utils/search";
import AppCard from "../components/AppCard";
import { PlusIcon } from "../assets/icons";

const AppsPage: FC = () => {
  const { apps } = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredApps, setFilteredApps] = useState<Array<App>>();
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = getSearchResults(searchTerm, apps, ["name"]);
    setFilteredApps(filtered);
  }, [apps, searchTerm]);

  return (
    <div className="mt-20 w-full space-y-10">
      <h1 className="text-6xl">Apps</h1>
      {/* Controls */}
      <div className="flex flex-col space-y-5">
        <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
        <div className="flex space-x-5">
          <Button
            primary
            onClick={() => navigate("editor")}
            icon={<PlusIcon />}
          >
            Create App
          </Button>
          <Button>Upload App</Button>
        </div>
      </div>
      {/* Apps */}
      <div className="grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredApps &&
          filteredApps.map((app, index) => (
            <AppCard
              onClickDelete={async () => {}}
              onClickEdit={async () => {}}
              onClickStart={async () => {}}
              onClickStop={async () => {}}
              app={app}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default AppsPage;
