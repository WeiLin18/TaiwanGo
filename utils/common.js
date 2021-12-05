import zipCode from "constants/zipCode";
import { CLASS_TYPES_LIST } from "constants/category";
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

export const getLocationName = (targetCode, isGetArea = false) => {
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
  if (targetCity?.name) {
    return isGetArea
      ? `${targetAreaName}`
      : `${targetCity?.name}.${targetAreaName}`;
  } else {
    return "未知名";
  }
};

export const getChipColor = (targetValue) => {
  return CLASS_TYPES_LIST.find((item) => item.value === targetValue)?.chipColor;
};
