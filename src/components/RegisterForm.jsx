import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useToggle from "../hooks/useToggle";

import useForm from "../hooks/useForm";

const RegisterForm = () => {
  const [values, handleChange, resetForm] = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isShowing, toggle } = useToggle();

  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setMessage("Passwords do no match");
    }
    console.log(values);
    resetForm();
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
          type={isShowing ? "text" : "password"}
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={values.confirmPassword}
          sx={{ margin: "10px" }}
          id="filled-basic"
          name="confirmPassword"
          label="Confirm Password"
          type={isShowing ? "text" : "password"}
          variant="outlined"
        />
      </Box>
      <div>
        <FormControlLabel
          sx={{ margin: "10px" }}
          control={<Checkbox />}
          label="Show password"
          onClick={toggle}
        />
      </div>
      <Button sx={{ margin: "10px" }} variant="contained" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
