import { Typography, Paper, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Room, Phone } from "@material-ui/icons";

import { css } from "@emotion/css";
import clx from "classnames";

import Header from "./components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import { layout } from "styles";

const style = {
  list: css`
    padding-top: 56px;
    padding-bottom: 56px;
  `,
  article: css`
    padding-top: 56px;
    padding-bottom: 56px;
  `,
  title: css`
    &&& {
      margin-bottom: 36px;
      letter-spacing: 3px;
    }
  `,
  infoCard: css`
    && {
      display: flex;
      border-radius: 16px;
      padding: 22px 25px;
      margin-bottom: 20px;
    }
  `,
  infoCardIcon: css`
    && {
      margin-right: 12px;
    }
  `,
};

const ListPage = (props) => {
  return (
    <main>
      <Header />
      <article className={clx(layout.container, style.article)}>
        <Typography variant="h4" component="h2" className={style.title}>
          田媽媽長盈海味屋
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography component="p">
              一個沿海的偏鄉小鎮的個體養殖戶，一個無毒養殖的堅持理念一段細漢留下來的在地心故鄉情，一份感動一份真心，只為了遠道而來的客人吃的安心。即使在無毒養殖的過程中經歷多次的失敗，在研發過程中遇到更多的挫折。但創立的初衷告訴我要堅持下去，有些時候淚水更甚於汗水。也因為有了這份堅持，陸陸續續獲得中央與地方政府的重視，因為一尾產銷履歷及輸出歐盟雙認證的虱目魚一夜干經評鑑獲農委會田媽媽的認可這一切的付出都值得了。也因為大家的肯定更增加了我們的信念與堅持相信好品質的美味能與大家分享，如此這份動力來源才能讓長盈海味屋繼續堅持下去雖然我們不會做生意，但我們的用心是大家看得到的，也希望在偏遠的海邊能留下當初懷念的滋味。
              長盈海味屋的榮譽榜
              ★榮獲104年水產養殖界的最高榮譽「產銷履歷達人」。(南市唯二入圍)
              ★榮獲104年水產精品「海宴獎」的肯定。(南市唯一入圍) ★2014
              全國農委會田媽媽十大招
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={style.infoCard}>
              <Room className={style.infoCardIcon} />
              <Typography>臺南市727北門區慈安里三寮灣484號</Typography>
            </Paper>
            <Paper className={style.infoCard}>
              <Phone className={style.infoCardIcon} />
              <Typography>886-9-17549736</Typography>
            </Paper>
          </Grid>
        </Grid>
      </article>
      <ul className={clx(layout.container, style.list)}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3} component="li">
            <Card />
          </Grid>
          <Grid item xs={6} md={3} component="li">
            <Card />
          </Grid>
          <Grid item xs={6} md={3} component="li">
            <Card />
          </Grid>
          <Grid item xs={6} md={3} component="li">
            <Card />
          </Grid>
        </Grid>
      </ul>
      <Footer />
    </main>
  );
};

ListPage.propTypes = {};

export default ListPage;
