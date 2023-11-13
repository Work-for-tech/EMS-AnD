import { configureStore } from "@reduxjs/toolkit";
import offerSlice from "./offerslice";
import panelSlice from "./panelslice";
import updatepanelSlice from "./updateslice";
import loginSlice from "./loginslice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    offer: offerSlice.reducer,
    panel: panelSlice.reducer,
    updatepanel: updatepanelSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
