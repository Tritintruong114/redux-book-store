import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSearch, getBooks } from "../features/addList/fetchDataSlice";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();
  const { books } = useSelector((store) => store.fetchData);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  };

  const debounedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    console.log(debounedSearchTerm);
    if (debounedSearchTerm.length > 0) {
      dispatch(getSearch(debounedSearchTerm));
    }
    if (debounedSearchTerm.length === 0) {
      dispatch(getBooks());
    }
  }, [debounedSearchTerm, dispatch]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
    />
  );
}

export default FTextField;
