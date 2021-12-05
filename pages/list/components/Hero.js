import { css } from "@emotion/css";
import clx from "classnames";
import { layout } from "styles";

const style = {
  root: css`
    width: 100vw;
    height: 400px;
    overflow: hidden;
    position: relative;
  `,
  hero: css`
    width: 100%;
    height: 400px;
    transform: scale(1.1);
    background-size: cover;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    position: absolute;
  `,
  heroImg: css`
    position: relative;
    z-index: 10;
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  `,
};

const Hero = ({ imgURL }) => {
  return (
    <header className={style.root}>
      <div
        style={{
          backgroundImage: imgURL
            ? `url('${imgURL}')`
            : `url("/unsplash_UWQP2mh5YJI.png")`,
        }}
        className={style.hero}
      />
      <div
        style={{
          backgroundImage: imgURL
            ? `url('${imgURL}')`
            : `url("/unsplash_UWQP2mh5YJI.png")`,
        }}
        className={clx(style.heroImg, layout.container)}
      />
    </header>
  );
};

export default Hero;
