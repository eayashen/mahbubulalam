import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  count: 0,
  isLoading: false,
};

export const fetchVisitors = createAsyncThunk(
  "visitor/fetchVisitors",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/visitor/count`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addVisitor = createAsyncThunk(
  "visitor/addVisitor",
  async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/visitor/add`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
      })
      .addCase(fetchVisitors.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addVisitor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVisitor.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addVisitor.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default visitorSlice.reducer;