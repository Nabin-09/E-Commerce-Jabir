import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import AppContext from "./utils/context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
);
