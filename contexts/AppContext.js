import { useState, createContext } from "react";

const AppContext = createContext({
  location: "",
  setLocation: () => {},
  type: "",
  setType: () => {},
});

export default AppContext;

export const AppProvider = ({ children }) => {
  const [location, setLocation] = useState({});
  const [type, setType] = useState({});

  const value = {
    location,
    setLocation,
    type,
    setType,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
