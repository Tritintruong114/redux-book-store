import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useState } from "react";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();
  const [search, setSearch] = useState();

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
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
    />
  );
}

export default FTextField;
