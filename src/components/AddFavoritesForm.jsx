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

const initialData = [
  {
    spot: "Kåseberga",
  },
  {
    spot: "Mölle",
  },
  {
    spot: "Torö",
  },
];

const AddFavoritesForm = () => {
  const { user } = useAuthContext();

  const [checked, setChecked] = React.useState([]);

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
                onClick={handleToggle(value.spot)}
                dense
              >
                <ListItemText id={labelId} primary={`Spot: ${value.spot}`} />
                <ListItemIcon>
                  <Switch
                    edge="start"
                    checked={checked.indexOf(value.spot) !== -1}
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
        <Button variant="contained">Add to profile 🔥</Button>
      </Box>
    </Box>
  );
};

export default AddFavoritesForm;
