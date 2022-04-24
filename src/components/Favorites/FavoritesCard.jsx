import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// mui
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

// components
import CardImageWrapper from "./CardImageWrapper";
import WeatherContent from "./WeatherContent";

import { parseToUrl } from "../../helpers";

// hooks
import useCoordinates from "../../hooks/useCoordinates";
import useDoc from "../../hooks/useDoc";

const FavoritesCard = (props) => {
  const [locationImg, setLocationImg] = useState();

  const {
    locationName,
    coordinates,
    locationId,
    deleteClick,
    _id,
    prefferedWindDirection,
    prefferedWindSpeed,
  } = props;

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
      {img && (
        <CardImageWrapper data={img.docs} finishedLoading={finishedLoading} />
      )}

      {weatherData.data && (
        <WeatherContent
          data={weatherData.data}
          locationName={locationName}
          prefferedWindDirection={prefferedWindDirection}
          prefferedWindSpeed={prefferedWindSpeed}
        />
      )}

      <>
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
      </>
    </Card>
  );
};

export default FavoritesCard;
