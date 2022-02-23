import React, { useState } from "react";

//mui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

//hooks
import useLocationWeather from "../hooks/useLocationWeather";

//components
import SearchForm from "../components/SearchForm";
import SpotsTable from "../components/SpotsTable";

const SpotPage = () => {
  const [location, setLocation] = useState(null);

  const { coordinates, weatherData } = useLocationWeather(location);

  const onSubmitClick = (input) => {
    setLocation(input);
  };

  console.log(weatherData);

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

      <Typography variant="h5" sx={{ margin: "0.5em 0" }}>
        Favorites:
      </Typography>
      <SpotsTable />
    </Container>
  );
};

export default SpotPage;
