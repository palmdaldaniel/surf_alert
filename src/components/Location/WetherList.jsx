import * as React from "react";

// mui
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WindPowerIcon from "@mui/icons-material/WindPower";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ExploreIcon from "@mui/icons-material/Explore";
import WavesIcon from "@mui/icons-material/Waves";

// hooks
import useWaterTemp from "../../hooks/useWaterTemp";

import { parseTime } from "../../helpers";
import WindDirectionArrow from "../Utils/WindDirectionArrow";

// row setup
const xs = 6;
const sm = 3;

export default function WetherList({ weatherData, stationId, locationName }) {
  const { name, sys, wind, main } = weatherData;

  const temp = useWaterTemp(stationId);

  return (
    <List>
      <Grid container>
        <Grid item xs={xs} sm={sm}>
          <ListItem>
            <LocationOnIcon sx={{ mr: 2 }} />
            <ListItemText primary={locationName ? locationName : name} />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm}>
          <ListItem>
            <WbSunnyIcon sx={{ mr: 2 }} />
            <ListItemText primary={parseTime(sys.sunrise)} />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm}>
          <ListItem>
            <DarkModeIcon sx={{ mr: 2 }} />
            <ListItemText primary={parseTime(sys.sunset)} />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm}>
          <ListItem>
            <DeviceThermostatIcon sx={{ mr: 2 }} />
            <ListItemText primary={`${main.temp}°C`} />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm}>
          {temp.data && (
            <ListItem>
              <WavesIcon sx={{ mr: 2 }} />
              <ListItemText
                primary={`${temp.data.value[0].value}${temp.data.parameter.unit}`}
              />
            </ListItem>
          )}
        </Grid>
        <Grid item xs={xs} sm={sm}>
          <ListItem>
            <WindPowerIcon sx={{ mr: 2 }} />
            <ListItemText primary={`${wind.speed} m/s`} />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm}>
          <ListItem>
            <ExploreIcon sx={{ mr: 2 }} />
            <WindDirectionArrow degree={wind.deg} />
          </ListItem>
        </Grid>
      </Grid>
    </List>
  );
}
