import React, { useState } from "react";
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
import useDoc from "../hooks/useDoc";

const FavoritesCard = (props) => {
  const [locationImg, setLocationImg] = useState();

  const { locationName, coordinates, locationId, deleteClick, _id } = props;

  const weatherData = useCoordinates(coordinates);

  const img = useDoc(locationId);

  const navigate = useNavigate();

  const handleClick = () => {
    const url = parseToUrl(coordinates);

    navigate(`/locations/${url.lng}/${url.lat}/${locationId}`);
  };

  const finishedLoading = (src) => setLocationImg(src);

  return (
    <Card sx={{ display: "flex" }}>
      {img &&
        img.docs.map((item, i) => {
          const src = item.data();

          return (
            <CardMedia
              key={i}
              sx={{
                maxWidth: "200px",
              }}
              component="img"
              alt="green iguana"
              image={src.url}
              onLoad={() => finishedLoading(src)}
            />
          );
        })}

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
                    transform: `rotate(${180 + weatherData.data.wind.deg}deg)`,
                  }}
                >
                  <span>&#5169;</span>
                </div>
              </li>
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
        <Button
          variant="outlined"
          onClick={() => deleteClick(_id, locationImg)}
          sx={{
            pl: 0,
          }}
          size="small"
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default FavoritesCard;
