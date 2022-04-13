import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { PlusIcon } from "../assets/icons";
import Modal, { useModal } from "../components/Modal";
import RelationshipSelectSurface from "../components/RelationshipSelectSurface";
import type { AppComponent } from "../types/app";
import AppComponentCard from "../components/AppComponentCard";

const RELATIONSHIP_OPTIONS = ["drive", "control"];

const AppEditorPage: FC = () => {
  const [components, setComponents] = useState<AppComponent[]>([]);
  const [name, setName] = useState<string>("");
  const [isContinuous, setIsContinuous] = useState<boolean>(false);
  const [loopDelay, setLoopDelay] = useState<number>();
  const [relModalActive, setRelModalActive] = useModal();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setName("");
    setIsContinuous(false);
    setLoopDelay(undefined);
    setComponents([]);
  };

  const handleRelationshipSelect = (option: string) => {
    // Update current component with relationship
    const newComponent: AppComponent = {
      services: [],
      relationship: option,
    };
    setComponents([...components, newComponent]);
  };

  return (
    <div className="mt-20 w-full space-y-10">
      {/* Relationship modal */}
      <Modal active={relModalActive}>
        <RelationshipSelectSurface
          onSelect={handleRelationshipSelect}
          onClose={() => setRelModalActive(false)}
          options={RELATIONSHIP_OPTIONS}
        />
      </Modal>
      <h1 className="text-6xl">New App</h1>
      <form
        className="space-y-10"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {/* Name */}
        <input
          required
          type="text"
          placeholder="Name"
          className="w-full max-w-md rounded border-slate-600 px-5 py-3 text-slate-600"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {/* Continuous */}
        <div className="max-w-md space-y-5 rounded bg-slate-100 p-5">
          <div className="flex items-center space-x-5">
            <input
              type="checkbox"
              className="rounded border-slate-600"
              checked={isContinuous}
              onChange={(e) => setIsContinuous(e.target.checked)}
            />
            <label className="text-sm">Check if app is continuous.</label>
          </div>
          {isContinuous && (
            <input
              required={isContinuous}
              type="number"
              placeholder="Loop delay (ms)"
              className="rounded border-slate-600 px-5 py-3 text-sm text-slate-600"
              value={loopDelay}
              onChange={(e) => setLoopDelay(e.target.valueAsNumber)}
            />
          )}
        </div>
        <div className="space-y-5">
          {/* Buttons */}
          <div className="flex w-full max-w-prose">
            <Button
              type="button"
              className="mr-5"
              icon={<PlusIcon />}
              onClick={() => setRelModalActive(true)}
            >
              Add Relationship
            </Button>
            <Button type="button" icon={<PlusIcon />}>
              Add Service
            </Button>
            <Button type="reset" className="ml-auto">
              Clear
            </Button>
          </div>
          {/* Services + Relationships */}
          <div className="max-w-prose space-y-5 rounded border border-slate-200 p-5 shadow-md">
            <span className="block font-mono">start_app</span>
            {components.length > 0 ? (
              <div className="space-y-5 divide-y  p-5">
                {components.map((comp, index) => (
                  <AppComponentCard key={index} component={comp} />
                ))}
              </div>
            ) : (
              <div className="rounded bg-slate-100 p-5 text-sm font-light">
                Add a relationship or service to start.
              </div>
            )}
            <span className="block font-mono">end_app</span>
          </div>
        </div>
        <div className="flex space-x-5">
          <Button type="submit" primary>
            Finalize
          </Button>
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AppEditorPage;
