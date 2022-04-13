import React, { FC, useState } from "react";
import { AppService } from "../types/app";

import Button from "./Button";
import Select from "./Select";
import TextInput from "./TextInput";
import type { AppComponent } from "../types/app";

const OPERATOR_OPTIONS = ["==", "!=", ">=", "<=", ">", "<"];
const RELATIONSHIP_OPTIONS = ["control", "drive"];

export type Props = {
  onClose: () => void;
  onAdd: (ac: AppComponent) => void;
};

const RelationshipSelectSurface: FC<Props> = ({ onClose, onAdd }) => {
  const [relationship, setRelationship] = useState<string>();
  const [serviceA, setServiceA] = useState<AppService>();
  const [serviceB, setServiceB] = useState<AppService>();
  const [operator, setOperator] = useState<string>();
  const [compareValue, setCompareValue] = useState<number>();

  const handleAdd = () => {
    if (serviceA && serviceB) {
      const appComponent: AppComponent = {
        relationship: relationship,
        operator: operator,
        outputCompare: compareValue,
        services: [serviceA, serviceB],
      };
      onAdd(appComponent);
      onClose();
    } else {
      console.error("Must have service A and B.");
    }
  };

  return (
    <div className="z-20 w-full max-w-prose space-y-10 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">Choose a relationship to add</h1>
      <div className="flex flex-col space-y-5">
        {/* Relationship */}
        <div className="flex flex-col space-y-2">
          <label>Relationship Type</label>
          <Select
            onChange={(e) => setRelationship(e.target.value)}
            value={relationship}
            className="w-fit"
            options={RELATIONSHIP_OPTIONS}
          />
        </div>
        {/* Services */}
        <div className="flex flex-col space-y-2">
          <label>Services</label>
          <div className="flex space-x-5">
            <Button>Service A</Button>
            <Button>Service B</Button>
          </div>
        </div>
        {/* Operator + compare value */}
        {relationship === "control" && (
          <>
            <div className="flex flex-col space-y-2">
              <label>Operator</label>
              <Select
                onChange={(e) => setOperator(e.target.value)}
                value={operator}
                className="w-fit"
                options={OPERATOR_OPTIONS}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Compare Value</label>
              <TextInput
                onChange={(e) => setCompareValue(Number(e.target.value))}
                value={compareValue}
                className="w-fit"
                type="number"
                placeholder="Value"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex space-x-5">
        <Button primary onClick={handleAdd}>
          Add
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
};

export default RelationshipSelectSurface;
