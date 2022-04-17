import React, { FC, useState, useEffect } from "react";

import Button from "./Button";
import type { Service } from "../types/service";
import type { AppService } from "../types/app";
import { getSearchResults } from "../utils/search";
import SearchBar from "./SearchBar";
import TextInput from "./TextInput";
import { useDiscoverQuery } from "../utils/queries";

export type Props = {
  onSelect: (service: AppService) => void;
  onClose: () => void;
  title?: string;
  serviceRequirement?: "input" | "output";
};

const ServiceSelectSurface: FC<Props> = ({
  onSelect,
  onClose,
  title,
  serviceRequirement,
}) => {
  const { data: discoverData } = useDiscoverQuery();
  const [filteredServices, setFilteredServices] = useState<Array<Service>>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filtered = getSearchResults(
      searchTerm,
      discoverData?.services || [],
      ["name", "thingID", "keywords"]
    );
    const secondFiltered = filtered.filter((val) => {
      if (serviceRequirement === "output") {
        return val.output !== "NULL";
      } else if (serviceRequirement === "input") {
        return val.inputs.length > 0;
      } else {
        return true;
      }
    });
    setFilteredServices(secondFiltered);
  }, [discoverData, searchTerm, serviceRequirement]);

  const handleSelect = (service: Service, input?: string) => {
    const appService: AppService = {
      name: service.name,
      thingID: service.thingID,
      input: input,
      output: service.output !== "NULL",
      spaceID: service.spaceID,
    };
    onSelect(appService);
    onClose();
  };

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    s: Service
  ) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = data.get("input");
    const parsedInput = input === null ? undefined : String(input);
    handleSelect(s, parsedInput);
  };

  return (
    <div className="z-20 w-full max-w-4xl space-y-10 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">{title}</h1>
      <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      {filteredServices && filteredServices.length === 0 && (
        <span className="block text-sm font-light text-slate-600">
          {!discoverData || discoverData.services.length === 0
            ? "Waiting for services to be declared in the smart space..."
            : `No services match the term ${searchTerm}.`}
        </span>
      )}
      {filteredServices && filteredServices.length > 0 && (
        <div className="relative max-h-72 overflow-x-auto overflow-y-auto rounded border border-slate-200 shadow-md">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead className="border-b border-slate-200 uppercase">
              <tr>
                <th className="py-3 pl-5 font-medium">Name</th>
                <th className="py-3 pr-5 font-medium">Thing ID</th>
                <th className="py-3 pr-5 font-medium">Input</th>
                <th className="py-3 pr-5 font-medium">
                  <span className="sr-only">Choose</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {filteredServices.map((service, index) => (
                <tr
                  className="font-light transition-colors hover:bg-slate-100"
                  key={index}
                >
                  <td className="py-3 pl-5">{service.name}</td>
                  <td className="py-3 pr-5">{service.thingID}</td>
                  <td className="py-3 pr-5">
                    <form
                      id={`form-service-${index}`}
                      onSubmit={(e) => handleFormSubmit(e, service)}
                    >
                      {service.inputs.length > 0 &&
                      serviceRequirement !== "input" ? (
                        <TextInput
                          required
                          className="w-36"
                          placeholder="Value"
                          name="input"
                        />
                      ) : serviceRequirement !== "input" ? (
                        "None"
                      ) : (
                        "Input from Service A"
                      )}
                    </form>
                  </td>
                  <td className="py-3 pr-5">
                    <Button
                      primary
                      type="submit"
                      form={`form-service-${index}`}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Button onClick={onClose}>Cancel</Button>
    </div>
  );
};

export default ServiceSelectSurface;
