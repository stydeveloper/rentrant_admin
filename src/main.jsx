import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LayoutProvider } from "./components/Layout/Layout.jsx";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <LayoutProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </LayoutProvider>
);
