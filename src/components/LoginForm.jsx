import React from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useForm from "../hooks/useForm";

const LoginForm = () => {
  const [values, handleChange, resetForm] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    resetForm();

    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <TextField
          onChange={handleChange}
          value={values.email}
          sx={{ margin: "10px" }}
          id="filled-basic"
          name="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={values.password}
          sx={{ margin: "10px" }}
          id="filled-basic"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
        />
      </Box>
      <Button sx={{ margin: "10px" }} variant="contained" type="submit">
        Login
      </Button>
      <Button>
        <Link to="/register">Register?</Link>
      </Button>
    </form>
  );
};

export default LoginForm;
