import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  token: null,
};

export const login = createAsyncThunk("auth/login", async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API_URL}/api/auth/login`,
      formData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (formData, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/auth/reset-password`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        if (action.payload?.success) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          sessionStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetTokenAndCredentials } = authSlice.actions;

export default authSlice.reducer;