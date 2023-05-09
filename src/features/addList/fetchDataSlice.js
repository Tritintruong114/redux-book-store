import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
    toast.error(error.message);
  }
});

export const getSearch = createAsyncThunk(
  "search/getSearch",
  async (bookName) => {
    let url = `http://localhost:5000/books/?_page=1/&_limit=10&q=${bookName}`;
    if (bookName) {
      try {
        const resp = await axios(url);
        return resp.data;
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }
);

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
        state.isLoading = true;
      })
      .addCase(getSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getSearch.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

//
export const { renderPage } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;
