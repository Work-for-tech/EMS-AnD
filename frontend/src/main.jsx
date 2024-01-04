import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "./store/index.js";

axios.defaults.baseURL = "http://localhost:9999";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Wrap your App component with PersistGate */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
