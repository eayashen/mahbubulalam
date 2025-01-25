import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contact: null,
  isLoading: false,
};

export const getContact = createAsyncThunk("contact/getContact", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_API_URL}/api/contact/get-contact`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/contact/upsert-contact`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.contact = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getContact.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contact = action.payload.data;
        state.isLoading = false;
      })
      .addCase(updateContact.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default contactSlice.reducer;