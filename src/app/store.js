import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "../features/addList/fetchDataSlice";

export const store = configureStore({
  reducer: {
    fetchData: fetchDataReducer,
  },
});
