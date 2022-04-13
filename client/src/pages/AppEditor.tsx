import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { PlusIcon } from "../assets/icons";
import Modal, { useModal } from "../components/Modal";
import RelationshipSelectSurface from "../components/RelationshipSelectSurface";
import type { AppComponent } from "../types/app";
import TextInput from "../components/TextInput";
import Select from "../components/Select";

const AppEditorPage: FC = () => {
  const [components, setComponents] = useState<AppComponent[]>([]);
  const [name, setName] = useState<string>("");
  const [isContinuous, setIsContinuous] = useState<string>();
  const [loopDelay, setLoopDelay] = useState<number>();
  const [relModalActive, setRelModalActive] = useModal();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setName("");
    setIsContinuous("");
    setLoopDelay(undefined);
    setComponents([]);
  };

  const handleAddRelationship = (ac: AppComponent) => {
    console.log(ac);
  };

  const handleUpdateComponent = (comp: AppComponent, index: number) => {
    let comps = [...components];
    comps.splice(index, 1, comp);
    setComponents(comps);
  };

  return (
    <div className="mt-20 w-full space-y-10">
      {/* Relationship modal */}
      <Modal active={relModalActive}>
        <RelationshipSelectSurface
          onAdd={handleAddRelationship}
          onClose={() => setRelModalActive(false)}
        />
      </Modal>
      <h1 className="text-6xl">New App</h1>
      <form
        className="space-y-10"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label>App Name</label>
          <TextInput
            required
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        {/* Continuous */}
        <div className="flex w-fit flex-col space-y-2">
          <label>App Type</label>
          <Select
            required
            options={["Single Use", "Continuous"]}
            value={isContinuous}
            onChange={(e) => setIsContinuous(e.target.value)}
          />
        </div>
        {isContinuous === "Continuous" && (
          <TextInput
            required
            type="number"
            placeholder="Loop delay (ms)"
            className="w-fit"
            value={loopDelay}
            onChange={(e) => setLoopDelay(e.target.valueAsNumber)}
          />
        )}
        <div className="flex flex-col space-y-2">
          <label>App Components</label>
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
                    <div>{index}</div>
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
