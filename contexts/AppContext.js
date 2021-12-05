import { useCallback, createContext } from "react";
import apiTourism from "modules/tourism";
import { CATEGORY_TYPES } from "constants/category";
import { fetchListHandler } from "utils/handler";
import useSnackbar from "hooks/useSnackbar";

const AppContext = createContext({
  fetchCardList: () => {},
  fetchCityCardList: () => {},
  handleItemSearch: () => {},
});

export default AppContext;

export const AppProvider = ({ children }) => {
  const { showErrorSnackbar } = useSnackbar();
  /**
   * For error handling when call API failed
   *
   * @param {number} status api response status
   */
  const _APIErrorHandler = useCallback(
    (error) => {
      showErrorSnackbar({ msg: error?.message || "API failed" });
    },
    [showErrorSnackbar]
  );

  // const likeItems = localStorage.getItem("likedList") || "";
  // const likeItemsList = likeItems.length > 0 ? JSON.parse(likeItems) : [];

  // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=18&$skip=0&$format=JSON&$select=ID,Name,Address,Picture,Class1,Class2,Class3,OpenTime,TicketInfo&$filter=Picture/PictureUrl1%20ne%20null%20and%20(contains(Name,%27%E7%89%9B%27)%20or%20contains(Class1,%27%E7%89%9B%27)%20or%20contains(Class2,%27%E7%89%9B%27)%20or%20contains(Class3,%27%E7%89%9B%27))

  const fetchCardList = useCallback(
    async ({ setState, typeValue, inputValue, itemCount = 32 }) => {
      fetchListHandler({
        setState,
        typeValue,
        APIFunc: apiTourism.getListApiFunc(typeValue),
        APIQuery: `$top=${itemCount}&$select=ID%2CName%2CPicture%2C${
          typeValue === CATEGORY_TYPES.ACTIVITY ? "Location" : "ZipCode"
        }%2C${
          typeValue === CATEGORY_TYPES.RESTAURANT ? "Class" : "Class1"
        }${apiTourism.getFilterQuery(inputValue)}`,
        APIErrorHandler: _APIErrorHandler,
      });
    },
    [_APIErrorHandler]
  );

  const fetchCityCardList = useCallback(
    async ({
      setState,
      locationValue,
      typeValue,
      inputValue,
      itemCount = 32,
    }) => {
      fetchListHandler({
        setState,
        city: locationValue,
        typeValue,
        APIFunc: apiTourism.getListApiFunc(typeValue, true),
        APIQuery: `$top=${itemCount}&$select=ID%2CName%2CPicture%2C${
          typeValue === CATEGORY_TYPES.ACTIVITY ? "Location" : "ZipCode"
        }%2C${
          typeValue === CATEGORY_TYPES.RESTAURANT ? "Class" : "Class1"
        }${apiTourism.getFilterQuery(inputValue)}`,
        APIErrorHandler: _APIErrorHandler,
      });
    },
    [_APIErrorHandler]
  );
  const handleItemSearch = useCallback(
    async ({ setState, locationValue, typeValue, inputValue }) => {
      if (locationValue === "All") {
        fetchCardList({ setState, typeValue, inputValue });
      } else {
        fetchCityCardList({ setState, locationValue, typeValue, inputValue });
      }
    },
    [fetchCardList, fetchCityCardList]
  );

  const value = {
    fetchCardList,
    fetchCityCardList,
    handleItemSearch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
