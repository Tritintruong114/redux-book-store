import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "../features/addList/fetchDataSlice";
import detailDataReducer from "../features/addList/detailSlice";
import favoritesReducer from "../features/addList/favoritesSlice";
export const store = configureStore({
  reducer: {
    fetchData: fetchDataReducer,
    detailData: detailDataReducer,
    favorites: favoritesReducer,
  },
});
