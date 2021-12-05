import { useState, useCallback, useEffect, useContext } from "react";
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
  const [cardList, setCardList] = useState(initialListState);
  const { fetchCardList, handleItemSearch } = useContext(AppContext);

  useEffect(() => {
    fetchCardList({ setState: setCardList });
  }, [fetchCardList]);

  const handleSearchClick = useCallback(
    (props) => {
      handleItemSearch({ setState: setCardList, ...props });
    },
    [handleItemSearch]
  );

  console.log(cardList);
  return (
    <main>
      <Header onSearch={handleSearchClick} />
      <ul className={clx(layout.container, style.list)}>
        <Grid container spacing={2}>
          {getListUIState(cardList) === LIST_UI_STATE.LOADING &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item xs={6} md={3} key={item} component="li">
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
