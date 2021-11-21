import apiInstance from "./apiInstance";
import { errorHandler } from "utils/handler";

const apiTourism = {
  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_ScenicSpot
   */
  getSpotList: async ({ tokenSource, APIQuery } = {}) => {
    console.log(APIQuery);
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/ScenicSpot?${APIQuery}&$filter=Picture/PictureUrl1 ne null&$format=JSON`
    );
    if (status === 200) {
      return data;
    }
    errorHandler({ status, data });
  },

  /**
   * @reference https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_ScenicSpot_0
   */
  getCitySpotList: async ({ City = "Taipei", top = 30, tokenSource } = {}) => {
    const { status, data } = await apiInstance(tokenSource).get(
      `/v2/Tourism/ScenicSpot/${City}?$top=${top}&$format=JSON`
    );
    if (status === 200) {
      return data;
    }
    errorHandler({ status, data });
  },
};

export default apiTourism;
