import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsAndEvents: [],
  isLoading: false,
  newsAndEvent: null,
};

export const getNewsAndEvents = createAsyncThunk(
  "news/getNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/news-event/get-news-events`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNewsAndEventById = createAsyncThunk(
  "news/getNewsById",
  async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/news-event/get-news-event/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addNewsAndEvents = createAsyncThunk(
  "news/addNews",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/news-event/add-news-event`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateNewsAndEvents = createAsyncThunk(
  "news/updateNews",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_API_URL}/api/news-event/update-news-event/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteNewsAndEvents = createAsyncThunk(
  "news/deleteNews",
  async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_API_URL}/api/news-event/delete-news-event/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const newsAndEventSlice = createSlice({
  name: "newsAndEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsAndEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewsAndEvents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.newsAndEvents = payload.data;
      })
      .addCase(getNewsAndEvents.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewsAndEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewsAndEvents.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewsAndEvents.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateNewsAndEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNewsAndEvents.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateNewsAndEvents.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNewsAndEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNewsAndEvents.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNewsAndEvents.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getNewsAndEventById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewsAndEventById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.newsAndEvent = payload.data;
      })
      .addCase(getNewsAndEventById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default newsAndEventSlice.reducer;
