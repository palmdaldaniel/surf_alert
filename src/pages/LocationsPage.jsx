import React from "react";

//mui
import Container from "@mui/material/Container";

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
      {/* <LocationsTable /> */}
      <LeafletMap />
    </Container>
  );
};

export default LocationsPage;
