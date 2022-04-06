import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

const AppEditorPage: FC = () => {
  const [name, setName] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-20 w-full space-y-10">
      <h1 className="text-6xl">New App</h1>
      <form className="space-y-10" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="w-full max-w-md rounded border-slate-600 px-5 py-3 text-slate-600"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <div>S/R here</div>
        <div className="flex space-x-5">
          <Button type="submit" primary>
            Finalize
          </Button>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AppEditorPage;
