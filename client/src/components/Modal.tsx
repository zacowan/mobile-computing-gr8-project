// @ts-nocheck
import React, { FC, useState } from "react";
import ReactDOM from "react-dom";

export const useModal = () => {
  const actions = useState<boolean>(false);

  return actions;
};

type Props = {
  active: boolean;
};

const Modal: FC<Props> = ({ active, children }) =>
  active
    ? ReactDOM.createPortal(
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-slate-900/30">
          {children}
        </div>,
        document.getElementById("modal")
      )
    : null;

export default Modal;
