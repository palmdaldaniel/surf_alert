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
import CardMedia from "@mui/material/CardMedia";
import CustomDialog from "../components/CustomDialog";

import useDoc from "../hooks/useDoc";

const LocationPage = () => {
  const { lat, lon: lng, locationId } = useParams(); // locationId will be undefined if user has this location as a saved favorite

  const img = useDoc(locationId);

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
    const { locationName, windDirection, windSpeed, locationId } = values;
    setOpen(false);

    const locationToSave = {
      coords,
      locationName,
      windDirection,
      windSpeed,
      locationId,
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

      {/* only render if this location is not saved as a favorite */}
      {!locationId && (
        <Button variant="contained" onClick={handleClickOpen}>
          Save this location
        </Button>
      )}

      <Box
        sx={{
          minWidth: "300px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {img?.docs === [] ? (
          img.docs.map((item, i) => {
            const src = item.data();

            return (
              <CardMedia
                key={i}
                sx={{
                  maxWidth: "500px",
                }}
                component="img"
                alt="green iguana"
                image={src.url}
              />
            );
          })
        ) : (
          <CardMedia
            sx={{
              maxWidth: "500px",
            }}
            component="img"
            alt="surfer"
            image={
              "https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
          />
        )}

        {forecast.data && <WeatherChart forecastData={forecast.data.daily} />}
      </Box>
      <CustomDialog open={open} handleClose={handleClose} />
    </Container>
  );
};

export default LocationPage;
