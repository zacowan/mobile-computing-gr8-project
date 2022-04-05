import React, { FC } from "react";

import NavPill from "./NavPill";

const HomeNav: FC = () => {
  return (
    <nav>
      <ul className="flex space-x-5">
        <li>
          <NavPill to="things" text="Things" />
        </li>
        <li>
          <NavPill to="services" text="Services" />
        </li>
        <li>
          <NavPill to="relationships" text="Relationships" />
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
