import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// mui
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";

// components
import CardImageWrapper from "./CardImageWrapper";
import WeatherContent from "./WeatherContent";

import { parseToUrl } from "../../helpers";

// hooks
import useCoordinates from "../../hooks/useCoordinates";
import useDoc from "../../hooks/useDoc";
import useDialog from "../../hooks/useDialog";
import useMenu from "../../hooks/useMenu";
import CustomDialog from "../Dialog/CustomDialog";

const FavoritesCard = (props) => {
  const {
    locationName,
    coordinates,
    locationId,
    deleteClick,
    _id,
    prefferedWindDirection,
    prefferedWindSpeed,
    handleUpdateRequest,
  } = props;

  const [locationImg, setLocationImg] = useState();
  const [itsOn, setItsOn] = useState(false);

  // hooks
  const weatherData = useCoordinates(coordinates);
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { menuIsOpen, closeMenu, openMenu, anchorEl } = useMenu();

  const handleUpdateDialog = (values, isCancelled) => {
    if (isCancelled) {
      closeDialog();
      return;
    }

    const docId = _id;

    handleUpdateRequest(values, docId);
    closeDialog();
    closeMenu();
  };

  const img = useDoc(locationId);

  const navigate = useNavigate();

  const handleClick = () => {
    const url = parseToUrl(coordinates);

    navigate(`/locations/${url.lng}/${url.lat}/${locationId}`);
  };

  const finishedLoading = (src) => setLocationImg(src);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          maxWidth: 345,
          height: 400,
          justifyContent: "space-between",
          backgroundColor: itsOn && "#d1ffc659",
        }}
      >
        {img && (
          <CardImageWrapper data={img.docs} finishedLoading={finishedLoading} />
        )}

        {weatherData.data && (
          <WeatherContent
            data={weatherData.data}
            locationName={locationName}
            preferedWindDirection={prefferedWindDirection}
            preferedWindSpeed={prefferedWindSpeed}
            setItsOn={setItsOn}
            itsOn={itsOn}
          />
        )}
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            margin: "5px",
          }}
          size="small"
        >
          Go To Spot
        </Button>

        <Button
          sx={{
            height: "40px",
            position: "absolute",
            right: 0,
          }}
          onClick={openMenu}
        >
          <MoreVertIcon />
        </Button>
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={menuIsOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 50,
          horizontal: -148,
        }}
      >
        <MenuList>
          <MenuItem onClick={openDialog}>
            <ListItemIcon>
              <BuildIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Update preferenses</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => deleteClick(_id, locationImg, locationName)}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>

      <CustomDialog
        open={isOpen}
        handleClose={handleUpdateDialog}
        currentLocationId={locationId}
        direction={prefferedWindDirection}
        speed={prefferedWindSpeed}
        spotName={locationName}
        text="Update"
      />
    </>
  );
};

export default FavoritesCard;
