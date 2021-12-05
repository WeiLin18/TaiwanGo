import apiInstance from "./apiInstance";

const apiTourism = {
  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_ScenicSpot
   */
  getSpotList: async ({ APIQuery, tokenSource } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/ScenicSpot?${APIQuery}&$format=JSON`
    );
    if (status === 200) {
      return data;
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
      return data;
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
      return data;
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
      return data;
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
      return data;
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
      return data;
    }
  },
};

export default apiTourism;
