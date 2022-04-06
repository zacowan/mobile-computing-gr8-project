import React, { FC } from "react";

import type { Thing } from "../types/thing";

type Props = {
  thing: Thing;
};

const ThingCard: FC<Props> = ({ thing }) => {
  return (
    <div className="space-y-2 rounded bg-slate-100 p-5 shadow-md transition-colors hover:bg-slate-200">
      <h1 className="text-xl">{thing.name}</h1>
      <p className="text-xs font-light">{thing.description}</p>
      <div className="text-xs font-light text-slate-600">
        <p>ID: {thing.id}</p>
        <p>IP: {thing.ip}</p>
        <p>PORT: {thing.port}</p>
      </div>
    </div>
  );
};

export default ThingCard;
