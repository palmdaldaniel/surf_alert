import React, { useState } from "react";

//mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//hooks
import useLocationWeather from "../hooks/useLocationWeather";

//components
import SearchForm from "../components/SearchForm";
import LocationsTable from "../components/LocationsTable";
import LocationsMap from "../components/LocationsMap";
import LocationList from "../components/LocationList";

const LocationsPage = () => {
  const [location, setLocation] = useState(null);

  const { coordinates, weatherData } = useLocationWeather(location);

  const onSubmitClick = (input) => {
    setLocation(input);
  };

  return (
    <Container
      sx={{
        marginTop: "2em",
      }}
    >
      <Typography variant="h3" sx={{ fontSize: "2em", marginBottom: "0.5em" }}>
        Search for a spot or take a look at the ones below
      </Typography>

      <SearchForm
        isLoading={coordinates.isLoading || weatherData.isLoading}
        onSubmitClick={onSubmitClick}
      />

      {weatherData.data && <LocationList {...weatherData} />}
      <Typography variant="h5" sx={{ margin: "0.5em 0" }}>
        Common spots
      </Typography>
      <Box
        sx={{
          display: { md: "flex" },
          justifyContent: "center",
        }}
      >
        <LocationsTable />
        <LocationsMap />
      </Box>
    </Container>
  );
};

export default LocationsPage;
