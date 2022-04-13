import React, { FC, useContext, useState, useEffect } from "react";

import Button from "./Button";
import DataContext from "../DataContext";
import type { Service } from "../types/service";
import { getSearchResults } from "../utils/search";
import SearchBar from "./SearchBar";
import TextInput from "./TextInput";

export type Props = {
  onSelect: (service: Service, input: number) => void;
  onClose: () => void;
  title?: string;
};

const ServiceSelectSurface: FC<Props> = ({ onSelect, onClose, title }) => {
  const { services } = useContext(DataContext);
  const [filteredServices, setFilteredServices] = useState<Array<Service>>();
  const [searchTerm, setSearchTerm] = useState<string>();

  useEffect(() => {
    const filtered = getSearchResults(searchTerm, services, [
      "name",
      "thingID",
      "keywords",
    ]);
    setFilteredServices(filtered);
  }, [services, searchTerm]);

  const handleSelect = (service: Service, input: number) => {
    onSelect(service, input);
    onClose();
  };

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    s: Service
  ) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = Number(data.get("input"));
    handleSelect(s, input);
  };

  return (
    <div className="z-20 w-full max-w-4xl space-y-10 rounded bg-white p-10 shadow-md">
      <h1 className="text-lg font-medium">{title}</h1>
      <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      {filteredServices && filteredServices.length === 0 && (
        <span className="block text-sm font-light text-slate-600">
          Waiting for services to be declared in the smart space...
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
                      {service.inputs.length > 0 ? (
                        <TextInput
                          required
                          type="number"
                          className="w-36"
                          placeholder="Value"
                          name="input"
                        />
                      ) : (
                        "None"
                      )}
                    </form>
                  </td>
                  <td className="py-3 pr-5">
                    <Button type="submit" form={`form-service-${index}`}>
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