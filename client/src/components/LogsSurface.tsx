import React, { FC, useRef, useEffect, useState } from "react";
import dayjs from "dayjs";

import Button from "./Button";
import type { App } from "../types/app";

export type Props = {
  app: App;
  onClose: () => void;
};

const LogsSurface: FC<Props> = ({ app, onClose }) => {
  const endLogsRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  const scrollToBottom = () => {
    // @ts-ignore
    endLogsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [app, autoScroll]);

  return (
    <div className="z-20 w-full max-w-prose space-y-5 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">Logs for {app.name}</h1>
      <div className="max-h-96 divide-y overflow-y-auto rounded border border-slate-200 px-5 py-4">
        {app.logs.map((log, index) => (
          <span key={index} className="block space-y-1 py-3 text-sm font-light">
            <span className="block font-medium">
              {dayjs(new Date(log.timestamp)).format("llll")}
            </span>
            <span className="block">{log.message}</span>
          </span>
        ))}
        <span ref={endLogsRef} />
      </div>
      <label className="flex items-center space-x-2 py-3 text-sm">
        <input
          checked={autoScroll}
          onChange={() => setAutoScroll(!autoScroll)}
          type="checkbox"
        />
        <span>Auto-scroll</span>
      </label>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default LogsSurface;
