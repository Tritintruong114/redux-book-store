import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiService";
import { toast } from "react-toastify";
const initialState = {
  book: null,
  addingBook: false,
  loading: false,
};

export const fetchDetail = createAsyncThunk(
  "detail/detailBook",
  async (bookId) => {
    try {
      const res = await api.get(`/books/${bookId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postFavoriteBook = createAsyncThunk(
  "favorites/post",
  async (addingBook) => {
    try {
      console.log(addingBook);
      await api.post(`/favorites`, addingBook);
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    addReadingList: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetail.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchDetail.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addReadingList } = detailSlice.actions;
export default detailSlice.reducer;
