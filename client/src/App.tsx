import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home";
import AppsPage from "./pages/Apps";
import SettingsPage from "./pages/Settings";
import NavSidebar from "./components/NavSidebar";

const App: React.FC = () => {
  return (
    <div className="flex divide-x">
      <NavSidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export default App;
