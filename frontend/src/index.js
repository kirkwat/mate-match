import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";

import "bootstrap";
import "./styles/bootstrap.min.css";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
