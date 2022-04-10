import React from "react";
import { useNavigate } from "react-router-dom";

// mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { parseToUrl, parseTime, getCompass2 } from "../helpers";

// hooks
import useCoordinates from "../hooks/useCoordinates";

const FavoritesCard = (props) => {
  const { locationName, coordinates, locationId } = props;

  const weatherData = useCoordinates(coordinates);

  const navigate = useNavigate();
  const handleClick = () => {
    const url = parseToUrl(coordinates);

    navigate(`/locations/${url.lng}/${url.lat}/${locationId}`);
  };

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        sx={{
          maxWidth: "200px",
        }}
        component="img"
        alt="green iguana"
        image="https://images.unsplash.com/photo-1591630866811-eceedf667541?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
      />
      <CardContent
        sx={{
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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

          {weatherData.data && (
            <ul>
              <li>Sunrise: {parseTime(weatherData.data.sys.sunrise)}</li>
              <li>Sunset: {parseTime(weatherData.data.sys.sunset)}</li>
              <li>WindSpeed {weatherData.data.wind.speed} m/s</li>
              <li>Winddirection {getCompass2(weatherData.data.wind.deg)}</li>
            </ul>
          )}
        </Box>

        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            pl: 0,
          }}
          size="small"
        >
          Go To Spot
        </Button>
      </CardContent>
    </Card>
  );
};

export default FavoritesCard;
