import React, { useState } from "react";

// mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";

// components
import WindDirectionArrow from "./WindDirectionArrow";

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
    direction ? direction : 180
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
              margin: "10px 0 40px 0",
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

          <Box>
            <Typography>Wind Speed</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Slider
                sx={{
                  width: "300px",
                }}
                max={30}
                value={windSpeed}
                aria-label="Slider"
                onChange={(e) => handleChange(e)}
              />
              <Typography variant="body1">{windSpeed}m/s</Typography>
            </Box>
          </Box>

          <Typography>Wind Direction</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Slider
              sx={{
                width: "300px",
              }}
              max={360}
              value={windDirection}
              aria-label="Slider"
              onChange={(e) => handleSelectChange(e)}
            />

            <WindDirectionArrow degree={windDirection} />
          </Box>
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
