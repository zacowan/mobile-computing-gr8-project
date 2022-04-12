import React, { FC } from "react";
import dayjs from "dayjs";

import Button from "./Button";
import type { App } from "../types/app";

export type Props = {
  app: App;
  onClose: () => void;
};

const LogsSurface: FC<Props> = ({ app, onClose }) => {
  return (
    <div className="z-20 w-full max-w-prose space-y-5 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">Logs for {app.name}</h1>
      <div className="max-h-60 divide-y overflow-y-auto rounded border border-slate-200 px-5 py-4">
        {app.logs.map((log, index) => (
          <span key={index} className="block py-1 text-xs font-light">
            <span className="font-mono tracking-tighter">
              [{dayjs(new Date(log.timestamp)).format("llll")}]
            </span>
            <span> - </span>
            <span>{log.message}</span>
          </span>
        ))}
      </div>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default LogsSurface;
