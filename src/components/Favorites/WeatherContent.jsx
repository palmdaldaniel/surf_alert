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
}) => {
  const { updateCounter } = useFavoritesContext();
  const { wind, sys } = data;
  const [itsOn, setItsOn] = useState(false);

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
      return "#d1ffc659";
    }
  };

  return (
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: checkWindConditions(wind),
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
