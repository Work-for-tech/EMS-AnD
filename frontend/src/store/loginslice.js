import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",

  initialState: {
    name: "",
    email: "",
    access: [],
    items: {
      Offer: 0,
      Project: 0,
      Indent: 0,
      Purchase: 0,
      GRN: 0,
      Issue: 0,
      Employee: 0,
    },
  },

  reducers: {
    addNameAndAccess(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.access = action.payload.access;
    },
    addItems(state, action) {
      state.items = action.payload;
    },
    logout(state) {
      state.name = "";
      state.email = "";
      state.access = [];
      state.items = {
        Offer: 0,
        Project: 0,
        Indent: 0,
        Purchase: 0,
        GRN: 0,
        Issue: 0,
        Employee: 0,
      };
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
