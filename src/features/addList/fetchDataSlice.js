import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (name, action) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  page: 10,
  pageNum: 10,
  totalPage: 10,
  limit: 10,
  books: [],
  isLoading: false,
};

const url = `http://localhost:5000/books/?_page=${initialState.page}/&_limit=10`;

export const fetchDataSlice = createSlice({
  name: "addList",
  initialState,
  reducers: {
    getFetchData: (state) => {},
    renderPage: (state, action) => {
      console.log(action.payload);
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

//
export const { getFetchData, renderPage } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;
