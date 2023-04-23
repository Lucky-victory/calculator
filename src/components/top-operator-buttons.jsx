import BackspaceButton from "./backspace-button";
import Button from "./button";
import React from "react";
import EqualButton from "./equal-button";
import ClearButton from "./clear-button";
import BracketButton from "./bracket-button";

const buttons = ["x"];
const TopOperatorButtons = () => {
  return (
    <>
      {/*<ClearButton></ClearButton>*/}

      {/* <BracketButton></BracketButton> */}
      {buttons.map((val, index) => {
        return <Button value={val} key={crypto.randomUUID() || index}></Button>;
      })}
    </>
  );
};
export default TopOperatorButtons;
