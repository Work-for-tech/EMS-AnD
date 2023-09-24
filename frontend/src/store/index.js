import { configureStore } from "@reduxjs/toolkit";
import offerSlice from "./offerslice";
import panelSlice from "./panelslice";
import updatepanelSlice from "./updateslice";

const store = configureStore({
  reducer: {
    offer: offerSlice.reducer,
    panel: panelSlice.reducer,
    updatepanel: updatepanelSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
