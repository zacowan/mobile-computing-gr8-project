import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Components & Pages
import HomePage from "./pages/home";
import ThingsPage from "./pages/home/Things";
import ServicesPage from "./pages/home/Services";
import AppsPage from "./pages/Apps";
import SettingsPage from "./pages/Settings";
import AppEditorPage from "./pages/AppEditor";
import NavSidebar from "./components/NavSidebar";
// Data
import DataContext from "./DataContext";
import MockThings from "./mock/things";
import MockServices from "./mock/services";
import MockApps from "./mock/apps";

const App: React.FC = () => {
  return (
    <div className="flex divide-x-2">
      <NavSidebar />
      <DataContext.Provider
        value={{
          things: MockThings,
          services: MockServices,
          apps: MockApps,
        }}
      >
        <div className="h-screen w-full px-10 py-20">
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
        </div>
      </DataContext.Provider>
    </div>
  );
};

export default App;
