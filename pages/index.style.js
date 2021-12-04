import { css } from "@emotion/css";
import { breakpoints } from "styles";

const style = {
  root: css`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url("/unsplash_78A265wPiO4.png");
    background-size: cover;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5%;
    @media (max-width: ${breakpoints.phone}) {
      padding-top: 120px;
      flex-direction: column-reverse;
    }
  `,
  circle: css`
    position: absolute;
    width: 1200px;
    height: 1200px;
    border-radius: 50%;
    left: calc(50% - 1200px / 2 - 600px);
    top: calc(50% - 1200px / 2);
    background: rgba(253, 180, 75, 0.9);
  `,
  subtitle: css`
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 5%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: ${breakpoints.phone}) {
      display: none;
    }
  `,
  subtitleText: css`
    && {
      color: #fff;
      font-size: 140px;
      font-family: "Noto Serif TC", serif;
    }
  `,
  inputSection: css`
    width: 360px;
    z-index: 3;
    margin-left: -20px;
    @media (max-width: ${breakpoints.phone}) {
      margin-left: 0;
      width: 100%;
    }
  `,
  sectionTitle: css`
    && {
      position: relative;
      letter-spacing: 0.2em;
      font-weight: 700;
      color: #fff;
      text-align: center;
      margin-bottom: 24px;
    }
  `,
  input: css`
    && {
      margin-bottom: 20px;
    }
  `,
  girlImg: css`
    @media (max-width: ${breakpoints.phone}) {
      display: none !important;
    }
  `,
};

export default style;
