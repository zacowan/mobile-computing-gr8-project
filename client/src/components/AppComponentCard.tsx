import React, { FC } from "react";
import { AppComponent } from "../types/app";

import { TrashIcon } from "../assets/icons";

type Props = {
  ac: AppComponent;
  onDelete: () => void;
};

const AppComponentCard: FC<Props> = ({ ac, onDelete }) => {
  if (ac.relationship === "control") {
    return (
      <div className="flex flex-col space-y-2 rounded px-5 py-3 transition-colors hover:bg-slate-100">
        <span className="block font-mono text-xs uppercase underline">
          Control Relationship
        </span>
        <div className="flex items-center space-x-5 font-mono">
          <span className="text-xs uppercase">IF</span>
          <span>
            {ac.services[0].name}({ac.services[0].input})
          </span>
          <span className="text-xs">{ac.operator}</span>
          <span>{ac.outputCompare}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-5 font-mono text-xs uppercase">THEN</span>
          <span className="mr-5 font-mono">
            {ac.services[1].name}({ac.services[1].input})
          </span>
          <button
            type="button"
            className="ml-auto text-red-600 hover:text-red-700"
            onClick={onDelete}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    );
  }

  if (ac.relationship === "drive") {
    return (
      <div className="flex flex-col space-y-2 rounded px-5 py-3 transition-colors hover:bg-slate-100">
        <span className="block font-mono text-xs uppercase underline">
          Drive Relationship
        </span>
        <div className="flex items-center">
          <span className="mr-5 font-mono">
            {ac.services[1].name}({ac.services[0].name}({ac.services[0].input}))
          </span>
          <button
            type="button"
            className="ml-auto text-red-600 hover:text-red-700"
            onClick={onDelete}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 rounded px-5 py-3 transition-colors hover:bg-slate-100">
      <span className="block font-mono text-xs uppercase underline">
        Service Call
      </span>
      <div className="flex items-center">
        <span className="font-mono">
          {ac.services[0].name}({ac.services[0].input})
        </span>
        <button
          type="button"
          className="ml-auto text-red-600 hover:text-red-700"
          onClick={onDelete}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default AppComponentCard;
