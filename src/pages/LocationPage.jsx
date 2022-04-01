import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCoordinates from "../hooks/useCoordinates";
import LocationTable from "../components/LocationTable";
import Container from "@mui/material/Container";
import WeatherChart from "../components/WeatherChart";
import { parseToCoordinates } from "../helpers";
import useForecast from "../hooks/useForecast";
import Box from "@mui/material/Box";

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

      <Box
        sx={{
          minWidth: "300px",

          display: "flex",

          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <img src="http://via.placeholder.com/550x150" />
        {forecast.data && <WeatherChart forecastData={forecast.data.daily} />}
      </Box>
    </Container>
  );
};

export default LocationPage;
