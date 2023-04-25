import BackspaceButton from "./backspace-button";
import Button from "./button";
import React from "react";
import EqualButton from "./equal-button";
import ClearButton from "./clear-button";
import BracketButton from "./bracket-button";
import { Button as F7Button } from "framework7-react";
const buttons = ["^", "!", "cos", "sin"];
const TopOperatorButtons = () => {
  return (
    <>
      {/*<ClearButton></ClearButton>*/}

      {/* <BracketButton></BracketButton> */}
      {buttons.map((val, index) => {
        return (
          <F7Button
            type="button"
            data-value={val === "cos" || val === "sin" ? val + "(" : val}
            key={crypto.randomUUID() || index}
          >
            {val}
          </F7Button>
        );
      })}
    </>
  );
};
export default TopOperatorButtons;
