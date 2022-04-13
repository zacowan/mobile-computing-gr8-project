import React, { FC, useState } from "react";
import { AppService } from "../types/app";

import Button from "./Button";
import Select from "./Select";
import TextInput from "./TextInput";
import type { AppComponent } from "../types/app";
import Modal, { useModal } from "./Modal";
import ServiceSelectSurface from "./ServiceSelectSurface";

const OPERATOR_OPTIONS = ["==", "!=", ">=", "<=", ">", "<"];
const RELATIONSHIP_OPTIONS = ["control", "drive"];

export type Props = {
  onClose: () => void;
  onAdd: (ac: AppComponent) => void;
};

const RelationshipSelectSurface: FC<Props> = ({ onClose, onAdd }) => {
  const [relationship, setRelationship] = useState<string>("");
  const [serviceA, setServiceA] = useState<AppService>();
  const [serviceB, setServiceB] = useState<AppService>();
  const [operator, setOperator] = useState<string>("");
  const [compareValue, setCompareValue] = useState<string>("");
  const [servAModalActive, setServAModalActive] = useModal();
  const [servBModalActive, setServBModalActive] = useModal();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleAdd();
  };

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
      {/* Service A modal */}
      <Modal active={servAModalActive}>
        <ServiceSelectSurface
          onClose={() => setServAModalActive(false)}
          onSelect={(as) => setServiceA(as)}
        />
      </Modal>
      {/* Service B modal */}
      <Modal active={servBModalActive}>
        <ServiceSelectSurface
          onClose={() => setServBModalActive(false)}
          onSelect={(as) => setServiceB(as)}
        />
      </Modal>
      <h1 className="text-lg font-medium">Add relationship</h1>
      <form className="space-y-10" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          {/* Relationship */}
          <div className="flex flex-col space-y-2">
            <label>Relationship Type</label>
            <Select
              required
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
              <Button onClick={() => setServAModalActive(true)} type="button">
                {serviceA === undefined ? "Service A" : serviceA.name}
              </Button>
              <Button onClick={() => setServBModalActive(true)} type="button">
                {serviceB === undefined ? "Service B" : serviceB.name}
              </Button>
            </div>
          </div>
          {/* Operator + compare value */}
          {relationship === "control" && (
            <>
              <div className="flex flex-col space-y-2">
                <label>Operator</label>
                <Select
                  required
                  onChange={(e) => setOperator(e.target.value)}
                  value={operator}
                  className="w-fit"
                  options={OPERATOR_OPTIONS}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label>Compare Value</label>
                <TextInput
                  required
                  onChange={(e) => setCompareValue(e.target.value)}
                  value={compareValue}
                  className="w-fit"
                  placeholder="Value"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex space-x-5">
          <Button type="submit" primary>
            Add
          </Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RelationshipSelectSurface;
