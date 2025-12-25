import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  memberships: [],
  isLoading: false,
};

export const addMembership = createAsyncThunk(
  "membership/addMembership",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/membership/add-membership`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateMembership = createAsyncThunk(
  "membership/updateMembership",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/membership/update-membership/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteMembership = createAsyncThunk(
  "membership/deleteMembership",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/membership/delete-membership/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMembership.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMembership.fulfilled, (state, action) => {
        state.memberships.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addMembership.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default membershipSlice.reducer;