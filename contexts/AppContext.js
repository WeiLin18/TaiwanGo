import { useCallback, useRef, createContext, useEffect } from "react";
import apiTourism from "modules/tourism";
import { CATEGORY_TYPES } from "constants/category";
import { fetchListHandler } from "utils/handler";
import useSnackbar from "hooks/useSnackbar";

const AppContext = createContext({
  likeItemsList: [],
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
  // const [likeItemsList, setLikeItemsList] = useState(undefined);
  const likeItemsList = useRef([]);

  useEffect(() => {
    const likeItemsString = localStorage.getItem("likedList") || "";
    const likeItemsArr =
      likeItemsString.length > 0 ? JSON.parse(likeItemsString) : [];

    likeItemsList.current = likeItemsArr;
  }, []);

  // const likeItemsList = useRef(likeItemsArr);

  const fetchCardList = useCallback(
    async ({
      setState,
      setIsLoaderShow,
      typeValue,
      inputValue,
      page = 0,
      itemCount = 32,
    }) => {
      fetchListHandler({
        setState,
        setIsLoaderShow,
        typeValue,
        itemCount,
        isConcat: page !== 0,
        APIFunc: apiTourism.getListApiFunc(typeValue),
        APIQuery: `$top=${itemCount}&$skip=${
          page * itemCount
        }&$select=ID%2CName%2CPicture%2C${
          typeValue === CATEGORY_TYPES.ACTIVITY ? "Location" : "ZipCode"
        }%2C${
          typeValue === CATEGORY_TYPES.RESTAURANT ? "Class" : "Class1"
        }${apiTourism.getFilterQuery(inputValue)}`,
        APIErrorHandler: _APIErrorHandler,
      });
    },
    [_APIErrorHandler]
  );

  // setCardList((list) => list.concat(json));

  const fetchCityCardList = useCallback(
    async ({
      setState,
      setIsLoaderShow,
      locationValue,
      typeValue,
      inputValue,
      page = 0,
      itemCount = 32,
    }) => {
      fetchListHandler({
        setState,
        setIsLoaderShow,
        itemCount,
        city: locationValue,
        typeValue,
        isConcat: page !== 0,
        APIFunc: apiTourism.getListApiFunc(typeValue, true),
        APIQuery: `$top=${itemCount}&$skip=${
          page * itemCount
        }&$select=ID%2CName%2CPicture%2C${
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
    async (props) => {
      if (props?.locationValue === "All") {
        fetchCardList(props);
      } else {
        fetchCityCardList(props);
      }
    },
    [fetchCardList, fetchCityCardList]
  );

  const value = {
    fetchCardList,
    fetchCityCardList,
    handleItemSearch,
    likeItemsList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
