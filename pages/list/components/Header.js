import { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { CATEGORY_TYPES, CATEGORY_LOCATIONS } from "constants/category";
import AppContext from "contexts/AppContext";
import DropDownButton from "components/DropDownButton";
import SearchBar from "components/SearchBar";
import style from "./headerStyle";

const Header = () => {
  const { location, setLocation, type, setType } = useContext(AppContext);

  return (
    <header className={style.root}>
      <Typography variant="h2" className={style.title}>
        台
        <Typography variant="h5" component="span" className={style.subtitle}>
          TAIWAN
        </Typography>
        灣
      </Typography>
      <form className={style.form}>
        <DropDownButton
          labelName="區域"
          currentItem={location}
          list={CATEGORY_LOCATIONS}
          onItemClick={(targetRange) => {
            setLocation(targetRange);
          }}
          customClassName={style.input}
        />
        <DropDownButton
          labelName="種類"
          currentItem={type}
          list={CATEGORY_TYPES}
          onItemClick={(targetType) => {
            setType(targetType);
          }}
          customClassName={style.input}
        />
        <SearchBar placeholder="輸入關鍵字..." customClassName={style.input} />
        <Button variant="contained" color="primary" startIcon={<Search />}>
          搜尋
        </Button>
      </form>
    </header>
  );
};

Header.propTypes = {};

export default Header;
