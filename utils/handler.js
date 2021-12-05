import { CATEGORY_TYPES } from "constants/category";
import { BUILD_ITEM_COUNT, DEFAULT_FILTER_QUERY } from "constants/service";
import apiTourism from "modules/tourism";
import { getItemWithTypeList } from "./common";

/**
 * For fetching API UI State handling
 *
 * @param {function} setState useState second param for changing UI state
 * @param {function} setIsLoaderShow useState second param for showing skelton
 * @param {string} typeValue search type value
 * @param {number} itemCount fetch item count
 * @param {number} isConcat is additional item list
 * @param {function} APIFunc fetch API function
 * @param {string} APIQuery fetch API query
 * @param {function} APIErrorHandler error handler for fetching API failed
 */
export const fetchListHandler = async ({
  setState,
  setIsLoaderShow,
  typeValue,
  itemCount,
  isConcat,
  APIFunc,
  APIQuery,
  APIErrorHandler,
  ...props
}) => {
  isConcat && setIsLoaderShow(true);
  !isConcat && setState((prev) => ({ ...prev, isLoading: true }));
  try {
    const res = await APIFunc({ APIQuery, ...props });
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isFetchAll: res?.length < itemCount,
      isError: false,
      data: (isConcat ? prev.data : []).concat(
        res.map((item) => ({
          ...item,
          typeValue: typeValue.toLowerCase(),
        }))
      ),
    }));
    isConcat && setIsLoaderShow(false);
  } catch (error) {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isError: true,
    }));
    isConcat && setIsLoaderShow(false);
    APIErrorHandler && APIErrorHandler(error);
  }
};

/**
 * For details page getStaticProp func
 *
 * @param {function} APIFunc fetch API function
 */
export const getStaticPropHandlers =
  (APIFunc) =>
  async ({ params }) => {
    const { id } = params;
    try {
      const res = await APIFunc({
        APIQuery: `${DEFAULT_FILTER_QUERY} and ID eq '${id}'`,
      });

      const pageInfo = res[0];
      const nearSpotList = await apiTourism.getNearList({
        typeValue: CATEGORY_TYPES.SCENICSPOT,
        position: pageInfo?.Position,
        targetId: id,
      });
      const nearRestaurantList = await apiTourism.getNearList({
        typeValue: CATEGORY_TYPES.RESTAURANT,
        position: pageInfo?.Position,
        targetId: id,
      });

      return {
        props: {
          ...pageInfo,
          nearSpotList: getItemWithTypeList(
            nearSpotList,
            CATEGORY_TYPES.SCENICSPOT.toLowerCase()
          ),
          nearRestaurantList: getItemWithTypeList(
            nearRestaurantList,
            CATEGORY_TYPES.RESTAURANT.toLowerCase()
          ),
        },
        revalidate: 10,
      };
    } catch (error) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };

/**
 * For details page getStaticPaths func
 *
 * @param {function} APIFunc fetch API function
 */
export const getStaticPathsHandler = (APIFunc) => async () => {
  try {
    const res = await APIFunc({
      APIQuery: `${DEFAULT_FILTER_QUERY}&$select=ID&$top=${BUILD_ITEM_COUNT}`,
    });

    const paths = res.map((item) => ({
      params: {
        id: item.ID,
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
