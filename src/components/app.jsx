import React, { useRef, useState } from "react";
import { f7, f7ready, App, View } from "framework7-react";

import routes from "../js/routes";
import store from "../js/store";
import { CalculatorContext } from "../context/calculator";

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: "Calculator", // App name
    theme: "auto", // Automatic theme detection
    colors: {
      primary: "#0d887e",
    },
    touch: {
      tapHold: true, //enable tap hold events
    },
    // App store
    store: store,
    // App routes
    routes: routes,
  };

  f7ready(() => {
    // Call F7 APIs here
  });
  const inputRef = useRef();
  const [state, setState] = useState({
    caretPosition: -1,
    outputResult: 0,
    currentValue: "",
    isClosedParen: true,
    inputRef,canSave:false
  });
  const updateState = (state) => {
    setState(state);
  };
  return (
    <CalculatorContext.Provider value={{ state, updateState }}>
      <App {...f7params}>
        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </App>
    </CalculatorContext.Provider>
  );
};
export default MyApp;
