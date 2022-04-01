import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import useWaterTemp from "../hooks/useWaterTemp";

import { getWindDirection, parseTime } from "../helpers";

export default function Aside({ weatherData, station }) {
  const { name, sys, wind, main, coord } = weatherData;

  const temp = useWaterTemp(station);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem
        sx={{
          paddingBottom: 0,
        }}
      >
        <ListItemText primary="Location" secondary={name} />
      </ListItem>
      <ListItem
        sx={{
          paddingBottom: 0,
        }}
      >
        <ListItemText primary="Sunrise" secondary={parseTime(sys.sunrise)} />
      </ListItem>
      <ListItem
        sx={{
          paddingBottom: 0,
        }}
      >
        <ListItemText primary="Sunset" secondary={parseTime(sys.sunset)} />
      </ListItem>
      <ListItem
        sx={{
          paddingBottom: 0,
        }}
      >
        <ListItemText primary="WindSpeed" secondary={`${wind.speed} m/s`} />
      </ListItem>
      <ListItem
        sx={{
          paddingBottom: 0,
        }}
      >
        <ListItemText
          primary="Winddirection"
          secondary={getWindDirection(wind.deg)}
        />
      </ListItem>
      <ListItem
        sx={{
          paddingBottom: 0,
        }}
      >
        <ListItemText
          primary="Temperature"
          secondary={`${main.temp} degrees celsius`}
        />
      </ListItem>
    </List>
  );
}
