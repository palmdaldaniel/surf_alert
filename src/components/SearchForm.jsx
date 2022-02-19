import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useForm from "../hooks/useForm";

const SearchForm = ({ onSubmitClick, isLoading }) => {
  const [values, handleChange, resetForm] = useForm({
    searchString: "",
  });

  console.log(isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitClick(values.searchString);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
      >
        <TextField
          onChange={handleChange}
          value={values.searchString}
          sx={{ flex: 1, margin: "10px" }}
          id="filled-basic"
          name="searchString"
          label="Search for a location"
          variant="outlined"
        />

        <Button
          sx={{ margin: "10px" }}
          disabled={isLoading}
          variant="contained"
          type="submit"
        >
          Search
        </Button>
        <Button sx={{ margin: "10px" }}>Reset</Button>
      </Box>
    </form>
  );
};

export default SearchForm;
