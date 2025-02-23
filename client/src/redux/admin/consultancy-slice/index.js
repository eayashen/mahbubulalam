import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  consultancies: [],
  isLoading: false,
};

export const getConsultancies = createAsyncThunk(
  "consultancies/getConsultancies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/consultancy/get-consultancies`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addConsultancy = createAsyncThunk(
  "consultancies/addConsultancy",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/consultancy/add-consultancy`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateConsultancy = createAsyncThunk(
  "consultancies/updateConsultancy",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/consultancy/update-consultancy/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteConsultancy = createAsyncThunk(
  "consultancies/deleteConsultancy",
  async (id) => {
    console.log("id", id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/consultancy/delete-consultancy/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const uploadImage = createAsyncThunk(
  "consultancies/uploadImage",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/consultancy/upload-image`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const consultancySlice = createSlice({
  name: "consultancies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConsultancies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConsultancies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.consultancies = action.payload.data;
      })
      .addCase(getConsultancies.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addConsultancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addConsultancy.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addConsultancy.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateConsultancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateConsultancy.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateConsultancy.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteConsultancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteConsultancy.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteConsultancy.rejected, (state) => {
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

export default consultancySlice.reducer;
