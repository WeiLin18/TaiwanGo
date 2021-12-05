import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { Button, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import GoText from "assets/GoText";
import {
  CATEGORY_TYPES_LIST,
  CATEGORY_LOCATIONS_LIST,
} from "constants/category";
import DropDownButton from "components/DropDownButton";
import SearchBar from "components/SearchBar";
import style from "./index.style";
import useSearch from "hooks/useSearch";

const HomePage = () => {
  const router = useRouter();
  const { location, setLocation, type, setType, inputValue, setInputValue } =
    useSearch();

  return (
    <>
      <Head>
        <title>TaiwanGo</title>
        <meta name="description" content="Taiwan travel information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.root}>
        <div className={style.circle} />
        <div className={style.subtitle}>
          <GoText width={300} priority="true" />
          <Typography
            variant="h1"
            component="h3"
            className={style.subtitleText}
          >
            台灣
          </Typography>
        </div>
        <Image
          width="863"
          height="864"
          alt="travel-girl"
          priority={true}
          src="/Saly-1.png"
        />
        <section className={style.inputSection}>
          <Typography
            className={style.sectionTitle}
            variant="h4"
            component="h2"
          >
            訂製你的專屬旅程
          </Typography>
          <form>
            <DropDownButton
              labelName="區域"
              currentItem={location}
              list={CATEGORY_LOCATIONS_LIST}
              onItemClick={(targetRange) => {
                setLocation(targetRange);
              }}
              fullWidth
              customClassName={style.input}
            />
            <DropDownButton
              labelName="種類"
              currentItem={type}
              list={CATEGORY_TYPES_LIST}
              onItemClick={(targetType) => {
                setType(targetType);
              }}
              fullWidth
              customClassName={style.input}
            />
            <SearchBar
              placeholder="輸入關鍵字..."
              value={inputValue}
              onValueChange={(vewValue) => {
                setInputValue(vewValue);
              }}
              customClassName={style.input}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Search />}
              onClick={() => {
                router.push({
                  pathname: "/list",
                  query: {
                    l: location.value,
                    t: type.value,
                    w: inputValue,
                  },
                });
              }}
            >
              搜尋
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default HomePage;
