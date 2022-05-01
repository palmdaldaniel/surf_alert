import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { parseTime, checkDirection, checkWindSpeed } from "../../helpers";
import WindDirectionArrow from "../WindDirectionArrow";
import { useFavoritesContext } from "../../contexts/FavoritesContext";

const WeatherContent = ({
  data,
  locationName,
  preferedWindDirection,
  preferedWindSpeed,
  setItsOn,
  itsOn,
}) => {
  const { updateCounter } = useFavoritesContext();
  const { wind, sys } = data;

  useEffect(() => {
    if (itsOn) {
      updateCounter(true);
    }
  }, [itsOn]);

  const checkWindConditions = (currentConditions) => {
    const { deg, speed } = currentConditions;

    const directionIsGood = checkDirection(deg, preferedWindDirection);
    const speedIsGood = checkWindSpeed(speed, preferedWindSpeed);

    if (directionIsGood && speedIsGood) {
      if (!itsOn) {
        setItsOn(true);
      }
    }
  };

  useEffect(() => {
    console.log("firing function");
    checkWindConditions(wind);
  }, [preferedWindDirection, preferedWindSpeed]);

  return (
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: "20px",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {locationName}
        </Typography>

        <ul>
          <li>Sunrise: {parseTime(sys.sunrise)}</li>
          <li>Sunset: {parseTime(sys.sunset)}</li>
          <li>WindSpeed {wind.speed} m/s</li>
          <li
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Winddirection:
            <WindDirectionArrow degree={wind.deg} />
          </li>
        </ul>
      </Box>
    </CardContent>
  );
};

export default WeatherContent;
