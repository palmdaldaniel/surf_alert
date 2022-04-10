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

import DropZone from "./DropZone";

const CustomDialog = ({ open, handleClose }) => {
  const [sliderValue, setSliderValue] = useState(30);
  const [windDirection, setWindDirection] = useState();
  const [locationName, setLocationName] = useState("");
  const [locationId] = useState(uuidv4());

  const handleChange = (event) => setSliderValue(event.target.value);

  const handleSelectChange = (event) => setWindDirection(event.target.value);

  const handleInputChange = (event) => setLocationName(event.target.value);

  const submitValues = () => {
    const values = {
      windSpeed: sliderValue,
      windDirection,
      locationName,
      locationId,
    };

    handleClose(values);
    setSliderValue(30);
    setWindDirection();
    setLocationName("");
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to save this location. Please specify conditions when
            this spot fires up 🔥!
          </DialogContentText>
          <DropZone locationId={locationId} />

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Slider
              sx={{
                flex: 0.5,
              }}
              value={sliderValue}
              aria-label="Slider"
              onChange={(e) => handleChange(e)}
            />
            <p>{sliderValue}</p>
          </Box>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Wind Direction
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={windDirection}
                label="Wind Direction"
                onChange={handleSelectChange}
              >
                <MenuItem value={0}>North</MenuItem>
                <MenuItem value={90}>East</MenuItem>
                <MenuItem value={180}>South</MenuItem>
                <MenuItem value={270}>West</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitValues}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
