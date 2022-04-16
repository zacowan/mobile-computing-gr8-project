import React, { FC, useState } from "react";

import Button from "./Button";

export type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled?: boolean;
  confirmColor?: "primary" | "danger";
};

const ConfirmDialog: FC<Props> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmDisabled,
}) => {
  return (
    <div className="z-20 max-w-prose space-y-5 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">{title}</h1>
      <p className="text-xs font-light text-slate-600">{description}</p>
      <div className="flex space-x-5">
        <Button disabled={confirmDisabled} primary onClick={onConfirm}>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
