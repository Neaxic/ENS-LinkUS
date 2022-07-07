import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter } from "react-router-dom";
import { MantineThemeOverride, MantineProvider } from "@mantine/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const myTheme: MantineThemeOverride = {
  colorScheme: "light",
  colors: {
    grayWhite: ["#e9e9e9"],
  },
};

root.render(
    <MoralisProvider
      serverUrl="https://v6axkcnchzja.usemoralis.com:2053/server"
      appId="nBjotb4de5VhpJDIb26G50G3VsG1nKDxxNj8ztx7"
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </MoralisProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
