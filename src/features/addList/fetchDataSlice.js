import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  page: 1,
  pageNum: 11,
  totalPage: 10,
  limit: 10,
  books: [],
  isLoading: false,
};

export const getBooks = createAsyncThunk("book/getBooks", async (page) => {
  let url = `http://localhost:5000/books/?_page=${page}/&_limit=10`;
  try {
    const resp = await axios(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchDataSlice = createSlice({
  name: "addList",
  initialState,
  reducers: {
    renderPage: (state, action) => {
      console.log(action.payload, "THIS FROM SLICE");
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
        // console.log(state.page);
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

//
export const { renderPage } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;
