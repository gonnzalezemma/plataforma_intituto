import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavBar from "../src/layouts/NavBar";
import Footer from "../src/layouts/Footer";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    
  </BrowserRouter>
);
