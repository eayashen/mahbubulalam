import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initicalState = {
  about: null,
  isLoading: false,
  homePageData: null,
};

export const getAbout = createAsyncThunk("about/getAbout", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API_URL}/api/about/get-user-about`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getHomePageData = createAsyncThunk("about/getHomePageData", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API_URL}/api/about/get-home-page-data`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/about/upsert-user-about`,
        formData,
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const uploadProPic = createAsyncThunk(
  "about/uploadProPic",
  async (formData, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/about/upload-pro-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const uploadBanner = createAsyncThunk(
  "about/uploadBanner",
  async (formData, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/about/upload-banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const deleteBannerImage = createAsyncThunk(
  "about/deleteBannerImage",
  async (imageUrl) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/about/delete-banner-image`,
        { imageUrl },
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: initicalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.about = action.payload.user;
      })
      .addCase(getAbout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.about = action.payload.user;
      })
      .addCase(updateAbout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadProPic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProPic.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadProPic.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadBanner.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadBanner.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteBannerImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBannerImage.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteBannerImage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getHomePageData.fulfilled, (state, action) => {
        state.homePageData = action.payload.data;
      })
  },
});

export default aboutSlice.reducer;
