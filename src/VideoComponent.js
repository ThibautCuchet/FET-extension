import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

const config = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)

ReactDOM.render(
  config,
  document.getElementById("root")
)