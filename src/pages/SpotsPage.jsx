import React, { useState } from "react";
import useLocationWeather from "../hooks/useLocationWeather";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchForm from "../components/SearchForm";

const SpotPage = () => {
  const [location, setLocation] = useState(null);

  const { coordinates, weatherData } = useLocationWeather(location);

  const onSubmitClick = (input) => {
    setLocation(input);
  };

  return (
    <Container
      sx={{
        textAlign: "center",
        marginTop: "2em",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "2em" }}>
        Search for a spot or take a look at the ones below
      </Typography>

      <SearchForm
        isLoading={coordinates.isLoading || weatherData.isLoading}
        onSubmitClick={onSubmitClick}
      />
    </Container>
  );
};

export default SpotPage;
