import React, { FC, useState } from "react";

import type { App } from "../types/app";
import {
  PencilIcon,
  PlayIcon,
  ReportIcon,
  StopIcon,
  TrashIcon,
} from "../assets/icons";
import ConfirmDialog from "./ConfirmDialog";
import Modal, { useModal } from "../components/Modal";
import dayjs from "dayjs";

type Props = {
  app: App;
  onClickStart: () => Promise<void>;
  onClickStop: () => Promise<void>;
  onClickLogs: () => Promise<void>;
  onClickEdit: () => Promise<void>;
  onClickDelete: () => Promise<void>;
};

const AppCard: FC<Props> = ({
  app,
  onClickStart,
  onClickStop,
  onClickLogs,
  onClickEdit,
  onClickDelete,
}) => {
  const [startStopDisabled, setStartStopDisabled] = useState<boolean>(false);
  const [modalActive, setModalActive] = useModal();

  const handleClickStartStop = async (
    callback: (() => Promise<void>) | undefined
  ) => {
    if (callback) {
      setStartStopDisabled(true);
      await callback();
      setStartStopDisabled(false);
    }
  };

  const handleDelete = async () => {
    await onClickDelete();
    setModalActive(false);
  };

  console.log(new Date(Number(app.lastActive)));

  return (
    <div className="space-y-2 rounded border border-slate-200 p-5 shadow-md transition-colors hover:bg-slate-100">
      {/* Confirm Dialog Modal */}
      <Modal active={modalActive}>
        <ConfirmDialog
          title={`Delete ${app.name}`}
          description="Are you sure you want to delete this app?"
          onConfirm={handleDelete}
          onCancel={() => setModalActive(false)}
        />
      </Modal>
      {/* Info */}
      <h1 className="text-xl font-medium tracking-tight">{app.name}</h1>
      <h2 className="text-sm font-light text-slate-600">
        {app.active
          ? "Active now"
          : `Last active: ${dayjs(new Date(Number(app.lastActive))).fromNow()}`}
      </h2>
      {/* Buttons */}
      <div className="flex items-center space-x-3 pt-2">
        {/* Start/stop */}
        {app.active ? (
          <button
            onClick={() => handleClickStartStop(onClickStop)}
            className="text-red-600 transition-colors hover:text-red-700 disabled:text-red-700 disabled:hover:cursor-not-allowed"
            disabled={startStopDisabled}
          >
            <StopIcon className="h-12 w-12" />
          </button>
        ) : (
          <button
            onClick={() => handleClickStartStop(onClickStart)}
            className="text-blue-600 transition-colors hover:text-blue-700 disabled:text-blue-700 disabled:hover:cursor-not-allowed"
            disabled={startStopDisabled}
          >
            <PlayIcon className="h-12 w-12" />
          </button>
        )}
        {/* Logs */}
        {!app.active && (
          <>
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
              onClick={() => setModalActive(true)}
              className="text-slate-600 hover:text-slate-700"
            >
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppCard;
