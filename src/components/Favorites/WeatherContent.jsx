import React, { useEffect } from "react";

// mui
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WindPowerIcon from "@mui/icons-material/WindPower";
import ExploreIcon from "@mui/icons-material/Explore";

// helpers
import { parseTime, checkDirection, checkWindSpeed } from "../../helpers";
import { useFavoritesContext } from "../../contexts/FavoritesContext";

// components
import WindDirectionArrow from "../Utils/WindDirectionArrow";

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
        <Typography gutterBottom variant="h6" component="div">
          {locationName}
        </Typography>

        <List
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box component="div">
            <ListItem>
              <WbSunnyIcon sx={{ mr: 2 }} />
              <ListItemText primary={parseTime(sys.sunrise)} />
            </ListItem>
            <ListItem>
              <DarkModeIcon sx={{ mr: 2 }} />
              <ListItemText primary={parseTime(sys.sunset)} />
            </ListItem>
          </Box>
          <Box component="div">
            <ListItem>
              <WindPowerIcon sx={{ mr: 2 }} />
              <ListItemText primary={wind.speed + "ms/s"} />
            </ListItem>
            <ListItem>
              <ExploreIcon sx={{ mr: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WindDirectionArrow degree={wind.deg} />
              </Box>
            </ListItem>
          </Box>
        </List>
      </Box>
    </CardContent>
  );
};

export default WeatherContent;
