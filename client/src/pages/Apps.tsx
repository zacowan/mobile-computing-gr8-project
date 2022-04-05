import React, { FC } from "react";

import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

const AppsPage: FC = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className="mt-20 w-full space-y-10">
      <h1 className="text-6xl">Apps</h1>
      <div className="flex flex-col space-y-5">
        <SearchBar onChange={handleSearch} />
        <div className="flex space-x-5">
          <Button
            primary
            onClick={() => {}}
            label="Create Recipe"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
          <Button onClick={() => {}} label="Upload Recipe" />
        </div>
      </div>
    </div>
  );
};

export default AppsPage;
