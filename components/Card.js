import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "@material-ui/lab";
import {
  Card as MuiCard,
  Chip,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Room, FavoriteBorder, Favorite } from "@material-ui/icons";
import { css } from "@emotion/css";
import { getLocationName } from "utils/common";

const style = {
  root: css`
    min-width: 245px;
    display: flex;
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 50%) 0%,
        transparent 100%
      ),
      url("/unsplash_78A265wPiO4.png");
    background-size: 100% 120px, cover;
    background-repeat: no-repeat;
    background-position: center bottom, center;
  `,
  paper: css`
    width: 100%;
    padding: 20px;
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 50%) 0%,
        transparent 100%
      ),
      url("/unsplash_78A265wPiO4.png");
    background-size: 100% 120px, cover;
    background-repeat: no-repeat;
    background-position: center bottom, center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
  `,
  skeleton: css`
    border-radius: 16px;
    width: 100%;
  `,
  likeBtn: css`
    &&,
    &&:hover {
      position: absolute;
      right: 16px;
      top: 16px;
      background-color: #fff;
    }
  `,
  chip: css`
    && {
      background-color: #00ba88;
      margin-bottom: 12px;
    }
  `,
  locationInfo: css`
    display: flex;
    align-items: center;
  `,
};

const Card = ({
  isLoading = false,
  isLiked = false,
  cardInfo = { ID: "", Name: "", ZipCode: "", Picture: { PictureUrl1: "" } },
  ...props
}) => {
  const { ID, Name, ZipCode, Picture } = cardInfo;
  const { PictureUrl1 } = Picture;
  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rect"
          height="280px"
          className={style.skeleton}
          {...props}
        />
      ) : (
        <MuiCard className={style.root} {...props}>
          <div
            className={style.paper}
            style={{
              backgroundImage: `linear-gradient(
            0deg,
            rgba(0, 0, 0, 50%) 0%,
            transparent 100%
          ),url(${PictureUrl1})`,
            }}
          >
            <Chip label="景點" className={style.chip} />
            <Typography variant="h6" color="textSecondary">
              {Name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={style.locationInfo}
            >
              <Room fontSize="small" />
              {getLocationName(ZipCode)}
            </Typography>
            <IconButton className={style.likeBtn}>
              {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </div>
        </MuiCard>
      )}
    </>
  );
};

Card.propTypes = {
  isLoading: PropTypes.bool,
  isLiked: PropTypes.bool,
  cardInfo: PropTypes.shape({
    ID: PropTypes.string,
    Name: PropTypes.string,
    ZipCode: PropTypes.string,
    Picture: PropTypes.object,
  }),
};

export default Card;
