import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SWRConfig } from "swr";
import { fetcher } from "./utils/swr";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher, refreshInterval: 0 }}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);

reportWebVitals();
