// Libs
import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import { fetcher } from "./utils/swr";

// Components
import App from "./App";

// Styles
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher, refreshInterval: 0 }}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);
