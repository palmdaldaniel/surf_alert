import React, { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { useMapEvent, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import useCoordinates from "../hooks/useCoordinates";
import { getWindDirection } from "../helpers/CalcWindDir";
import { calcNearest } from "../helpers/CalcDistance";
import useWaterTemp from "../hooks/useWaterTemp";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
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

const LocationMarker = ({ currentPosition }) => {
  const [position, setPosition] = useState(currentPosition);
  const [station, setStation] = useState(null);

  const temp = useWaterTemp(station);

  useEffect(() => {
    if (position) {
      const result = calcNearest(stations, position);
      setStation(result.id);
    }
  }, [position]);

  const weatherData = useCoordinates(position);
  console.log(weatherData?.data?.sys.country);

  const map = useMapEvent({
    click(e) {
      setPosition(e.latlng);
    },
  });

  const showWeatherData = (geo, water) => {
    let content;

    content = (
      <>
        <p>{geo.name}</p>
        <p>Wind speed: {geo.wind.speed} m/s</p>
        <p>Wind direction: {getWindDirection(geo.wind.deg)}</p>
        <p>
          {water.parameter.name} {water.parameter.key}
          {water.parameter.unit}
        </p>
        <Link component={RouterLink} to={`${position.lng}/${position.lat}`}>
          Find out more
        </Link>
        ;
      </>
    );

    return content;
  };

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
        {(weatherData.isLoading || temp.isLoading) && <p>Loading data</p>}
        {weatherData?.data?.sys.country !== "SE" ? (
          <p>This service is only available in sweden</p>
        ) : (
          showWeatherData(weatherData.data, temp.data)
        )}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
