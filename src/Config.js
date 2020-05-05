import React, { Component } from "react"
import ReactDOM from "react-dom"
import ConfigPage from "./components/ConfigPage/ConfigPage"
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme'

const config = (
  <ThemeProvider theme={theme}>
    <ConfigPage />
  </ThemeProvider>
)

ReactDOM.render(
  config,
  document.getElementById("root")
)