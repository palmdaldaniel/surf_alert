import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

// hooks
import useCoordinates from "../hooks/useCoordinates";
import useForecast from "../hooks/useForecast";
import useLocation from "../hooks/useLocation";
import useDoc from "../hooks/useDoc";
import useDialog from "../hooks/useDialog";

// components
import CustomDialog from "../components/Dialog/CustomDialog";
import LeafletMap from "../components/Map/LeafletMap";
import LocationTable from "../components/Location/LocationTable";
import PlaceholderImage from "../components/Placeholder/PlaceholderImage";
import SpotImage from "../components/Image/SpotImage";
import WeatherChart from "../components/Location/WeatherChart";
import SkeletonPage from "./SkeletonPage";

// helpers
import { parseToCoordinates } from "../helpers";

const LocationPage = () => {
  const { lat, lon: lng, locationId } = useParams(); // locationId will be undefined if not saved as favorite

  const { createLocation, locationQuery, feedBack } = useLocation(locationId);
  const { isOpen, openDialog, closeDialog } = useDialog();

  const allowImgRequest = locationId ? false : true;

  const img = useDoc(locationId, undefined, allowImgRequest);

  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const parsedToCoords = parseToCoordinates({ lat, lng });

    setCoords(parsedToCoords);
  }, []);

  // handles users data
  const handleClose = async (values, isCancelled) => {
    if (isCancelled) {
      closeDialog();
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

    closeDialog();
  };

  // get todays weather
  const weatherData = useCoordinates(coords);

  // get forecast for the next 7 days
  const forecast = useForecast(coords);

  return (
    <Container>
      {weatherData.isError ||
        (forecast.isError && <p>No weather data for you :(</p>)}

      {/* wait for data to be loaded */}

      <Box>
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
              onClick={openDialog}
            >
              Save this location
            </Button>
          )}
        </Box>

        <Box
          sx={{
            minHeight: 112,
          }}
        >
          {weatherData.data && locationQuery.data && (
            <LocationTable
              locationData={
                locationQuery.data.length === 1 ? locationQuery.data : undefined
              }
              weatherData={weatherData.data}
            />
          )}
        </Box>

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

        <Box
          sx={{
            minHeight: "330px",
          }}
        >
          {img && img?.docs.length > 0 ? (
            <SpotImage docs={img.docs} />
          ) : (
            <PlaceholderImage locationId={locationId} />
          )}
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
      </Box>

      {weatherData.data && (
        <CustomDialog
          text="Save"
          spotName={weatherData.data.name}
          open={isOpen}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};

export default LocationPage;
