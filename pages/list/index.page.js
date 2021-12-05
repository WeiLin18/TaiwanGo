import { useContext } from "react";
import PropTypes from "prop-types";
// import { Pagination } from "@material-ui/core";
import { css } from "@emotion/css";
import clx from "classnames";

import AppContext from "contexts/AppContext";
import Header from "./components/Header";
import Card from "../../components/Card";
import { layout } from "styles";

const style = {
  list: css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
};

const ListPage = (props) => {
  const { range, setRange, type, setType } = useContext(AppContext);
  return (
    <main>
      <Header />
      <ul className={clx(layout.container, style.list)}>
        <Card />
        <Card />
        <Card />
        <Card />
      </ul>
      {/* <Pagination count={10} /> */}
    </main>
  );
};

ListPage.propTypes = {};

export default ListPage;
