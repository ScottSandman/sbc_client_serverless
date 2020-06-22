import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import App from "./App";

import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#ffd600",
    },
  },
});

Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
