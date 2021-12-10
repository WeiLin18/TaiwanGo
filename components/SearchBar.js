import { Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { css } from "@emotion/css";
import clx from "classnames";

import {
  CATEGORY_TYPES_LIST,
  CATEGORY_LOCATIONS_LIST,
} from "constants/category";
import DropDownButton from "components/DropDownButton";
import SearchInput from "components/SearchInput";
import { breakpoints } from "styles";

const style = {
  root: css`
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 60%;
    transform: translate(-50%, 50%);
    display: flex;

    @media (max-width: ${breakpoints.pad}) {
      width: 90%;
    }
    @media (max-width: ${breakpoints.phone}) {
      bottom: 28px;
      flex-wrap: wrap;
    }
  `,

  input: css`
    && {
      margin-right: 16px;
      margin-bottom: 16px;
    }
  `,
  boxShadow: css`
    &&& {
      box-shadow: 0px 2px 10px -1px rgb(0 0 0 / 20%);
    }
  `,
  flex: css`
    display: flex;
    width: 100%;
  `,
};

const SearchBar = ({
  onSearch,
  location,
  setLocation,
  type,
  setType,
  inputValue,
  setInputValue,
  customClassName,
  isMapMode = false,
}) => {
  return (
    <form className={clx(style.root, customClassName)}>
      <DropDownButton
        labelName="區域"
        currentItem={location}
        list={CATEGORY_LOCATIONS_LIST}
        onItemClick={(targetRange) => {
          setLocation(targetRange);
        }}
        customClassName={clx(style.input, style.boxShadow)}
      />
      <DropDownButton
        labelName="種類"
        currentItem={type}
        list={CATEGORY_TYPES_LIST}
        onItemClick={(targetType) => {
          setType(targetType);
        }}
        customClassName={clx(style.input, style.boxShadow)}
      />
      {!isMapMode && (
        <div className={style.flex}>
          <SearchInput
            placeholder="輸入關鍵字..."
            value={inputValue}
            onValueChange={(vewValue) => {
              setInputValue(vewValue);
            }}
            customClassName={clx(style.input, style.boxShadow)}
          />
          <Button
            variant="contained"
            color="primary"
            className={style.boxShadow}
            startIcon={<Search />}
            onClick={() => {
              onSearch({
                locationValue: location.value,
                typeValue: type.value,
                inputValue,
              });
            }}
          >
            搜尋
          </Button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
