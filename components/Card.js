import Link from "next/link";
import PropTypes from "prop-types";
import { Skeleton } from "@material-ui/lab";
import {
  Card as MuiCard,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Room, Favorite, FavoriteBorder } from "@material-ui/icons";
import { css } from "@emotion/css";
import clx from "classnames";
import { getChipColor, getLocationName } from "utils/common";
import { colors } from "styles";
import { CATEGORY_TYPES } from "constants/category";
import useLikeToggle from "hooks/useLikeToggle";

const style = {
  root: css`
    min-width: 250px;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
    display: flex;
    &:hover .cover {
      transition: transform 1.5s;
      transform: scale(1.2);
    }
  `,
  paper: css`
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 60%) 0%,
        transparent 100%
      ),
      url("/unsplash_78A265wPiO4.png");
    background-size: 100% 120px, cover;
    background-repeat: no-repeat;
    background-position: center bottom, center;
  `,
  cover: css`
    position: absolute;
    width: 100%;
    height: 100%;
  `,
  textContent: css`
    /* position: absolute; */
    width: 100%;
    height: 100%;
    padding: 12px;
    z-index: 10;
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
    && svg {
      fill: ${colors.textPrimary};
    }
  `,
  chip: css`
    && {
      background-color: ${colors.yellowA11y};
      margin-top: 140px;
      margin-bottom: 8px;
    }
  `,
  locationName: css`
    && {
      font-size: 18px;
      height: 57px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
    }
  `,
  locationInfo: css`
    display: flex;
    align-items: center;
  `,
};

const Card = ({
  isLoading = false,
  cardInfo = {
    ID: "",
    Name: "",
    ZipCode: "",
    Class1: "",
    Picture: { PictureUrl1: "" },
    typeValue: CATEGORY_TYPES.SCENICSPOT.toLowerCase(),
  },
  isBlank = true,
  ...props
}) => {
  const { ID, Name, ZipCode, Location, Class, Class1, Picture, typeValue } =
    cardInfo;
  const { PictureUrl1 } = Picture;
  const { isLike, handleLikeToggle } = useLikeToggle(ID);

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
        <Link
          href={{
            pathname: `/list/${typeValue.toLowerCase()}/${ID}`,
          }}
          passHref
        >
          <a target={isBlank ? "_blank" : null} href="/#">
            <MuiCard className={clx(style.root, style.paper)} {...props}>
              <div
                className={clx(style.paper, style.cover, "cover")}
                style={{
                  backgroundImage: `linear-gradient(
            0deg,
            rgba(0, 0, 0, 60%) 0%,
            transparent 100%
          ),url(${PictureUrl1})`,
                }}
              />
              <div className={style.textContent}>
                <Chip
                  label={
                    typeValue === CATEGORY_TYPES.RESTAURANT
                      ? Class || "美食類"
                      : Class1 || "景點類"
                  }
                  className={style.chip}
                  style={{ backgroundColor: getChipColor(Class1) }}
                />
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={style.locationName}
                >
                  {Name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={style.locationInfo}
                >
                  <Room fontSize="small" />
                  {Location || getLocationName(ZipCode)}
                </Typography>
                <Tooltip
                  title={isLike ? "取消收藏" : "加入收藏"}
                  placement="top"
                  enterDelay={500}
                >
                  <IconButton
                    className={style.likeBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleLikeToggle();
                    }}
                  >
                    {isLike ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Tooltip>
              </div>
            </MuiCard>
          </a>
        </Link>
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
    Class1: PropTypes.string,
    Picture: PropTypes.object,
  }),
};

export default Card;
