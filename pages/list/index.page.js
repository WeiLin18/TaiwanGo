import { useState, useEffect, useContext } from "react";
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

const ListPage = (props) => {
  const [cardList, setCardList] = useState(initialListState);
  const { fetchSpotList } = useContext(AppContext);

  useEffect(() => {
    fetchSpotList({ setState: setCardList, itemCount: 32 });
  }, [fetchSpotList]);

  console.log(cardList);
  return (
    <main>
      <Header />
      <ul className={clx(layout.container, style.list)}>
        <Grid container spacing={2}>
          {/* {getListUIState(cardList) === LIST_UI_STATE.LOADING && */}
          {/* {32.map((item) => (
            <Grid item xs={6} md={3} key={item} component="li">
              <Card isLoading />
            </Grid>
          ))} */}
          {getListUIState(cardList) === LIST_UI_STATE.DATA &&
            cardList.data.map((item) => (
              <Grid item xs={6} md={3} key={item.ID} component="li">
                <Card cardInfo={item} />
              </Grid>
            ))}
        </Grid>
      </ul>
      <Pagination count={5} className={style.pagination} />
      <Footer />
    </main>
  );
};

ListPage.propTypes = {};

export default ListPage;
