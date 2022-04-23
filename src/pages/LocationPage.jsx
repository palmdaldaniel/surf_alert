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

import PlaceholderImage from "../components/Placeholder/PlaceholderImage";
import LeafletMap from "../components/LeafletMap";

const LocationPage = () => {
  const { lat, lon: lng, locationId } = useParams(); // locationId will be undefined if user has this location as a saved favorite

  const alowImgRequest = locationId ? false : true;
  const img = useDoc(locationId, undefined, alowImgRequest);

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
        {img?.docs.length > 0 ? (
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
          <PlaceholderImage locationId={locationId} />
        )}

        {forecast.data && <WeatherChart forecastData={forecast.data.daily} />}
      </Box>
      {coords && (
        <LeafletMap
          onLocationPage
          coords={coords}
          locationId={locationId}
          height={{ height: "500px" }}
        />
      )}

      <CustomDialog open={open} handleClose={handleClose} />
    </Container>
  );
};

export default LocationPage;
