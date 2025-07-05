import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { RootState } from "./store";
import { router } from "expo-router";
import { removeTokens } from "../config/auth";

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await removeTokens();
    dispatch(logout());
    router.replace("/");
  }
);

const initialState = {
  AccToken: null,
  data: {
    username: "",
    email: "",
    phone: "",
    city: "",
    name: "",
    id: "",
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.AccToken = action.payload.accessToken;
      state.data = action.payload.user;
      // state.isLoggedIn = !!action.payload;
    },
    setLoggedInStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.AccToken = null;
      state.data = {
        username: "",
        email: "",
        phone: "",
        city: "",
        name: "",
        id: "",
      };
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.AccToken = null;
      state.data = {
        username: "",
        email: "",
        phone: "",
        city: "",
        name: "",
        id: "",
      };
      state.isLoggedIn = false;
    });
  },
});

export const { setCredentials, logout, setLoggedInStatus } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
