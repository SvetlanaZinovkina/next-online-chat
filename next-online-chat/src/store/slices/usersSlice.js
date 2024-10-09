"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  role: "",
  token: "",
  avatar_path: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    logoutUser(state) {
      return initialState;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
