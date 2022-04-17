import React, { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { App } from "../types/app";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import { getSearchResults } from "../utils/search";
import AppCard from "../components/AppCard";
import { PlusIcon } from "../assets/icons";
import { useAppsQuery, useWorkingDirQuery } from "../utils/queries";

const AppsPage: FC = () => {
  const { data: appsData } = useAppsQuery();
  const { data: workingDirData } = useWorkingDirQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredApps, setFilteredApps] = useState<Array<App>>();
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = getSearchResults(searchTerm, appsData?.apps || [], [
      "name",
    ]);
    setFilteredApps(filtered);
  }, [appsData, searchTerm]);

  const getNoAppsMessage = () => {
    if (!workingDirData) return "Cannot fetch working directory.";
    if (!appsData || appsData.apps.length === 0)
      return `No apps in "${workingDirData?.workingDir}".`;

    return `No services match the term ${searchTerm}.`;
  };

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
          {/* <Button>Upload App</Button> */}
        </div>
      </div>
      {/* No apps message */}
      {filteredApps && filteredApps.length === 0 && (
        <span className="block text-sm font-light text-slate-600">
          {getNoAppsMessage()}
        </span>
      )}
      {/* Apps */}
      {filteredApps && filteredApps.length > 0 && (
        <div className="grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredApps.map((app, index) => (
            <AppCard app={app} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppsPage;
