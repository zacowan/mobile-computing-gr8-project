import { createContext } from "react";

import { Data } from "./types/data";

const DataContext = createContext<Data>({
  things: [],
});

export default DataContext;
