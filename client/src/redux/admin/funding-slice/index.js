import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fundings: [],
  isLoading: false,
};

export const getFundings = createAsyncThunk("funding/getFundings", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API_URL}/api/funding/get-fundings`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const addFunding = createAsyncThunk(
  "funding/addFunding",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/funding/add-funding`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateFunding = createAsyncThunk(
  "funding/updateFunding",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/funding/update-funding/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteFunding = createAsyncThunk(
  "funding/deleteFunding",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/funding/delete-funding/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const fundingSlice = createSlice({
  name: "funding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFundings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFundings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fundings = action.payload.data;
      })
      .addCase(getFundings.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addFunding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFunding.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addFunding.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFunding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFunding.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateFunding.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteFunding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFunding.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteFunding.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fundingSlice.reducer;