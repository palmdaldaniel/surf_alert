import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCoordinates from "../hooks/useCoordinates";
import LocationTable from "../components/LocationTable";
import Container from "@mui/material/Container";
import WeatherChart from "../components/WeatherChart";
import { parseToCoordinates } from "../helpers";
import useForecast from "../hooks/useForecast";

const LocationPage = () => {
  const { lat, lon: lng } = useParams();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const parsedToCoords = parseToCoordinates({ lat, lng });

    setCoords(parsedToCoords);
  }, []);

  // get todays weather
  const weatherData = useCoordinates(coords);

  // get forecast for the next 7 days
  const forecast = useForecast(coords);

  return (
    <Container>
      {weatherData.isError && <p>No weather data for you :(</p>}
      {weatherData.isLoading && <p>Loading weatherData</p>}
      {weatherData.data && <LocationTable weatherData={weatherData.data} />}
      {forecast.data && <WeatherChart forecastData={forecast.data.daily} />}
    </Container>
  );
};

export default LocationPage;
