import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/css";
import clx from "classnames";

const style = {
  root: css`
    display: inline-block;
    width: 100%;
    height: 48px;
    font-size: 16px;
    border: none;
    border-radius: 40px;
    padding: 0 20px;
    &:focus {
      outline: none;
    }
    &&:focus: {
      box-shadow: "0px 2px 10px -1px rgb(0 0 0 / 20%)";
    }
  `,
};
const SearchBar = ({
  value,
  placeholder,
  onValueChange,
  customClassName,
  ...props
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        onValueChange(e.target.value);
      }}
      placeholder={placeholder}
      className={clx(style.root, customClassName)}
      {...props}
    />
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: "",
};

export default SearchBar;
