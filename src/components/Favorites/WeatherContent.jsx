import React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { parseTime, checkDirection, checkWindSpeed } from "../../helpers";

const WeatherContent = ({ data, locationName }) => {
  const { wind, sys, prefferedWindDirection, prefferedWindSpeed } = data;

  const checkWindConditions = (currentConditions) => {
    const { deg, speed } = currentConditions;

    const directionIsGood = checkDirection(deg, prefferedWindDirection);
    const speedIsGood = checkWindSpeed(speed, prefferedWindSpeed);

    //const directionIsGood = checkDirection(100, 109);
    //const speedIsGood = checkWindSpeed(15, 10);

    if (directionIsGood && speedIsGood) {
      return "#d1ffc659";
    }
  };

  return (
    <CardContent
      sx={{
        minHeight: "200px",
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
                height: "10px",
                width: "10px",
                transform: `rotate(${180 + wind.deg}deg)`,
              }}
            >
              <span>&#5169;</span>
            </div>
          </li>
        </ul>
      </Box>
    </CardContent>
  );
};

export default WeatherContent;
