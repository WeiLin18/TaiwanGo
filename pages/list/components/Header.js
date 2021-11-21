import { useContext } from "react";
import { Button, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { css } from "@emotion/css";
import clx from "classnames";

import { CATEGORY_TYPES, CATEGORY_LOCATIONS } from "constants/category";
import AppContext from "contexts/AppContext";
import DropDownButton from "components/DropDownButton";
import SearchBar from "components/SearchBar";

const style = {
  root: css`
    height: 400px;
    background-image: url("/unsplash_UWQP2mh5YJI.png");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,
  title: css`
    display: flex;
    align-items: center;
    color: #fff;
    letter-spacing: 20;
    && {
      font-weight: 500;
      font-family: "Noto Serif JP", serif;
    }
  `,
  subtitle: css`
    && {
      letter-spacing: 0.4em;
      margin: 0 60px;
      font-family: "Noto Serif JP";
    }
  `,
  form: css`
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 60%;
    transform: translate(-50%, 50%);
    display: flex;
  `,

  input: css`
    && {
      margin-right: 16px;
    }
  `,
  boxShadow: css`
    &&& {
      box-shadow: 0px 2px 10px -1px rgb(0 0 0 / 20%);
    }
  `,
};

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
          customClassName={clx(style.input, style.boxShadow)}
        />
        <DropDownButton
          labelName="種類"
          currentItem={type}
          list={CATEGORY_TYPES}
          onItemClick={(targetType) => {
            setType(targetType);
          }}
          customClassName={clx(style.input, style.boxShadow)}
        />
        <SearchBar
          placeholder="輸入關鍵字..."
          customClassName={clx(style.input, style.boxShadow)}
        />
        <Button
          variant="contained"
          color="primary"
          className={style.boxShadow}
          startIcon={<Search />}
        >
          搜尋
        </Button>
      </form>
    </header>
  );
};

export default Header;
