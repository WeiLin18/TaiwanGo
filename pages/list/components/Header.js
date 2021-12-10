import { IconButton, Tooltip, Typography } from "@material-ui/core";
import Link from "next/link";
import { css } from "@emotion/css";

import { colors, breakpoints } from "styles";
import SearchBar from "components/SearchBar";
import useSearch from "hooks/useSearch";
import MapIcon from "assets/MapIcon";
import HomeLink from "components/HomeLink";

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
      @media (max-width: ${breakpoints.pad}) {
        margin: 0 30px;
      }
    }
  `,
  backIcon: css`
    &&& {
      position: absolute;
      z-index: 100;
      right: 20px;
      top: 20px;
      background-color: ${colors.secondary};
      box-shadow: 0px 2px 10px -1px rgb(0 0 0 / 20%);
    }
    &&:hover svg {
      opacity: 0.8;
    }
  `,
};

const Header = ({ onSearch, initialProps }) => {
  const { location, setLocation, type, setType, inputValue, setInputValue } =
    useSearch(initialProps);
  return (
    <header className={style.root}>
      <HomeLink />
      <Link
        href={{
          pathname: `/list/map`,
        }}
        passHref
      >
        <a target="_blank" href="/#">
          <Tooltip title="地圖找景點" placement="left">
            <IconButton className={style.backIcon}>
              <MapIcon />
            </IconButton>
          </Tooltip>
        </a>
      </Link>
      <Typography variant="h2" className={style.title}>
        台
        <Typography variant="h5" component="span" className={style.subtitle}>
          TAIWAN
        </Typography>
        灣
      </Typography>
      <SearchBar
        onSearch={onSearch}
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </header>
  );
};

export default Header;
