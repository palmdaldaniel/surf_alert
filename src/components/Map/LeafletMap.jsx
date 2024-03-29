import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { MapContainer, TileLayer } from "react-leaflet";
import { mapboxConfig } from "../../mapbox";
import LocationMarker from "./LocationMarker";

import "leaflet/dist/leaflet.css";
import useStations from "../../hooks/useStations";

const LeafletMap = ({ height, locationId, coords, onLocationPage }) => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (locationId || coords) {
      setCurrentPosition([coords.lat, coords.lng]);
    } else {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const stations = useStations();

  return (
    <Box
      sx={{
        margin: { sm: "10px 0", md: "10px 0" },
        flex: 1,
        height: height ? `${height.height}` : "600px",
        width: "100%",
      }}
    >
      {currentPosition && (
        <MapContainer
          center={currentPosition}
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
          {stations.data && (
            <LocationMarker
              stations={stations.data}
              onLocationPage={onLocationPage}
              currentPosition={{
                lat: currentPosition[0],
                lng: currentPosition[1],
              }}
            />
          )}
        </MapContainer>
      )}
    </Box>
  );
};

export default LeafletMap;
