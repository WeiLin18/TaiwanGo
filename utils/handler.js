import { CATEGORY_TYPES } from "constants/category";
import { DEFAULT_FILTER_QUERY } from "constants/service";
import apiTourism from "modules/tourism";
import { getItemWithTypeList } from "./common";

/**
 * For fetching API UI State handling
 *
 * @param {function} setState useState second param for changing UI state
 * @param {function} APIFunc fetch API function
 * @param {object} APIFuncProp fetch API function prop
 */
export const fetchListHandler = async ({
  setState,
  typeValue,
  APIFunc,
  APIQuery,
  APIErrorHandler,
  ...props
}) => {
  setState((prev) => ({ ...prev, isLoading: true }));
  try {
    const res = await APIFunc({ APIQuery, ...props });
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isError: false,
      data: res.map((item) => ({
        ...item,
        typeValue: typeValue.toLowerCase(),
      })),
    }));
  } catch (error) {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isError: true,
    }));
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
        position: { ...pageInfo.Position },
        targetId: id,
      });
      const nearRestaurantList = await apiTourism.getNearList({
        typeValue: CATEGORY_TYPES.RESTAURANT,
        position: { ...pageInfo.Position },
        targetId: id,
      });

      return {
        props: {
          ...pageInfo,
          nearSpotList: getItemWithTypeList(nearSpotList),
          nearRestaurantList: getItemWithTypeList(nearRestaurantList),
        },
        revalidate: 10,
      };
    } catch (error) {
      return {
        redirect: {
          destination: "/list",
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
      APIQuery: `${DEFAULT_FILTER_QUERY}&$select=ID&$top=1`,
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
