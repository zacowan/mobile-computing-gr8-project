import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "react-query";
// Components & Pages
import HomePage from "./pages/home";
import ThingsPage from "./pages/home/Things";
import ServicesPage from "./pages/home/Services";
import AppsPage from "./pages/Apps";
import SettingsPage from "./pages/Settings";
import AppEditorPage from "./pages/AppEditor";
import NavSidebar from "./components/NavSidebar";
// Data
import type { DiscoverData } from "./types/DiscoverData";
import DataContext from "./DataContext";
import MockApps from "./mock/apps";
import MockServices from "./mock/services";
import fetchDiscover from "./utils/apiCalls/fetchDiscover";
import {
  DISCOVER_KEY,
  DATA_FETCH_RATE_MS,
  APP_KEY,
} from "./utils/queryConstants";
import { AppData } from "./types/AppData";
import { getApps } from "./utils/apiCalls/apps";

const App: React.FC = () => {
  const discoverData = useQuery<DiscoverData, Error>(
    DISCOVER_KEY,
    fetchDiscover,
    {
      initialData: {
        things: [],
        services: [],
      },
      refetchInterval: DATA_FETCH_RATE_MS,
    }
  );
  const appData = useQuery<AppData, Error>(APP_KEY, getApps, {
    initialData: {
      apps: [],
    },
    refetchInterval: DATA_FETCH_RATE_MS,
  });

  return (
    <div className="flex divide-x-2">
      <NavSidebar appQueryResult={appData} discoverQueryResult={discoverData} />
      <div className="h-screen w-full overflow-x-auto px-10 py-20">
        <DataContext.Provider
          value={{
            things: discoverData.data!.things,
            services: discoverData.data!.services,
            apps: appData.data!.apps,
          }}
        >
          <Routes>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<HomePage />}>
              <Route index element={<Navigate to="things" />} />
              <Route path="things" element={<ThingsPage />} />
              <Route path="services" element={<ServicesPage />} />
            </Route>
            <Route path="apps" element={<AppsPage />} />
            <Route path="apps/editor" element={<AppEditorPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<h1>No match</h1>} />
          </Routes>
        </DataContext.Provider>
      </div>
    </div>
  );
};

export default App;
