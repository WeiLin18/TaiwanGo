import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@material-ui/core";
import { css } from "@emotion/css";

const style = {
  infoCard: css`
    && {
      display: flex;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 20px;
    }
  `,
  title: css`
    && {
      margin-left: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
};

const CardGroup = ({ list = [] }) => {
  return (
    <>
      {list &&
        list.map((card, index) => (
          <Paper className={style.infoCard} key={index}>
            {card.iconElement}
            <Typography
              className={style.title}
              component="h4"
              {...card?.titleProps}
            >
              {card.title}
            </Typography>
          </Paper>
        ))}
    </>
  );
};

CardGroup.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType(PropTypes.string, PropTypes.element)
        .isRequired,
      iconElement: PropTypes.element.isRequired,
    })
  ),
};

export default CardGroup;
