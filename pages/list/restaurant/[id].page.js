import PropTypes from "prop-types";
import apiTourism from "modules/tourism";
import Details from "../components/Details";
import { CATEGORY_TYPES } from "constants/category";
import { getStaticPathsHandler, getStaticPropHandlers } from "utils/handler";

const DetailsPage = (props) => {
  return <Details {...props} />;
};

export const getStaticPaths = getStaticPathsHandler(
  apiTourism.getRestaurantList,
  CATEGORY_TYPES.RESTAURANT
);

export const getStaticProps = getStaticPropHandlers(
  apiTourism.getRestaurantList,
  CATEGORY_TYPES.RESTAURANT
);

DetailsPage.propTypes = {
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
  typeValue: PropTypes.string,
};

export default DetailsPage;
