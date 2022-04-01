import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCoordinates from "../hooks/useCoordinates";
import LocationTable from "../components/LocationTable";
import Container from "@mui/material/Container";
import { parseToCoordinates } from "../helpers";
const LocationPage = () => {
  const { lat, lon: lng } = useParams();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const parsedToCoords = parseToCoordinates({ lat, lng });

    setCoords(parsedToCoords);
  }, []);

  const weatherData = useCoordinates(coords);

  return (
    <Container>
      {weatherData.isError && <p>No weather data for you :(</p>}
      {weatherData.isLoading && <p>Loading weatherData</p>}
      {weatherData.data && <LocationTable weatherData={weatherData.data} />}
    </Container>
  );
};

export default LocationPage;
