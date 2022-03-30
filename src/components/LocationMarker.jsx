import React, { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { useMapEvent, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import useCoordinates from "../hooks/useCoordinates";
import { getWindDirection } from "../helpers/CalcWindDir";
import { calcNearest } from "../helpers/CalcDistance";
import useWaterTemp from "../hooks/useWaterTemp";
const stations = [
  {
    name: "LANDSORT NORRA",
    lat: 58.7689,
    lon: 17.8589,
    stationId: 2507,
  },
  {
    name: "onsala",
    lat: 57.392,
    lon: 11.919,
    stationId: 33084,
  },
  {
    name: "kungsholms fort",
    lat: 56.1053,
    lon: 15.5894,
    stationId: 2088,
  },
];

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [station, setStation] = useState(null);
  console.log(station);

  const waterTemp = useWaterTemp(station);

  useEffect(() => {
    if (position) {
      const result = calcNearest(stations, position);
      setStation(result.id);
    }
  }, [position]);

  const weatherData = useCoordinates(position);

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
        {waterTemp.data && (
          <p>
            {waterTemp.data.parameter.name} {waterTemp.data.parameter.key}
            {waterTemp.data.parameter.unit}
          </p>
        )}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
