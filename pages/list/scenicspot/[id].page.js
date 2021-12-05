import PropTypes from "prop-types";
import Image from "next/image";
import { Typography, Paper, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {
  Room,
  Phone as PhoneIcon,
  AccessTimeRounded,
  Public,
} from "@material-ui/icons";
import { css } from "@emotion/css";
import clx from "classnames";

import { DEFAULT_FILTER_QUERY } from "constants/service";
import apiTourism from "modules/tourism";
import { getLocationName } from "utils/common";
import Header from "../components/Header";
import Card from "../../../components/Card";
import Footer from "../../../components/Footer";
import { layout } from "styles";
import CardGroup from "components/CardGroup";
import { useMemo } from "react";

const style = {
  hero: css`
    height: 400px;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,
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
  description: css`
    && {
      margin-bottom: 36px;
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

const cardList = (OpenTime, City, ZipCode, WebsiteUrl, Phone) => [
  {
    title: (
      <>
        <Typography variant="subtitle1">營業時間:</Typography>
        {OpenTime || "無法提供資訊"}
      </>
    ),
    iconElement: <AccessTimeRounded />,
  },
  {
    title: (
      <>
        <Typography variant="subtitle1">地區:</Typography>
        {City} {getLocationName(ZipCode, true)}
      </>
    ),
    iconElement: <Room />,
  },
  {
    title: (
      <>
        <Typography variant="subtitle1">官方網站:</Typography>
        <Typography component="a" href={WebsiteUrl}>
          {" "}
          {WebsiteUrl}
        </Typography>
      </>
    ),
    iconElement: <Public />,
  },
  {
    title: (
      <>
        <Typography variant="subtitle1">聯絡電話:</Typography>
        <Typography component="a" href={`tel:${Phone}`}>
          {Phone || "無法提供資訊"}
        </Typography>
      </>
    ),
    iconElement: <PhoneIcon />,
  },
];

const DetailsPage = ({
  Name,
  DescriptionDetail,
  Picture,
  Phone,
  City,
  ZipCode,
  OpenTime,
  Position,
  WebsiteUrl,
}) => {
  return (
    <main>
      <div
        style={{
          backgroundImage: Picture?.PictureUrl1
            ? `url('${Picture?.PictureUrl1}')`
            : `url("/unsplash_UWQP2mh5YJI.png")`,
        }}
        className={style.hero}
      />
      <article className={clx(layout.container, style.article)}>
        <Typography variant="h4" component="h2" className={style.title}>
          {Name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography component="p" className={style.description}>
              {DescriptionDetail}
            </Typography>
            {Position?.PositionLat && (
              <iframe
                title="map"
                src={`https://maps.google.com/maps?q=121.50760650634766,25.056400299072266&hl=zh-TW&z=16&amp;output=embed`}
                width="100%"
                height="400"
                allowFullScreen=""
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

export const getStaticPaths = async () => {
  try {
    const res = await apiTourism.getSpotList({
      APIQuery: `${DEFAULT_FILTER_QUERY}&$select=ID&$top=1`,
    });

    const paths = res.map((item) => ({
      params: {
        id: item.ID,
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  try {
    const res = await apiTourism.getSpotList({
      APIQuery: `${DEFAULT_FILTER_QUERY} and ID eq '${id}'`,
    });
    return {
      props: res[0],
      revalidate: 10,
    };
  } catch {
    return {
      redirect: {
        destination: "/list",
        permanent: false,
      },
    };
  }
};

DetailsPage.propTypes = {};

export default DetailsPage;
