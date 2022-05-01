import React from "react";
import Container from "@mui/material/Container";
import RegisterForm from "../components/Forms/RegisterForm";

const RegisterPage = () => {
  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth="sm">
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
