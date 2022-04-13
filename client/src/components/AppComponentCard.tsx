import React, { FC } from "react";

import Button from "./Button";
import Select from "./Select";
import type { AppComponent } from "../types/app";

const OPERATOR_OPTIONS = ["==", "!=", ">=", "<=", ">", "<"];

type Props = {
  component: AppComponent;
};

const AppComponentCard: FC<Props> = ({ component }) => {
  if (component.relationship === "drive") {
    return (
      <div className="flex items-center space-x-5 overflow-x-auto py-2 pt-5">
        <span className="font-mono text-xs uppercase">USE</span>
        <Button type="button">Select service A</Button>
        <span className="font-mono text-xs uppercase">FOR</span>
        <Button type="button">Select service B</Button>
      </div>
    );
  }

  if (component.relationship === "control") {
    return (
      <div className="space-y-2 py-2 pt-5">
        <span className="block font-mono text-xs">IF</span>
        <div className="ml-5 flex items-center space-x-5">
          <Button type="button">Select service A</Button>
          <Select required className="font-mono" options={OPERATOR_OPTIONS} />
          <input required type="number" placeholder="Value" className="w-24" />
        </div>
        <span className="block font-mono text-xs">THEN</span>
        <div className="ml-5 flex items-center space-x-5">
          <Button type="button">Select service B</Button>
        </div>
      </div>
    );
  }

  return <div>Service</div>;
};

export default AppComponentCard;
