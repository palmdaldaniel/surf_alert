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

import useDoc from "../hooks/useDoc";

import PlaceholderImage from "../components/Placeholder/PlaceholderImage";
import LeafletMap from "../components/LeafletMap";
import Alert from "@mui/material/Alert";
import SpotImage from "../components/Image/SpotImage";

const LocationPage = () => {
  const { lat, lon: lng, locationId } = useParams(); // locationId will be undefined if user has this location as a saved favorite

  const { createLocation, locationQuery, feedBack } = useLocation(locationId);

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

  const handleClose = async (values, isCancelled) => {
    if (isCancelled) {
      setOpen(false);
      return;
    }

    const { locationName, windDirection, windSpeed, locationId } = values;

    const locationToSave = {
      coords,
      locationName,
      windDirection,
      windSpeed,
      locationId,
    };

    await createLocation(locationToSave);

    setOpen(false);
  };

  // get todays weather
  const weatherData = useCoordinates(coords);

  // get forecast for the next 7 days
  const forecast = useForecast(coords);

  return (
    <Container>
      {weatherData.isError && <p>No weather data for you :(</p>}
      {weatherData.isLoading && <p>Loading weatherData</p>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {!locationId && (
          <Button
            sx={{
              alignSelf: "flex-end",
              margin: "10px 0 ",
            }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Save this location
          </Button>
        )}
      </Box>

      {weatherData.data && locationQuery.data && (
        <LocationTable
          locationData={
            locationQuery.data.length === 1 ? locationQuery.data : undefined
          }
          weatherData={weatherData.data}
        />
      )}

      {feedBack && (
        <Alert
          sx={{
            margin: "20px 0",
            width: "100%",
          }}
          severity={feedBack.type}
        >
          {feedBack.msg}
        </Alert>
      )}

      <Box>
        {img && img?.docs.length > 0 ? (
          <SpotImage docs={img.docs} />
        ) : (
          <PlaceholderImage locationId={locationId} />
        )}
        {/* only render if this location is not saved as a favorite */}
      </Box>

      <Box
        sx={{
          display: { sm: "flex" },
        }}
      >
        {coords && (
          <LeafletMap
            onLocationPage
            coords={coords}
            locationId={locationId}
            height={{ height: "300px" }}
          />
        )}
        {forecast.data && <WeatherChart forecastData={forecast.data.daily} />}
      </Box>

      <CustomDialog text="Save" open={open} handleClose={handleClose} />
    </Container>
  );
};

export default LocationPage;
