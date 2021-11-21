import React from "react";
import { Typography } from "@material-ui/core";
import { css } from "@emotion/css";
import clx from "classnames";

import GoText from "assets/GoText";
import LineIcon from "assets/LineIcon";
import FbIcon from "assets/FbIcon";
import IgIcon from "assets/IgIcon";
import { layout, colors } from "styles";

const style = {
  root: css`
    height: 300px;
    overflow: hidden;
    position: relative;
  `,
  circle: css`
    width: 2000px;
    height: 1000px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: calc(50% - 2000px / 2);
    background-color: ${colors.primary};
  `,
  circleSub: css`
    position: absolute;
    border-radius: 50%;
    background-color: ${colors.secondary};
  `,
  circleLeft: css`
    width: 300px;
    height: 300px;
    left: 380px;
    top: 110px;
  `,
  circleRight: css`
    width: 200px;
    height: 200px;
    right: 500px;
    top: 80px;
  `,
  content: css`
    position: relative;
    z-index: 5;
    padding-top: 100px;
    display: flex;
    flex-wrap: wrap;
  `,
  logo: css`
    margin-right: 20%;
    margin-bottom: 50px;
  `,
  snsIconBox: css`
    margin-bottom: 24px;
  `,
  snsIcon: css`
    margin-right: 20px;
  `,
  text: css`
    color: #fff;
  `,
  license: css`
    color: #fff;
    width: 100%;
    text-align: center;
  `,
};

const Footer = () => {
  return (
    <footer className={style.root}>
      <div className={style.circle}>
        <div className={clx(style.circleSub, style.circleLeft)} />
        <div className={clx(style.circleSub, style.circleRight)} />
      </div>
      <div className={clx(layout.container, style.content)}>
        <GoText width={160} className={style.logo} />
        <div>
          <div className={style.snsIconBox}>
            <LineIcon className={style.snsIcon} />
            <FbIcon className={style.snsIcon} />
            <IgIcon />
          </div>
          <Typography className={style.text}>聯絡專線：02xx-xxx-xxx</Typography>
          <Typography className={style.text}>
            服務據點：台北市中山區明水路636號
          </Typography>
        </div>
        <Typography variant="caption" className={style.license}>
          © 2021 Copyright LET’S GO
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
