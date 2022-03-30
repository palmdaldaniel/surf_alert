import React from "react";

//mui
import Container from "@mui/material/Container";

//components
import LeafletMap from "../components/LeafletMap";

const LocationsPage = () => {
  return (
    <Container
      sx={{
        marginTop: "2em",
      }}
    >
      <LeafletMap />
    </Container>
  );
};

export default LocationsPage;
