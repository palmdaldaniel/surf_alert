import React, { useState } from "react";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import FavoritesCard from "./FavoritesCard";
import useLocation from "../../hooks/useLocation";
import DeleteDialog from "../DeleteDialog";
import useCollection from "../../hooks/useCollection";

const FavoritesWrapper = () => {
  const [locationToBeDeleted, setLocationToBeDelete] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const favorites = useLocation();

  const collection = useCollection();
  const handleDeleteClick = (action) => {
    if (!action) {
      setIsOpen(false);
      setLocationToBeDelete();
      return;
    }

    collection.deleteLocation(locationToBeDeleted);

    console.log("hello delete me pls", locationToBeDeleted);
    setIsOpen(false);
    setLocationToBeDelete();
  };

  const openDialog = (id, img, name) => {
    setLocationToBeDelete({
      id,
      img,
      name,
    });
    setIsOpen(true);
  };

  const handleUpdateRequest = (values, docId) => {
    favorites.updateLocation(values, docId);
  };

  return (
    <Container>
      {favorites.feedBack && (
        <Alert
          sx={{
            margin: "20px 0",
            width: "100%",
          }}
          severity={favorites.feedBack.type}
        >
          {favorites.feedBack.msg}
        </Alert>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {favorites.locationQuery.data &&
          favorites.locationQuery.data.length > 0 ? (
            favorites.locationQuery.data.map((item, i) => (
              <Grid key={item._id} item xs={12} md={6}>
                <FavoritesCard
                  handleUpdateRequest={handleUpdateRequest}
                  deleteClick={openDialog}
                  {...item}
                />
              </Grid>
            ))
          ) : (
            <Alert sx={{ margin: "50px auto" }} severity="info">
              You have no favorites yet. Go to locations in the menu to set
              some!
            </Alert>
          )}
        </Grid>
      </Box>
      <DeleteDialog
        open={isOpen}
        id={locationToBeDeleted?.id}
        name={locationToBeDeleted?.name}
        handleClose={handleDeleteClick}
        handleDelete={handleDeleteClick}
      />
    </Container>
  );
};

export default FavoritesWrapper;
