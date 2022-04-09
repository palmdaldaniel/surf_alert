import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FavoritesCard from "./FavoritesCard";

const FavoritesWrapper = () => {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FavoritesCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <FavoritesCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <FavoritesCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <FavoritesCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <FavoritesCard />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FavoritesWrapper;
