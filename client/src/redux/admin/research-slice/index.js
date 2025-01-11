import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  research: [],
  isLoading: false,
};

export const getResearch = createAsyncThunk(
  "research/getResearch",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/research/all`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addResearch = createAsyncThunk(
  "research/addResearch",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/research/add`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateResearch = createAsyncThunk(
  "research/updateResearch",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/research/edit/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteResearch = createAsyncThunk(
  "research/deleteResearch",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/research/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const researchSlice = createSlice({
  name: "research",
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder.addCase(getResearch.pending, (state) => {
      state.isLoading = true;
    });
    bulder.addCase(getResearch.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.research = payload.data;
    });
    bulder.addCase(getResearch.rejected, (state) => {
      state.isLoading = false;
    });

    bulder.addCase(addResearch.pending, (state) => {
      state.isLoading = true;
    });
    bulder.addCase(addResearch.fulfilled, (state) => {
      state.isLoading = false;
    });
    bulder.addCase(addResearch.rejected, (state) => {
      state.isLoading = false;
    });

    bulder.addCase(updateResearch.pending, (state) => {
      state.isLoading = true;
    });
    bulder.addCase(updateResearch.fulfilled, (state) => {
      state.isLoading = false;
    });
    bulder.addCase(updateResearch.rejected, (state) => {
      state.isLoading = false;
    });

    bulder.addCase(deleteResearch.pending, (state) => {
      state.isLoading = true;
    });
    bulder.addCase(deleteResearch.fulfilled, (state) => {
      state.isLoading = false;
    });
    bulder.addCase(deleteResearch.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default researchSlice.reducer;
