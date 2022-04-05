import React, { FC, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import DataContext from "../../DataContext";
import type { Service } from "../../types/service";
import { getSearchResults } from "../../utils/search";

const ServicesPage: FC = () => {
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

  return (
    <div className="w-full space-y-10">
      <h1 className="text-6xl">Services</h1>
      <SearchBar value={searchTerm} onChange={(val) => setSearchTerm(val)} />
      <table className="w-full max-w-7xl table-auto border-collapse text-left shadow-md">
        <thead className="rounded-tl rounded-tr bg-slate-200 text-sm">
          <th className="rounded-tl py-3 pl-5 font-medium">Name</th>
          <th className="py-3 pr-5 font-medium">Thing ID</th>
          <th className="rounded-tr py-3 pr-5 font-medium">Keywords</th>
          {/* <th className="py-3 pr-5 font-medium"></th> */}
        </thead>
        <tbody className="bg-slate-100 text-xs text-slate-600">
          {filteredServices &&
            filteredServices.map((service, index) => (
              <tr
                className="font-light transition-colors hover:bg-slate-200"
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
  );
};

export default ServicesPage;
