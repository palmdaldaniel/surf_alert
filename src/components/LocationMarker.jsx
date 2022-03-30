import React, { useState } from "react";
import { Icon } from "leaflet";
import { useMapEvent, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import useCoordinates from "../hooks/useCoordinates";
import { getWindDirection } from "../helpers/CalcWindDir";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const weatherData = useCoordinates(position);

  console.log(weatherData);

  const map = useMapEvent({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
      position={position}
    >
      <Popup>
        {weatherData.isLoading && <p>Loading weatherData</p>}
        {weatherData.data && (
          <>
            <p>{weatherData.data.name}</p>
            <p>Wind speed: {weatherData.data.wind.speed} m/s</p>
            <p>Wind direction: {getWindDirection(weatherData.data.wind.deg)}</p>
          </>
        )}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
