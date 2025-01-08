import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  designation: null,
  isLoading: false,
};

export const getDesignation = createAsyncThunk(
  "designation/getDesignation",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/designation/`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateDesignation = createAsyncThunk(
  "designation/updateDesignation",
  async (formData) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/designation/${formData.id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addDesignation = createAsyncThunk(
  "designation/addDesignation",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/designation/`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteDesignation = createAsyncThunk(
  "designation/deleteDesignation",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/designation/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const designationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDesignation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.designation = action.payload.data;
      })
      .addCase(getDesignation.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDesignation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateDesignation.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDesignation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(addDesignation.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteDesignation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDesignation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteDesignation.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default designationSlice.reducer;
