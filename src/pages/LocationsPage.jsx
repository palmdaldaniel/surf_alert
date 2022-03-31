import React from "react";

//mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//components
import LeafletMap from "../components/LeafletMap";
import LocationsTable from "../components/LocationsTable";

const LocationsPage = () => {
  return (
    <Container
      sx={{
        marginTop: "2em",
      }}
    >
      <Typography variant="h5">
        Use the map to get conditions on a specific location in the baltics
      </Typography>
      <LeafletMap />
    </Container>
  );
};

export default LocationsPage;
