import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  publications: [],
  isLoading: false,
};

export const getPublications = createAsyncThunk(
  "publications/getPublications",
  async (category, { rejectWithValue }) => {
    console.log(category);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/publication/${category}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPublication = createAsyncThunk(
  "publications/addPublication",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/publication/add`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updatePublication = createAsyncThunk(
  "publications/updatePublication",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/publication/edit/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deletePublication = createAsyncThunk(
  "publications/deletePublication",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/publication/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const publicationSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublications.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.publications = payload.data;
      })
      .addCase(getPublications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addPublication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPublication.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updatePublication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePublication.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePublication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePublication.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export default publicationSlice.reducer;
