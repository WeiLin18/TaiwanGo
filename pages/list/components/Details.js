import PropTypes from "prop-types";
import Link from "next/link";
import { Typography, Grid, IconButton } from "@material-ui/core";
import {
  ArrowBack,
  Room,
  Phone as PhoneIcon,
  AccessTimeRounded,
  Public,
} from "@material-ui/icons";
import { css } from "@emotion/css";
import clx from "classnames";

import { getLocationName } from "utils/common";
import Card from "components/Card";
import Footer from "components/Footer";
import CardGroup from "components/CardGroup";
import Hero from "../components/Hero";
import { layout } from "styles";

const style = {
  mask: css`
    position: relative;
    z-index: 10;
    background-color: #fafafa;
  `,
  list: css`
    padding-top: 56px;
  `,
  contentSpec: css`
    padding-bottom: 96px;
  `,
  article: css`
    z-index: 10;
    padding-top: 56px;
    padding-bottom: 56px;
  `,
  title: css`
    &&& {
      margin-bottom: 36px;
      letter-spacing: 3px;
      position: relative;
    }
  `,
  description: css`
    && {
      margin-bottom: 36px;
    }
  `,
  recommendTitle: css`
    && {
      margin-bottom: 20px;
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
  backIcon: css`
    &&& {
      position: absolute;
      z-index: 100;
      left: 0;
      top: -56px;
      transform: translate(-100%, -50%);
      background-color: #fff;
      box-shadow: 0px 2px 10px -1px rgb(0 0 0 / 20%);
    }
    &&:hover svg {
      opacity: 0.8;
    }
  `,
};

const cardList = (OpenTime, City, ZipCode, WebsiteUrl, Phone) => [
  {
    title: (
      <>
        <Typography variant="subtitle1" component="div">
          營業時間:
        </Typography>
        {OpenTime || "未提供資訊"}
      </>
    ),
    iconElement: <AccessTimeRounded />,
  },
  {
    title: (
      <>
        <Typography variant="subtitle1" component="div">
          地區:
        </Typography>
        {City} {getLocationName(ZipCode, true)}
      </>
    ),
    iconElement: <Room />,
  },
  {
    title: (
      <>
        <Typography variant="subtitle1" component="div">
          官方網站:
        </Typography>
        <Typography component={WebsiteUrl ? "a" : "p"} href={WebsiteUrl}>
          {WebsiteUrl || "未提供資訊"}
        </Typography>
      </>
    ),
    iconElement: <Public />,
  },
  {
    title: (
      <>
        <Typography variant="subtitle1" component="div">
          聯絡電話:
        </Typography>
        <Typography component={Phone ? "a" : "p"} href={`tel:${Phone}`}>
          {Phone || "未提供資訊"}
        </Typography>
      </>
    ),
    iconElement: <PhoneIcon />,
  },
];

const Details = ({
  Name = "",
  DescriptionDetail = "",
  Description = "",
  Picture = [{ PictureUrl1: "" }],
  Phone = "",
  City = "",
  ZipCode = "",
  OpenTime = "",
  Position = { PositionLat: "", PositionLon: "" },
  WebsiteUrl = "",
  nearSpotList = [],
  nearRestaurantList = [],
}) => {
  return (
    <main className={style.root}>
      <Hero imgURL={Picture?.PictureUrl1} />
      <div className={style.mask}>
        <article className={clx(layout.container, style.article)}>
          <Typography variant="h4" component="h2" className={style.title}>
            <Link
              href={{
                pathname: `/list`,
              }}
              passHref
            >
              <IconButton className={style.backIcon}>
                <ArrowBack />
              </IconButton>
            </Link>
            {Name}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography component="p" className={style.description}>
                {DescriptionDetail || Description || "未提供相關資訊"}
              </Typography>
              {Position?.PositionLat && (
                <iframe
                  title="map"
                  src={`https://maps.google.com/maps?q=${Position.PositionLat},${Position.PositionLon}&hl=zh-TW&z=16&output=svembed`}
                  width="100%"
                  height="400"
                  allowFullScreen
                  loading="lazy"
                />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <CardGroup
                list={cardList(OpenTime, City, ZipCode, WebsiteUrl, Phone)}
              />
            </Grid>
          </Grid>
        </article>
      </div>
      <ul className={clx(layout.container, style.list)}>
        <Typography variant="h5" className={style.recommendTitle}>
          附近景點
        </Typography>
        <Grid container spacing={2}>
          {nearSpotList.map((item, index) => (
            <Grid item xs={6} md={3} component="li" key={index}>
              <Card cardInfo={item} />
            </Grid>
          ))}
        </Grid>
      </ul>
      <ul className={clx(layout.container, style.list, style.contentSpec)}>
        <Typography variant="h5" className={style.recommendTitle}>
          附近餐廳
        </Typography>
        <Grid container spacing={2}>
          {nearRestaurantList.map((item, index) => (
            <Grid item xs={6} md={3} component="li" key={index}>
              <Card cardInfo={item} />
            </Grid>
          ))}
        </Grid>
      </ul>
      <Footer />
    </main>
  );
};

Details.propTypes = {
  Name: PropTypes.string,
  DescriptionDetail: PropTypes.string,
  Picture: PropTypes.shape({ PictureUrl1: PropTypes.string }),
  Phone: PropTypes.string,
  City: PropTypes.string,
  ZipCode: PropTypes.string,
  OpenTime: PropTypes.string,
  Position: PropTypes.shape({
    PositionLat: PropTypes.number,
    PositionLon: PropTypes.number,
  }),
  WebsiteUrl: PropTypes.string,
  nearSpotList: PropTypes.array,
  nearRestaurantList: PropTypes.array,
};

export default Details;