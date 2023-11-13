import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",

  initialState: {
    name: "",
    email: "",
    access: [],
  },

  reducers: {
    addNameAndAccess(state, action) {
      state.name = action.payload.name;
      state.access = action.payload.access;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
