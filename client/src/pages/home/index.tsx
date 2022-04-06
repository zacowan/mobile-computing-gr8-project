import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import HomeNav from "../../components/HomeNav";

const HomePage: FC = () => {
  return (
    <div className="space-y-10">
      <HomeNav />
      <Outlet />
    </div>
  );
};

export default HomePage;
