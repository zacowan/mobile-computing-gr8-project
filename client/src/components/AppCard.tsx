import React, { FC } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

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
import LogsSurface from "./LogsSurface";
import {
  APPS_KEY,
  useDeleteApp,
  useStartApp,
  useStopApp,
} from "../utils/queries";

type Props = {
  app: App;
};

const AppCard: FC<Props> = ({ app }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteApp, isLoading: isDeleting } = useDeleteApp({
    onSuccess: () => queryClient.invalidateQueries(APPS_KEY),
  });
  const { mutate: startApp, isLoading: isStarting } = useStartApp({
    onSuccess: () => queryClient.invalidateQueries(APPS_KEY),
  });
  const { mutate: stopApp, isLoading: isStopping } = useStopApp({
    onSuccess: () => queryClient.invalidateQueries(APPS_KEY),
  });
  const [deleteModalActive, setDeleteModalActive] = useModal();
  const [logsModalActive, setLogsModalActive] = useModal();

  const determineStatusText = () => {
    if (app.active) return "Active now";

    if (app.lastActive)
      return `Last active: ${dayjs(new Date(app.lastActive)).fromNow()}`;

    return "Successfully generated";
  };

  const handleDelete = () => {
    deleteApp(app.id);
    setDeleteModalActive(false);
  };

  return (
    <div className="space-y-2 rounded border border-slate-200 p-5 shadow-md transition-colors hover:bg-slate-100">
      {/* Confirm Dialog Modal */}
      <Modal active={deleteModalActive}>
        <ConfirmDialog
          title={`Delete ${app.name}`}
          description="Are you sure you want to delete this app?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteModalActive(false)}
          confirmDisabled={isDeleting}
        />
      </Modal>
      {/* Logs Surface Modal */}
      <Modal active={logsModalActive}>
        <LogsSurface app={app} onClose={() => setLogsModalActive(false)} />
      </Modal>
      {/* Info */}
      <h1 className="text-xl font-medium tracking-tight">{app.name}</h1>
      <h2 className="text-sm font-light text-slate-600">
        {determineStatusText()}
      </h2>
      {/* Buttons */}
      <div className="flex items-center space-x-3 pt-2">
        {/* Start/stop */}
        {app.active && app.continuous === true ? (
          <button
            onClick={() => startApp(app.id)}
            className="text-red-600 transition-colors hover:text-red-700 disabled:text-red-700 disabled:hover:cursor-not-allowed"
            disabled={isStarting}
          >
            <StopIcon className="h-12 w-12" />
          </button>
        ) : (
          <button
            onClick={() => stopApp(app.id)}
            className="text-blue-600 transition-colors hover:text-blue-700 disabled:text-blue-700 disabled:hover:cursor-not-allowed"
            disabled={isStopping}
          >
            <PlayIcon className="h-12 w-12" />
          </button>
        )}
        {/* Logs */}
        <button
          onClick={() => setLogsModalActive(true)}
          className="text-slate-600 hover:text-slate-700"
        >
          <ReportIcon />
        </button>
        {!app.active && (
          <>
            {/* Edit */}
            <button
              onClick={() => navigate(`editor?appID=${app.id}`)}
              className="text-slate-600 hover:text-slate-700"
            >
              <PencilIcon />
            </button>
            {/* Delete */}
            <button
              onClick={() => setDeleteModalActive(true)}
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
