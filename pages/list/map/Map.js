import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker as MarkerUI,
  Tooltip,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Grid } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import clx from "classnames";

import { CATEGORY_LOCATIONS_LIST, CATEGORY_TYPES } from "constants/category";
import apiTourism from "modules/tourism";
import SearchBar from "components/SearchBar";
import useSearch from "hooks/useSearch";
import { colors } from "styles";
import { getListUIState } from "utils/common";
import { initialListState, LIST_UI_STATE } from "constants/UIState";
import Card from "components/Card";
import HomeLink from "components/HomeLink";
import { style, StyledDiv } from "./map.style";

SwiperCore.use([Pagination]);

const Map = () => {
  const { query } = useRouter();
  const {
    l = CATEGORY_LOCATIONS_LIST[0].value,
    t = CATEGORY_TYPES.SCENICSPOT,
    w = "",
  } = query;
  const { location, setLocation, type, setType, inputValue, setInputValue } =
    useSearch({ initialLocation: l, initialType: t, initialInputValue: w });
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(location.position);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [nearItemList, setNearItemList] = useState(initialListState);

  // ------------------------- fetch API
  const fetchNearList = useCallback(async () => {
    if (!position || position?.length !== 2) return;
    const res = await apiTourism.getNearList({
      typeValue: type.value,
      position: { PositionLat: position[0], PositionLon: position[1] },
      itemCount: 30,
      distance: 3000,
    });

    setNearItemList((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      data: res.map((item) => ({
        ...item,

        typeValue: type.value,
      })),
    }));
  }, [position, type]);

  useEffect(() => {
    if (!position) return;
    fetchNearList();
  }, [position, fetchNearList]);

  // ------------------------- swiper effect
  useEffect(() => {
    if (!swiperInstance) return;
    swiperInstance.slideTo(activeIndex);
  }, [activeIndex, swiperInstance]);

  // ------------------------- map func & effect
  const onMove = useCallback(() => {
    const newPosition = map.getCenter();
    setPosition([newPosition.lat, newPosition.lng]);
  }, [map]);

  useEffect(() => {
    if (!location || !map) return;
    setPosition(location.position);
    map.setView(location.position, 15);
  }, [location, map]);

  useEffect(() => {
    if (!map) return;
    map.on("moveend", onMove);
    return () => {
      map.off("moveend", onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    if (!map) return;
    map.zoomControl.setPosition("topright");
  }, [map]);

  return (
    <>
      <HomeLink />
      <SearchBar
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        inputValue={inputValue}
        setInputValue={setInputValue}
        isMapMode={true}
        customClassName={style.searchBar}
      />
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        whenCreated={setMap}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {nearItemList.data.map((spot, index) => {
          return (
            <Sub.Marker
              key={spot.ID}
              Name={spot.Name}
              Position={spot.Position}
              typeValue={spot.typeValue}
              isActive={activeIndex === index}
              onSelectItem={() => {
                setActiveIndex(index);
              }}
            />
          );
        })}
      </MapContainer>
      <ul className={style.list}>
        {getListUIState(nearItemList) === LIST_UI_STATE.LOADING &&
          Array(8)
            .fill("")
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} component="li">
                <Card isLoading />
              </Grid>
            ))}
        {getListUIState(nearItemList) === LIST_UI_STATE.DATA && (
          <>
            <Swiper
              // freeMode={true}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              className={style.swiper}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                960: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1281: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1441: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {nearItemList.data.map((item) => (
                <SwiperSlide key={item.ID} component="li">
                  <Card cardInfo={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </ul>
    </>
  );
};

const Sub = {
  Marker: ({ Name, ID, Position, typeValue, isActive, onSelectItem }) => {
    const typeTheme = useMemo(() => {
      switch (typeValue) {
        case CATEGORY_TYPES.ACTIVITY:
          return {
            iconUrl: "../Name=Location_activity.svg",
            color: colors.purple,
          };
        case CATEGORY_TYPES.RESTAURANT:
          return {
            iconUrl: "../Name=Location_restaurant.svg",
            color: colors.red,
          };
        case CATEGORY_TYPES.SCENICSPOT:
          return {
            iconUrl: "../Name=Location_attraction.svg",
            color: colors.primary,
          };
        default:
          return {
            iconUrl: "../Name=Location_attraction.svg",
            color: colors.primary,
          };
      }
    }, [typeValue]);

    return (
      <MarkerUI
        key={ID}
        title={Name}
        position={[Position.PositionLat, Position.PositionLon]}
        icon={
          new L.Icon({
            iconUrl: typeTheme.iconUrl,
            iconSize: [45, 45],
            iconAnchor: [20, 30],
            shadowSize: [20, 4],
          })
        }
        className={style.marker}
      >
        <Tooltip
          direction="right"
          offset={[20, -10]}
          opacity={1}
          permanent={true}
          key={isActive}
          className={clx(style.tooltip, isActive ? style.activeTooltip : "")}
        >
          <StyledDiv
            color={typeTheme.color}
            isActive={isActive}
            onClick={onSelectItem}
          >
            <span>{Name}</span>
          </StyledDiv>
        </Tooltip>
      </MarkerUI>
    );
  },
};

export default Map;
