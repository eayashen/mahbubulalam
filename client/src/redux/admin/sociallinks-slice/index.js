import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  socialLinks: null,
  isLinkLoading: false,
};

export const getSocialLinks = createAsyncThunk(
  "socialLinks/getSocialLinks",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/sociallinks/get-social-links`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateSocialLinks = createAsyncThunk(
  "socialLinks/updateSocialLinks",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/sociallinks/upsert-social-links`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const socialLinksSlice = createSlice({
  name: "socialLinks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSocialLinks.pending, (state) => {
        state.isLinkLoading = true;
      })
      .addCase(getSocialLinks.fulfilled, (state, action) => {
        state.socialLinks = action.payload.data;
        state.isLinkLoading = false;
      })
      .addCase(getSocialLinks.rejected, (state) => {
        state.isLinkLoading = false;
      })
      .addCase(updateSocialLinks.pending, (state) => {
        state.isLinkLoading = true;
      })
      .addCase(updateSocialLinks.fulfilled, (state, action) => {
        state.socialLinks = action.payload.data;
        state.isLinkLoading = false;
      })
      .addCase(updateSocialLinks.rejected, (state) => {
        state.isLinkLoading = false;
      });
  },
});

export default socialLinksSlice.reducer;