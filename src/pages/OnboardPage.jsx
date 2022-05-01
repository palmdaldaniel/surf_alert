import React from "react";
import Container from "@mui/material/Container";
import AddFavoritesForm from "../components/Forms/AddFavoritesForm";
const OnboardPage = () => {
  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth="sm">
      <AddFavoritesForm />
    </Container>
  );
};

export default OnboardPage;
