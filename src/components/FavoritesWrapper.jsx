import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FavoritesCard from "./FavoritesCard";
import useLocation from "../hooks/useLocation";

const FavoritesWrapper = () => {
  const favorites = useLocation();

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {favorites.locationQuery.data &&
            favorites.locationQuery.data.map((item, i) => (
              <Grid key={item._id} item xs={12} md={6}>
                <FavoritesCard {...item} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FavoritesWrapper;
