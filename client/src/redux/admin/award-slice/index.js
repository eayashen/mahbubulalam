import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  awards: [],
  isLoading: false,
};

export const getAwards = createAsyncThunk(
  "awards/getAwards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/award/get-awards`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAward = createAsyncThunk(
  "awards/addAward",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/award/add-award`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateAward = createAsyncThunk(
  "awards/updateAward",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/award/update-award/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteAward = createAsyncThunk(
  "awards/deleteAward",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/award/delete-award/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const uploadImage = createAsyncThunk(
  "awards/uploadImage",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/award/upload-image`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const awardSlice = createSlice({
  name: "awards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAwards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAwards.fulfilled, (state, { payload }) => {
        state.awards = payload.data;
        state.isLoading = false;
      })
      .addCase(getAwards.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAward.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(addAward.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAward.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAward.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAward.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAward.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(uploadImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default awardSlice.reducer;