import React from "react";
import Link from "next/link";
import { css } from "@emotion/css";
import GoText from "assets/GoText";
import { breakpoints } from "styles";

const style = {
  root: css`
    position: absolute;
    z-index: 50000;
    width: 280px;
    height: 280px;
    left: -50px;
    top: -80px;
    border-radius: 50%;
    background: rgba(253, 180, 75, 0.9);
    color: transparent;
    @media (max-width: ${breakpoints.pad}) {
      width: 120px;
      height: 120px;
      left: -30px;
      top: -60px;
    }
  `,
  logo: css`
    position: relative;
    top: 110px;
    left: 20px;
    cursor: pointer;
    @media (max-width: ${breakpoints.pad}) {
      width: 60px !important;
      top: 20px;
      left: 40px;
    }
  `,
};

const HomeLink = ({ otherLink }) => {
  return (
    <h1 className={style.root}>
      taiwanGo
      <Link
        href={{
          pathname: otherLink ? otherLink : `/`,
        }}
        passHref
      >
        <GoText width={120} className={style.logo} />
      </Link>
    </h1>
  );
};

export default HomeLink;
