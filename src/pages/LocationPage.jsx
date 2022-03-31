import React from "react";
import { useParams } from "react-router-dom";
import useCoordinates from "../hooks/useCoordinates";
import LocationTable from "../components/LocationTable";
import Container from "@mui/material/Container";

const LocationPage = () => {
  const { lat, lon: lng } = useParams();

  const weatherData = useCoordinates({ lat, lng });
  console.log(weatherData);

  return (
    <Container>
      {weatherData.isLoading && <p>Loading weatherData</p>}
      <LocationTable {...weatherData} />
    </Container>
  );
};

export default LocationPage;
