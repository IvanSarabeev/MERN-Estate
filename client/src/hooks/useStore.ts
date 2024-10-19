import { useContext } from "react";
import { StoreContext } from "stores/storeContext";

export default function useStore() {
    return useContext(StoreContext);
}