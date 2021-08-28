import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Buttons from "./MaterialUI/Buttons";
import Grids from "./MaterialUI/Grids";
import { Grid } from "@material-ui/core";
import { AuthContext, AuthProvider } from "./AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* <IntersectionDemo></IntersectionDemo> */}
    {/* <Buttons></Buttons> */}
    {/* <Grids></Grids> */}
  </React.StrictMode>,
  document.getElementById("root")
);