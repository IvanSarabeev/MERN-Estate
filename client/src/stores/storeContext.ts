import { createContext } from "react";
import * as stores from "stores/index";

const appStores = {...stores};

export const StoreContext = createContext(appStores);