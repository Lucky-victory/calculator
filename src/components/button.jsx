import React from "react";
import PropTypes from "prop-types";
import { Button as F7Button } from "framework7-react";

export const Button = (props) => {
  return (
    <>
      <F7Button type="button" value={props.value}>
        {props.value}
      </F7Button>
    </>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  extraClassName: PropTypes.string,
};
