import React, { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "../components/Button";
import { PlusIcon } from "../assets/icons";
import Modal, { useModal } from "../components/Modal";
import RelationshipSelectSurface from "../components/RelationshipSelectSurface";
import type { App, AppComponent, AppService } from "../types/app";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import ServiceSelectSurface from "../components/ServiceSelectSurface";
import AppComponentCard from "../components/AppComponentCard";
import { useAddApp, useAppsQuery, useUpdateApp } from "../utils/queries";

const AppEditorPage: FC = () => {
  const [searchParams] = useSearchParams();
  const { mutate: addApp, isLoading: isAdding } = useAddApp({
    onSuccess: () => {
      navigate("/apps");
    },
  });
  const { mutate: updateApp, isLoading: isUpdating } = useUpdateApp({
    onSuccess: () => {
      navigate("/apps");
    },
  });
  const { data: appsData } = useAppsQuery();
  const [components, setComponents] = useState<AppComponent[]>([]);
  const [name, setName] = useState<string>("");
  const [appType, setAppType] = useState<string>("");
  const [loopDelay, setLoopDelay] = useState<number>();
  const [relModalActive, setRelModalActive] = useModal();
  const [servModalActive, setServModalActive] = useModal();
  const navigate = useNavigate();

  const appIDToEdit = searchParams.get("appID");

  useEffect(() => {
    if (appIDToEdit && appsData?.apps) {
      const index = appsData.apps.findIndex((app) => app.id === appIDToEdit);
      const appToEdit = appsData.apps[index];

      setName(appToEdit.name);
      setAppType(appToEdit.continuous ? "Continuous" : "Single Use");
      setLoopDelay(appToEdit.loopDelay);
      setComponents(appToEdit.components);
    }
  }, [appIDToEdit, appsData]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const partialAppData: Partial<App> = {
      name,
      continuous: appType === "Continuous",
      loopDelay,
      components,
    };
    if (appIDToEdit) {
      updateApp({ ...partialAppData, id: appIDToEdit });
    } else {
      addApp(partialAppData);
    }
  };

  const handleReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setComponents([]);
  };

  const handleAddRelationship = (ac: AppComponent) => {
    setComponents([...components, ac]);
  };

  const handleAddService = (as: AppService) => {
    const ac: AppComponent = {
      services: [as],
    };
    setComponents([...components, ac]);
  };

  const handleDeleteComponent = (index: number) => {
    const newComponents = [
      ...components.slice(0, index),
      ...components.slice(index + 1),
    ];
    setComponents(newComponents);
  };

  const finalizeButtonDisabled = () => {
    if (!name || !appType) return true;
    if (appType === "Continuous" && !loopDelay) return true;
    if (components.length <= 0) return true;
    if (isAdding || isUpdating) return true;

    return false;
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
      {/* Service modal */}
      <Modal active={servModalActive}>
        <ServiceSelectSurface
          title="Add service"
          onSelect={handleAddService}
          onClose={() => setServModalActive(false)}
        />
      </Modal>
      <h1 className="text-6xl">
        {appIDToEdit === undefined ? "New App" : "Edit App"}
      </h1>
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

        {/* App Type */}
        <div className="flex w-fit flex-col space-y-2">
          <label>App Type</label>
          <Select
            required
            options={["Single Use", "Continuous"]}
            value={appType}
            onChange={(e) => setAppType(e.target.value)}
          />
        </div>
        {appType === "Continuous" && (
          <div className="flex w-fit flex-col space-y-2">
            <label>Loop Delay (ms)</label>
            <TextInput
              required
              type="number"
              placeholder="Delay"
              className="w-fit"
              value={loopDelay}
              onChange={(e) => setLoopDelay(e.target.valueAsNumber)}
            />
          </div>
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
              <Button
                onClick={() => setServModalActive(true)}
                type="button"
                icon={<PlusIcon />}
              >
                Add Service
              </Button>
              <Button type="reset" className="ml-auto">
                Clear
              </Button>
            </div>
            {/* Services + Relationships */}
            <div className="max-w-prose space-y-5 rounded border border-slate-200 p-5 shadow-md">
              <span className="block font-mono uppercase">start_app</span>
              {components.length > 0 ? (
                <div className="space-y-5 divide-y  p-5">
                  {components.map((ac, index) => (
                    <div className={index === 0 ? "" : "pt-5"} key={index}>
                      <AppComponentCard
                        onDelete={() => handleDeleteComponent(index)}
                        ac={ac}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded bg-slate-100 p-5 text-sm font-light">
                  Add a relationship or service to start.
                </div>
              )}
              <span className="block font-mono uppercase">end_app</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-5">
          <Button disabled={finalizeButtonDisabled()} type="submit" primary>
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
