import React from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FTextField } from "../form";
import { useState } from "react";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <FTextField
      name="search"
      sx={{ width: 300 }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchForm;
