import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

import useWaterTemp from "../../hooks/useWaterTemp";

import { parseTime } from "../../helpers";
import WindDirectionArrow from "../Utils/WindDirectionArrow";

// row setup
const xs = 6;
const sm = 4;
const md = 3;

export default function WetherList({ weatherData, stationId, locationName }) {
  const { name, sys, wind, main } = weatherData;

  const temp = useWaterTemp(stationId);

  return (
    <List>
      <Grid container>
        <Grid item xs={xs} sm={sm} md={md}>
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
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
          <ListItem
            sx={{
              paddingBottom: 0,
            }}
          >
            <ListItemText
              primary="Sunrise"
              secondary={parseTime(sys.sunrise)}
            />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
          <ListItem
            sx={{
              paddingBottom: 0,
            }}
          >
            <ListItemText primary="Sunset" secondary={parseTime(sys.sunset)} />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
          <ListItem
            sx={{
              paddingBottom: 0,
            }}
          >
            <ListItemText primary="WindSpeed" secondary={`${wind.speed} m/s`} />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
          <ListItem
            sx={{
              paddingBottom: 0,
            }}
          >
            <ListItemText
              primary="Winddirection"
              secondary={<WindDirectionArrow degree={wind.deg} />}
            />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
          <ListItem
            sx={{
              paddingBottom: 0,
            }}
          >
            <ListItemText
              primary="Air Temperature"
              secondary={`${main.temp}°C`}
            />
          </ListItem>
        </Grid>
        <Grid item xs={xs} sm={sm} md={md}>
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
        </Grid>
      </Grid>
    </List>
  );
}
