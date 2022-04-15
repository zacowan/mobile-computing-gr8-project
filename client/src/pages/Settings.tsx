import React, { FC, useState } from "react";
import { useQuery, useMutation } from "react-query";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { WorkingDirData } from "../types/WorkingDirData";
import { getWorkingDir, putWorkingDir } from "../utils/apiCalls/workingDir";

const SettingsPage: FC = () => {
  const [isEditingWorkingDir, setIsEditingWorkingDir] =
    useState<boolean>(false);
  const [workingDirInputValue, setWorkingDirInputValue] = useState<string>("");
  const workingDirData = useQuery<WorkingDirData, Error>(
    "workingDir",
    getWorkingDir
  );
  const mutateWorkingDirData = useMutation<void, Error, string, void>(
    "workingDir",
    putWorkingDir,
    {
      onSettled: () => {
        setIsEditingWorkingDir(false);
      },
      onError: () => {
        setTimeout(handleResetError, 5000);
      },
    }
  );

  const handleResetError = () => mutateWorkingDirData.reset();

  const handleEditWorkingDir = () => {
    setWorkingDirInputValue(workingDirData.data?.workingDir || "");
    setIsEditingWorkingDir(true);
  };

  return (
    <div className="mt-20 w-full space-y-10">
      <h1 className="text-6xl">Settings</h1>
      <div className="flex flex-col space-y-2">
        <label>App Working Directory</label>
        <div className="flex items-center space-x-5">
          <TextInput
            onChange={(e) => setWorkingDirInputValue(e.target.value)}
            value={
              isEditingWorkingDir
                ? workingDirInputValue
                : workingDirData.data?.workingDir
            }
            placeholder="Working directory"
            disabled={isEditingWorkingDir === false}
          />
          {isEditingWorkingDir ? (
            <Button
              disabled={mutateWorkingDirData.isLoading}
              onClick={() => mutateWorkingDirData.mutate(workingDirInputValue)}
              primary
            >
              Save
            </Button>
          ) : (
            <Button onClick={handleEditWorkingDir}>Edit</Button>
          )}
        </div>
        {mutateWorkingDirData.isError && (
          <span className="text-red-600">
            Error changing app working directory:{" "}
            {mutateWorkingDirData.error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
