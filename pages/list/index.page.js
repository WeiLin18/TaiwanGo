import { useState, useCallback, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import { css } from "@emotion/css";
import clx from "classnames";

import AppContext from "contexts/AppContext";
import { LIST_UI_STATE, initialListState } from "constants/UIState";
import { getListUIState } from "utils/common";

import Header from "./components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import { layout } from "styles";
import EmptyView from "components/EmptyView";
import Skelton from "components/Skelton";
import { CATEGORY_LOCATIONS_LIST, CATEGORY_TYPES } from "constants/category";
import useAddList from "hooks/useAddList";

const style = {
  list: css`
    padding-top: 56px;
    padding-bottom: 56px;
  `,
  pagination: css`
    && {
      display: flex;
      justify-content: center;
      margin-bottom: 56px;
    }
  `,
  skelton: css`
    margin-top: 48px;
  `,
};

const ListPage = () => {
  const [cardList, setCardList] = useState(initialListState);
  const { handleItemSearch } = useContext(AppContext);
  // const [page, setPage] = useState(0);
  const { page, setPage } = useAddList();
  const [isLoaderShow, setIsLoaderShow] = useState(false);
  const { query } = useRouter();
  const {
    l = CATEGORY_LOCATIONS_LIST[0].value,
    t = CATEGORY_TYPES.SCENICSPOT,
    w = "",
  } = query;
  const searchData = useRef({ typeValue: t, locationValue: l, inputValue: w });

  useEffect(() => {
    if (cardList.isFetchAll) return;

    handleItemSearch({
      setState: setCardList,
      setIsLoaderShow,
      ...searchData.current,
      page,
    });
  }, [handleItemSearch, page, setCardList, cardList.isFetchAll]);

  const handleSearchClick = useCallback(
    (props) => {
      searchData.current = props;
      setPage(0);
      handleItemSearch({ setState: setCardList, page: 0, ...props });
    },
    [setPage, handleItemSearch]
  );

  return (
    <>
      <Header
        onSearch={handleSearchClick}
        initialProps={{
          initialLocation: l,
          initialType: t,
          initialInputValue: w,
        }}
      />
      <main>
        <ul className={clx(layout.container, style.list)}>
          <Grid container spacing={2}>
            {getListUIState(cardList) === LIST_UI_STATE.LOADING &&
              Array(8)
                .fill("")
                .map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index} component="li">
                    <Card isLoading />
                  </Grid>
                ))}
            {getListUIState(cardList) === LIST_UI_STATE.DATA && (
              <>
                {cardList.data.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item.ID} component="li">
                    <Card cardInfo={item} />
                  </Grid>
                ))}

                <Skelton
                  isLoaderShow={isLoaderShow}
                  customClassName={style.skelton}
                />
              </>
            )}
            {getListUIState(cardList) === LIST_UI_STATE.EMPTY && <EmptyView />}
            {getListUIState(cardList) === LIST_UI_STATE.ERROR && <EmptyView />}
          </Grid>
        </ul>
        {/* <Pagination count={5} className={style.pagination} /> */}
      </main>
      <Footer />
    </>
  );
};

export default ListPage;
