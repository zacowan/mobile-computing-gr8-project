import React, { FC, useState } from "react";
import { useQueryClient } from "react-query";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import {
  useWorkingDirQuery,
  useUpdateWorkingDir,
  WORKING_DIR_KEY,
} from "../utils/queries";

const SettingsPage: FC = () => {
  const queryClient = useQueryClient();
  const [isEditingWorkingDir, setIsEditingWorkingDir] =
    useState<boolean>(false);
  const [workingDirInputValue, setWorkingDirInputValue] = useState<string>("");
  const { data: workingDirData } = useWorkingDirQuery();
  const updateWorkingDir = useUpdateWorkingDir({
    onSettled: () => {
      setIsEditingWorkingDir(false);
      queryClient.invalidateQueries(WORKING_DIR_KEY);
    },
    onError: () => {
      setTimeout(handleResetError, 5000);
    },
  });

  const handleResetError = () => updateWorkingDir.reset();

  const handleEditWorkingDir = () => {
    setWorkingDirInputValue(workingDirData?.workingDir || "");
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
                : workingDirData?.workingDir || ""
            }
            placeholder="Working directory"
            disabled={isEditingWorkingDir === false}
          />
          {isEditingWorkingDir ? (
            <Button
              disabled={updateWorkingDir.isLoading}
              onClick={() => updateWorkingDir.mutate(workingDirInputValue)}
              primary
            >
              Save
            </Button>
          ) : (
            <Button onClick={handleEditWorkingDir}>Edit</Button>
          )}
        </div>
        {updateWorkingDir.isError && (
          <span className="text-red-600">
            Error: {updateWorkingDir.error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
