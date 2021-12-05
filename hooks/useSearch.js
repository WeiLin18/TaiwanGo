import {
  CATEGORY_LOCATIONS_LIST,
  CATEGORY_TYPES_LIST,
} from "constants/category";
import { useEffect, useState } from "react";
import { findTargetObject } from "utils/common";

const useSearch = (props) => {
  const initialLocation = findTargetObject(
    props?.initialLocation,
    "value",
    CATEGORY_LOCATIONS_LIST
  );
  const initialType = findTargetObject(
    props?.initialType,
    "value",
    CATEGORY_TYPES_LIST
  );

  const [location, setLocation] = useState(
    initialLocation || CATEGORY_LOCATIONS_LIST[0]
  );
  const [type, setType] = useState(initialType || CATEGORY_TYPES_LIST[0]);
  const [inputValue, setInputValue] = useState(props?.initialInputValue || "");

  useEffect(() => {
    return () => {
      setLocation(CATEGORY_LOCATIONS_LIST[0]);
      setType(CATEGORY_TYPES_LIST[0]);
      setInputValue("");
    };
  }, []);

  return { location, setLocation, type, setType, inputValue, setInputValue };
};

export default useSearch;
