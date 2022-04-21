import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";

import { useAuthContext } from "../contexts/AuthContext";
import useLocation from "../hooks/useLocation";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    spot: "Kåseberga",
    windSpeed: 15,
    direction: 190,
    lat: 55.3845235,
    lng: 14.0630386,
  },
  {
    spot: "Mölle",
    windSpeed: 12,
    direction: 270,
    lat: 56.2833472,
    lng: 12.5002034,
  },
  {
    spot: "Torö",
    windSpeed: 12,
    direction: 270,
    lat: 58.8401,
    lng: 17.8419,
  },
];

const AddFavoritesForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [checked, setChecked] = React.useState([]);
  const { createLocation } = useLocation();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClick = (isCreating) => {
    const locations = isCreating ? checked : undefined;

    if (!locations) {
      console.log("navigate to homepage");
      navigate("/");
      return;
    }

    locations.forEach((location) => {
      const uuid = uuidv4(); // give an id

      const locationValues = {
        coords: {
          lat: location.lat,
          lng: location.lng,
        },
        locationName: location.spot,
        windDirection: location.direction,
        windSpeed: location.windSpeed,
        locationId: uuid,
      };

      createLocation(locationValues);
    });
    console.log("give me some favorites pls 🔥");
    navigate("profile");
  };

  return (
    <Box>
      <Typography variant="h6">Hi {user.email}</Typography>

      <Typography variant="body1">
        Here are some known surfspots in sweden!
      </Typography>

      <Typography variant="body2">
        Would you like to add them to your profile?
      </Typography>
      <List
        sx={{
          width: "100%",

          bgcolor: "background.paper",
        }}
      >
        {initialData.map((value, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemText id={labelId} primary={`Spot: ${value.spot}`} />
                <ListItemIcon>
                  <Switch
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{
            marginRight: 3,
          }}
          variant="outlined"
        >
          No pls!
        </Button>
        <Button onClick={() => handleClick(true)} variant="contained">
          Add to profile 🔥
        </Button>
      </Box>
    </Box>
  );
};

export default AddFavoritesForm;
