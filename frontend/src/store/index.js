import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import offerSlice from "./offerslice";
import panelSlice from "./panelslice";
import updatepanelSlice from "./updateslice";
import loginSlice from "./loginslice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["login"], // Exclude login from persisted state
};

// Create a persisted reducer for slices other than login
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    login: loginSlice.reducer,
    offer: offerSlice.reducer,
    panel: panelSlice.reducer,
    updatepanel: updatepanelSlice.reducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

// Create a persisted store
const persistor = persistStore(store);

export { store, persistor };
