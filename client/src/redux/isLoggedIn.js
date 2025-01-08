import { createSlice } from "@reduxjs/toolkit";

export const isAuthenticated = createSlice({
  name: "isAuthenticated",
  initialState: {
    value: false,
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = isAuthenticated.actions;

export default isAuthenticated.reducer;
