import React from "react";
import Box from "@mui/material/Box";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { mapboxConfig } from "../mapbox";
import LocationMarker from "./LocationMarker";

import "leaflet/dist/leaflet.css"; // styles for leaf leat map

const LeafletMap = () => {
  const position = [55.505, 14.0657];

  return (
    <Box
      sx={{
        margin: { sm: "10px 0", md: "0" },
        flex: 1,
        height: "600px",
        width: "100s%",
      }}
    >
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${mapboxConfig.username}/${mapboxConfig.styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxConfig.token}`}
        />
        <LocationMarker />
      </MapContainer>
    </Box>
  );
};

export default LeafletMap;
