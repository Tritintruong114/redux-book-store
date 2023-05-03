import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { renderPage, getBooks } from "../features/addList/fetchDataSlice";
const PaginationBar = () => {
  const { page, totalPage } = useSelector((store) => store.fetchData);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(renderPage(value));
    dispatch(getBooks());
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
