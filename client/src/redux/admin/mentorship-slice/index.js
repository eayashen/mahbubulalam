import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mentorships: [],
  isLoading: false,
};

export const getMentorships = createAsyncThunk(
  "mentorships/getMentorships",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/mentorship/get-mentorships`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMentorship = createAsyncThunk(
  "mentorships/addMentorship",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/mentorship/add-mentorship`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateMentorship = createAsyncThunk(
  "mentorships/updateMentorship",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/mentorship/update-mentorship/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteMentorship = createAsyncThunk(
  "mentorships/deleteMentorship",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/mentorship/delete-mentorship/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const mentorshipSlice = createSlice({
  name: "mentorships",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMentorships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMentorships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mentorships = action?.payload?.data;
      })
      .addCase(getMentorships.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addMentorship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMentorship.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addMentorship.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateMentorship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMentorship.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateMentorship.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMentorship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMentorship.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteMentorship.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default mentorshipSlice.reducer;
