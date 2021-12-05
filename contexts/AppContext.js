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

  const _getFilterQuery = useCallback((inputValue) => {
    const defaultFilterQuery = `&$filter=Picture/PictureUrl1 ne null`;
    if (!inputValue || inputValue.trim().length === 0) {
      return defaultFilterQuery;
    }

    const keywordList = inputValue.split(" ");
    const keywordQuery = keywordList
      .map((k) => `contains(Name,'${k}') or contains(Description,'${k}')`)
      .join(" or ");

    return `${defaultFilterQuery} and (${keywordQuery})`;
  }, []);

  const _getListApiFunc = useCallback((typeValue, isTargetCity = false) => {
    switch (typeValue) {
      case CATEGORY_TYPES.SCENICSPOT:
        return isTargetCity
          ? apiTourism.getCitySpotList
          : apiTourism.getSpotList;
      case CATEGORY_TYPES.RESTAURANT:
        return isTargetCity
          ? apiTourism.getCityRestaurantList
          : apiTourism.getRestaurantList;
      case CATEGORY_TYPES.ACTIVITY:
        return isTargetCity
          ? apiTourism.getCityActivityList
          : apiTourism.getActivityList;

      default:
        return apiTourism.getCitySpotList;
    }
  }, []);

  const fetchCardList = useCallback(
    async ({ setState, typeValue, inputValue, itemCount = 32 }) => {
      fetchListHandler({
        setState,
        APIFunc: _getListApiFunc(typeValue),
        APIQuery: `$top=${itemCount}&$select=ID%2CName%2CPicture%2C${
          typeValue === CATEGORY_TYPES.ACTIVITY ? "Location" : "ZipCode"
        }%2C${
          typeValue === CATEGORY_TYPES.RESTAURANT ? "Class" : "Class1"
        }${_getFilterQuery(inputValue)}`,
        APIErrorHandler: _APIErrorHandler,
      });
    },
    [_getFilterQuery, _getListApiFunc, _APIErrorHandler]
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
        APIFunc: _getListApiFunc(typeValue, true),
        APIQuery: `$top=${itemCount}&$select=ID%2CName%2CPicture%2C${
          typeValue === CATEGORY_TYPES.ACTIVITY ? "Location" : "ZipCode"
        }%2C${
          typeValue === CATEGORY_TYPES.RESTAURANT ? "Class" : "Class1"
        }${_getFilterQuery(inputValue)}`,
        APIErrorHandler: _APIErrorHandler,
      });
    },
    [_getFilterQuery, _getListApiFunc, _APIErrorHandler]
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
