import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import useWaterTemp from "../hooks/useWaterTemp";

import { parseTime } from "../helpers";

export default function Aside({ weatherData, stationId, locationName }) {
  const { name, sys, wind, main } = weatherData;

  const temp = useWaterTemp(stationId);

  const windDirectionArrow = (deg) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          height: "10px",
          width: "10px",
          transform: `rotate(${180 + deg}deg)`,
        }}
      >
        <span>&#5169;</span>
      </div>
    );
  };

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
          secondary={windDirectionArrow(wind.deg)}
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
