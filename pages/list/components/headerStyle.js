import { css } from "@emotion/css";

const style = {
  root: css`
    height: 400px;
    background-image: url("/unsplash_UWQP2mh5YJI.png");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,
  title: css`
    display: flex;
    align-items: center;
    color: #fff;
    letter-spacing: 20;
    && {
      font-weight: 500;
      font-family: "Noto Serif JP", serif;
    }
  `,
  subtitle: css`
    && {
      letter-spacing: 0.4em;
      margin: 0 60px;
      font-family: "Noto Serif JP";
    }
  `,
  form: css`
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 60%;
    transform: translate(-50%, 50%);
    display: flex;
  `,

  input: css`
    && {
      margin-right: 16px;
      box-shadow: "0px 2px 10px -1px rgb(0 0 0 / 20%)" !important;
    }
  `,
};

export default style;
