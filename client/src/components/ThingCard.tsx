import React, { FC } from "react";

import type { Thing } from "../types/thing";

type Props = {
  thing: Thing;
};

const ThingCard: FC<Props> = ({ thing }) => {
  return (
    <div className="space-y-2 rounded border border-slate-200 p-5 shadow-md transition-colors hover:bg-slate-100">
      <h1 className="text-xl font-medium tracking-tight">{thing.name}</h1>
      <p className="text-sm font-light">{thing.description}</p>
      <div className="text-sm font-light text-slate-600">
        <p>ID: {thing.id}</p>
        <p>IP: {thing.ip}</p>
        <p>PORT: {thing.port}</p>
      </div>
    </div>
  );
};

export default ThingCard;
