import React from "react";
import { useParams } from "react-router-dom";
import useCoordinates from "../hooks/useCoordinates";
import LocationTable from "../components/LocationTable";
import Container from "@mui/material/Container";

const LocationPage = () => {
  const { lat, lon: lng } = useParams();

  const weatherData = useCoordinates({ lat, lng });

  return (
    <Container>
      {weatherData.isError && <p>No weather data for you :(</p>}
      {weatherData.isLoading && <p>Loading weatherData</p>}
      {weatherData.data && <LocationTable weatherData={weatherData.data} />}
    </Container>
  );
};

export default LocationPage;
