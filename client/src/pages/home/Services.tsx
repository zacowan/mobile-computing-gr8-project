import React, { FC, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import DataContext from "../../DataContext";
import type { Service } from "../../types/service";
import { getSearchResults } from "../../utils/search";

const ServicesPage: FC = () => {
  const { services } = useContext(DataContext);
  const [filteredServices, setFilteredServices] = useState<Array<Service>>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filtered = getSearchResults(searchTerm, services, [
      "name",
      "thingID",
      "keywords",
    ]);
    setFilteredServices(filtered);
  }, [services, searchTerm]);

  return (
    <div className="w-full space-y-10">
      <h1 className="text-6xl">Services</h1>
      <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      {filteredServices && filteredServices.length === 0 && (
        <span className="block text-sm font-light text-slate-600">
          Waiting for services to be declared in the smart space...
        </span>
      )}
      {filteredServices && filteredServices.length > 0 && (
        <div className="relative max-w-7xl overflow-x-auto rounded border border-slate-200 shadow-md">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead className="border-b border-slate-200 uppercase">
              <tr>
                <th className="py-3 pl-5 font-medium">Name</th>
                <th className="py-3 pr-5 font-medium">Thing ID</th>
                <th className="py-3 pr-5 font-medium">Keywords</th>
                {/* <th className="py-3 pr-5 font-medium">
                <span className="sr-only">Details</span>
              </th> */}
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
                  <td className="py-3 pr-5">{service.keywords}</td>
                  {/* <td className="py-3 pr-5">
                  <Link to="">Details</Link>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
