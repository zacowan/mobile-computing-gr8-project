import React, { FC, useState } from "react";

import Button from "./Button";

export type Props = {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  confirmColor?: "primary" | "danger";
};

const ConfirmDialog: FC<Props> = ({
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  const [debouce, setDebouce] = useState<boolean>(false);

  const handleClickConfirm = async () => {
    setDebouce(true);
    await onConfirm();
    setDebouce(false);
  };

  return (
    <div className="z-20 max-w-prose space-y-5 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">{title}</h1>
      <p className="text-xs text-slate-600">{description}</p>
      <div className="flex space-x-5">
        <Button disabled={debouce} primary onClick={handleClickConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
