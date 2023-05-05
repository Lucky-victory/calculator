import React, { useRef, useState } from "react";
import { f7, f7ready, App, View } from "framework7-react";
import { getDevice } from "framework7";
import routes from "../js/routes";
import store from "../js/store";
import { CalculatorContext } from "../context/calculator";
import { App as CapacitorApp } from "@capacitor/app";

import { capacitorApp } from "../js/capacitor-app";
const device = getDevice();
const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: "Calculator", // App name
    theme: "auto", // Automatic theme detection
    colors: {
      primary: "#04978b",
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
    if (device.capacitor) {
      capacitorApp.init(f7);
      document.addEventListener("backbutton", () => {
        handleAppExit();
      });
    }
  });

  function handleAppExit() {
    CapacitorApp.exitApp();
  }
  const inputRef = useRef();
  const [state, setState] = useState({
    caretPosition: -1,
    outputResult: 0,
    currentValue: "",
    isClosedParen: true,
    inputRef,
    canSave: false,
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
