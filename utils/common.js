import zipCode from "constants/zipCode";
import { LIST_UI_STATE } from "constants/UIState";

export const getListUIState = (listState) => {
  if (listState.isLoading) {
    return LIST_UI_STATE.LOADING;
  } else if (listState.isError) {
    return LIST_UI_STATE.ERROR;
  } else if (listState.isFetched && listState.data?.length === 0) {
    return LIST_UI_STATE.EMPTY;
  } else if (listState.isFetched && listState.data?.length >= 0) {
    return LIST_UI_STATE.DATA;
  }
  return LIST_UI_STATE.LOADING;
};

export const getLocationName = (targetCode) => {
  let targetAreaName;
  const targetCity = zipCode.cities.find((city) =>
    city.region.some((area) => {
      if (area.code === parseInt(targetCode)) {
        targetAreaName = area.name;
        return true;
      }
      return false;
    })
  );
  return targetCity?.name ? `${targetCity?.name}.${targetAreaName}` : `未知名`;
};
