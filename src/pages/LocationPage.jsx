import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCoordinates from "../hooks/useCoordinates";
import LocationTable from "../components/LocationTable";
import Container from "@mui/material/Container";
import WeatherChart from "../components/WeatherChart";
import { parseToCoordinates } from "../helpers";
import useForecast from "../hooks/useForecast";
import useLocation from "../hooks/useLocation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomDialog from "../components/CustomDialog";

const LocationPage = () => {
  const { lat, lon: lng, locationId } = useParams(); // locationId will be undefined if user has this location as a saved favorite

  const [coords, setCoords] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const parsedToCoords = parseToCoordinates({ lat, lng });

    setCoords(parsedToCoords);
  }, []);

  const handleClickOpen = () => setOpen(true);

  // handles users data
  const { createLocation, locationQuery } = useLocation(locationId);

  const handleClose = (values) => {
    const { locationName, windDirection, windSpeed } = values;
    setOpen(false);

    const locationToSave = {
      coords,
      locationName,
      windDirection,
      windSpeed,
    };

    createLocation(locationToSave);
  };

  // get todays weather
  const weatherData = useCoordinates(coords);

  // get forecast for the next 7 days
  const forecast = useForecast(coords);

  return (
    <Container>
      {weatherData.isError && <p>No weather data for you :(</p>}
      {weatherData.isLoading && <p>Loading weatherData</p>}
      {weatherData.data && locationQuery.data && (
        <LocationTable
          locationData={
            locationQuery.data.length === 1 ? locationQuery.data : undefined
          }
          weatherData={weatherData.data}
        />
      )}

      <Button variant="contained" onClick={handleClickOpen}>
        Save this location
      </Button>

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
      <CustomDialog open={open} handleClose={handleClose} />
    </Container>
  );
};

export default LocationPage;
