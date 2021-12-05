import { useState, useCallback, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
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
};

const ListPage = () => {
  const { query } = useRouter();
  const { l, t, w } = query;
  const [cardList, setCardList] = useState(initialListState);
  const { handleItemSearch } = useContext(AppContext);

  useEffect(() => {
    handleItemSearch({
      setState: setCardList,
      typeValue: t,
      locationValue: l,
      inputValue: w,
    });
  }, [handleItemSearch, l, t, w]);

  const handleSearchClick = useCallback(
    (props) => {
      handleItemSearch({ setState: setCardList, ...props });
    },
    [handleItemSearch]
  );

  return (
    <main>
      <Header
        onSearch={handleSearchClick}
        initialProps={{
          initialLocation: l,
          initialType: t,
          initialInputValue: w,
        }}
      />
      <ul className={clx(layout.container, style.list)}>
        <Grid container spacing={2}>
          {getListUIState(cardList) === LIST_UI_STATE.LOADING &&
            Array(8)
              .fill("")
              .map((item, index) => (
                <Grid item xs={6} md={3} key={index} component="li">
                  <Card isLoading />
                </Grid>
              ))}
          {getListUIState(cardList) === LIST_UI_STATE.DATA &&
            cardList.data.map((item) => (
              <Grid item xs={6} md={3} key={item.ID} component="li">
                <Card cardInfo={item} />
              </Grid>
            ))}
          {getListUIState(cardList) === LIST_UI_STATE.EMPTY && <EmptyView />}
          {getListUIState(cardList) === LIST_UI_STATE.ERROR && <EmptyView />}
        </Grid>
      </ul>
      {/* <Pagination count={5} className={style.pagination} /> */}
      <Footer />
    </main>
  );
};

ListPage.propTypes = {};

export default ListPage;
