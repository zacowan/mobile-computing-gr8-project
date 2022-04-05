import React, { FC } from "react";

import type { App } from "../types/app";
import {
  PencilIcon,
  PlayIcon,
  ReportIcon,
  StopIcon,
  TrashIcon,
} from "../assets/icons";

type Props = {
  app: App;
  onClickStart?: () => void;
  onClickStop?: () => void;
  onClickLogs?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};

const AppCard: FC<Props> = ({
  app,
  onClickStart,
  onClickStop,
  onClickLogs,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <div className="space-y-2 rounded bg-slate-100 p-5 shadow-md transition-colors">
      {/* Info */}
      <h1 className="text-xl">{app.name}</h1>
      <h2 className="text-xs font-light text-slate-600">
        {app.active ? "Active now" : `Last active: ${app.lastActive}`}
      </h2>
      {/* Buttons */}
      <div className="flex items-center space-x-3 pt-2">
        {/* Start/stop */}
        {app.active ? (
          <button
            onClick={onClickStart}
            className="text-red-600 transition-colors hover:text-red-700"
          >
            <StopIcon className="h-12 w-12" />
          </button>
        ) : (
          <button
            onClick={onClickStop}
            className="text-blue-600 transition-colors hover:text-blue-700"
          >
            <PlayIcon className="h-12 w-12" />
          </button>
        )}
        {/* Logs */}
        <button
          onClick={onClickLogs}
          className="text-slate-600 hover:text-slate-700"
        >
          <ReportIcon />
        </button>
        {/* Edit */}
        <button
          onClick={onClickEdit}
          className="text-slate-600 hover:text-slate-700"
        >
          <PencilIcon />
        </button>
        {/* Delete */}
        <button
          onClick={onClickDelete}
          className="text-slate-600 hover:text-slate-700"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default AppCard;
