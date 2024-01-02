import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "./store/index.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Wrap your App component with PersistGate */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
