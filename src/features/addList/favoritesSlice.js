import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  loading: false,
  removedBookId: "",
};

export const fetchFavoritesData = createAsyncThunk(
  "favorites/list",
  async () => {
    try {
      const res = await api.get(`/favorites`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getDeletedList = createAsyncThunk(
  "favorites/deleted",
  async (removedBookId) => {
    try {
      await api.delete(`/favorites/${removedBookId}`);
      toast.success("The book has been removed");
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    removeBook: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoritesData.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchFavoritesData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { removeBook } = favoritesSlice.actions;

export default favoritesSlice.reducer;
