import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { breakpoints, colors } from "styles";

export const style = {
  searchBar: css`
    z-index: 3000;
    position: fixed;
    bottom: 90%;
    justify-content: center;
  `,
  tooltip: css`
    && {
      background-color: transparent;
      border: none;
      pointer-events: initial;
      cursor: pointer;
      padding: 0;
      box-shadow: 0px 2px 10px -1px rgb(0 0 0 / 20%);
    }
    &:hover {
      z-index: 1100;
    }
    &:before {
      display: none;
    }
  `,
  activeTooltip: css`
    &&& {
      z-index: 1000;
    }
  `,
  list: css`
    && {
      pointer-events: none;
      padding: 0 20px;
      max-width: 100%;
      position: fixed;
      bottom: 60px;
      z-index: 1200;
      @media (max-width: ${breakpoints.phone}) {
        bottom: 0px;
      }
    }
  `,
  swiper: css`
    && {
      pointer-events: none;
      overflow: visible;
    }
    && .swiper-pagination {
      bottom: -30px;
      pointer-events: initial;
      @media (max-width: ${breakpoints.phone}) {
        display: none;
      }
    }
    && .swiper-slide {
      pointer-events: initial;
    }
    && .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      background-color: #fff;
      opacity: 1;
      box-shadow: 0px 2px 10px -1px rgb(0 0 0 / 50%);
    }
    && .swiper-pagination-bullet-active {
      background-color: ${colors.textPrimary};
    }
    && .swiper-slide-active {
      transform: translateY(-20px);
    }
  `,
};

export const StyledDiv = styled.div`
  padding: 8px;
  border-radius: 12px;
  background-color: ${({ isActive, color }) => (isActive ? color : "#fff")};
  &:before {
    position: absolute;
    content: "";
    background-color: transparent;
    border: 6px solid transparent;
    margin-top: -6px;
    top: 50%;
    left: 0;
    margin-left: -12px;
    border-right-color: ${({ isActive, color }) => (isActive ? color : "#fff")};
  }
  & span {
    font-weight: 700;
    font-size: 14px;
    color: ${({ isActive, color }) => (isActive ? "#fff" : color)};
  }

  &:hover {
    background-color: ${({ color }) => color};
  }
  &:hover span {
    color: #fff;
  }
  &:hover:before {
    border-right-color: ${({ color }) => color};
  }
`;
