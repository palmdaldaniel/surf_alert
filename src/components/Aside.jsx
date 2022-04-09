import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import useWaterTemp from "../hooks/useWaterTemp";

import { getWindDirection, parseTime } from "../helpers";

export default function Aside({ weatherData, stationId, locationName }) {
  const { name, sys, wind, main } = weatherData;

  const temp = useWaterTemp(stationId);

  return (
    <List
      sx={{
        display: { sm: "flex" },
        justifyContent: "start",
      }}
    >
      <ListItem
        sx={{
          paddingBottom: 0,
        }}
      >
        <ListItemText
          primary="Location"
          secondary={locationName ? locationName : name}
        />
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
        <ListItemText primary="Air Temperature" secondary={`${main.temp}°C`} />
      </ListItem>
      {temp.data && (
        <ListItem
          sx={{
            paddingBottom: 0,
          }}
        >
          <ListItemText
            primary="Water Temperature"
            secondary={`${temp.data.parameter.key}${temp.data.parameter.unit}`}
          />
        </ListItem>
      )}
    </List>
  );
}
