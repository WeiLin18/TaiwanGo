import { useState, useCallback, createContext } from "react";
import apiTourism from "modules/tourism";
import { fetchListHandler } from "utils/handler";

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

  // const likeItems = localStorage.getItem("likedList") || "";
  // const likeItemsList = likeItems.length > 0 ? JSON.parse(likeItems) : [];

  const fetchSpotList = useCallback(async ({ setState, itemCount = 30 }) => {
    fetchListHandler({
      setState,
      APIFunc: apiTourism.getSpotList,
      APIQuery: `$top=${itemCount}&$select=ID%2CName%2CPicture%2CZipCode`,
    });
  }, []);

  const value = {
    location,
    setLocation,
    type,
    setType,
    fetchSpotList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
