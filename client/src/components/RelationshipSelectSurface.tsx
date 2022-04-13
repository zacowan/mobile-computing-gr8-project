import React, { FC } from "react";

import Button from "./Button";

export type Props = {
  onSelect: (option: string) => void;
  onClose: () => void;
  options: string[];
};

const RelationshipSelectSurface: FC<Props> = ({
  onSelect,
  onClose,
  options,
}) => {
  const handleSelect = (op: string) => {
    onSelect(op);
    onClose();
  };

  return (
    <div className="z-20 w-full max-w-prose space-y-10 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">Choose a relationship to add</h1>
      <div className="flex space-x-5">
        {options.map((op, index) => (
          <Button key={index} type="button" onClick={() => handleSelect(op)}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </Button>
        ))}
      </div>
      <Button onClick={onClose}>Cancel</Button>
    </div>
  );
};

export default RelationshipSelectSurface;
