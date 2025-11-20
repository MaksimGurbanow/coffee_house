import { createContext, useContext } from "react";

export type LocationContextType = {
  switchLanguage: (lang: "tr" | "en" | "ru") => void;
};

export const LocationContext = createContext<LocationContextType>({
  switchLanguage: () => {
    throw new Error("Context not provide");
  },
});
export const useLocationController = () => useContext(LocationContext);
