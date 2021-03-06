import apiInstance from "./apiInstance";
import { CATEGORY_TYPES } from "constants/category";
import { DEFAULT_FILTER_QUERY } from "constants/service";

const apiTourism = {
  getFilterQuery: (inputValue, prefix) => {
    if (!inputValue || inputValue.trim().length === 0) {
      return DEFAULT_FILTER_QUERY;
    }

    const keywordList = inputValue.split(" ");
    const keywordQuery = keywordList
      .map(
        (k) => `contains(${prefix}Name,'${k}') or contains(Description,'${k}')`
      )
      .join(" or ");

    return `${DEFAULT_FILTER_QUERY} and (${keywordQuery})`;
  },

  getFormatKeyName: (list, prefix) =>
    list.map((item) => ({
      ...item,
      ID: item[`${prefix}ID`],
      Name: item[`${prefix}Name`],
    })),

  getListApiFunc: (typeValue, isTargetCity = false) => {
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
  },

  getNearList: async ({
    typeValue,
    position,
    targetId,
    itemCount = 4,
    distance = 2000,
    tokenSource,
  } = {}) => {
    const APIQuery = `$top=${itemCount}&$select=${typeValue}ID%2C${typeValue}Name%2CPosition%2CPicture%2C${
      typeValue === CATEGORY_TYPES.ACTIVITY ? "Location" : "ZipCode"
    }%2C${
      typeValue === CATEGORY_TYPES.RESTAURANT ? "Class" : "Class1"
    }&$spatialFilter=nearby(${position?.PositionLat},${
      position?.PositionLon
    },${distance})${DEFAULT_FILTER_QUERY}${
      targetId ? ` and ${typeValue}ID ne '${targetId}'` : ""
    }`;
    return await apiTourism.getListApiFunc(typeValue)({
      APIQuery: APIQuery,
      tokenSource: tokenSource,
    });
  },
  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_ScenicSpot
   */
  getSpotList: async ({ APIQuery, tokenSource } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/ScenicSpot?${APIQuery}&$format=JSON`
    );
    if (status === 200) {
      return apiTourism.getFormatKeyName(data, "ScenicSpot");
    }
  },
  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_ScenicSpot_0
   */
  getCitySpotList: async ({ city = "Taipei", APIQuery, tokenSource } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/ScenicSpot/${city}?${APIQuery}&$format=JSON`
    );
    if (status === 200) {
      return apiTourism.getFormatKeyName(data, "ScenicSpot");
    }
  },
  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_Restaurant
   */
  getRestaurantList: async ({ APIQuery, tokenSource } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/Restaurant?${APIQuery}&$format=JSON`
    );
    if (status === 200) {
      return apiTourism.getFormatKeyName(data, "Restaurant");
    }
  },

  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_Restaurant_0
   */
  getCityRestaurantList: async ({
    city = "Taipei",
    APIQuery,
    tokenSource,
  } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/Restaurant/${city}?${APIQuery}&$format=JSON`
    );
    if (status === 200) {
      return apiTourism.getFormatKeyName(data, "Restaurant");
    }
  },
  /**
   * @reference hhttps://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_Activity
   */
  getActivityList: async ({ APIQuery, tokenSource } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/Activity?${APIQuery}&$format=JSON`
    );
    if (status === 200) {
      return apiTourism.getFormatKeyName(data, "Activity");
    }
  },

  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_Activity_0
   */
  getCityActivityList: async ({
    city = "Taipei",
    APIQuery,
    tokenSource,
  } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/Activity/${city}?${APIQuery}&$format=JSON`
    );
    if (status === 200) {
      return apiTourism.getFormatKeyName(data, "Activity");
    }
  },
};

export default apiTourism;
