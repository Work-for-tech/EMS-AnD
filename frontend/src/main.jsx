import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import store from "./store/index.js";
import { Provider } from "react-redux";

axios.defaults.baseURL = "http://localhost:9999";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
