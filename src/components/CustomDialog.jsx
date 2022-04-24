import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";

const CustomDialog = ({
  open,
  handleClose,
  currentLocationId,
  direction,
  speed,
  spotName,
  text,
}) => {
  const [windSpeed, setWindSpeed] = useState(speed ? speed : 15);
  const [windDirection, setWindDirection] = useState(
    direction ? direction : 15
  );

  const [locationName, setLocationName] = useState(spotName ? spotName : "");
  const [locationId] = useState(
    currentLocationId ? currentLocationId : uuidv4()
  );

  const handleChange = (event) => setWindSpeed(event.target.value);

  const handleSelectChange = (event) => setWindDirection(event.target.value);

  const handleInputChange = (event) => setLocationName(event.target.value);

  const submitValues = () => {
    const values = {
      windSpeed,
      windDirection,
      locationName,
      locationId,
    };

    handleClose(values);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{text} location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please specify conditions when this spot fires up 🔥!
          </DialogContentText>
          <Box
            sx={{
              margin: "30px",
            }}
          >
            <TextField
              value={locationName}
              autoFocus
              margin="dense"
              id="name"
              label="Location Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => handleInputChange(e)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Typography>Wind Speed</Typography>
            <Slider
              sx={{
                flex: 0.5,
              }}
              max={30}
              value={windSpeed}
              aria-label="Slider"
              onChange={(e) => handleChange(e)}
            />
            <p>{windSpeed}m/s</p>
          </Box>

          <FormControl
            fullWidth
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Typography>Wind Direction</Typography>
            <Slider
              sx={{
                flex: 0.5,
              }}
              max={360}
              value={windDirection}
              aria-label="Slider"
              onChange={(e) => handleSelectChange(e)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
                height: "10px",
                width: "10px",
                transform: `rotate(${180 + windDirection}deg)`,
              }}
            >
              <span>&#5169;</span>
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(undefined, true)}>Cancel</Button>
          <Button onClick={submitValues}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
