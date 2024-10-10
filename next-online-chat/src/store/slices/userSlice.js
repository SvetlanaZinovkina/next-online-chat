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
      const newstate = { ...state, ...action.payload };
      return newstate;
    },
    logoutUser(state) {
      return initialState;
    },
    updateUsername(state, action) {
      state.username = action.payload.username;
    },
    updateEmail(state, action) {
      state.email = action.payload.email;
    },
    updatePassword(state, action) {
      state.password = action.payload.password;
    },
    updateAvatar(state, action) {
      state.avatar_path = action.payload.avatar_path;
    },
  },
});

export const {
  setUser,
  logoutUser,
  updateUsername,
  updateEmail,
  updatePassword,
  updateAvatar,
} = userSlice.actions;
export default userSlice.reducer;
