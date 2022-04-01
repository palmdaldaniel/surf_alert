import React, { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { useMapEvent, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import useCoordinates from "../hooks/useCoordinates";
import { getWindDirection, parseToUrl } from "../helpers";
import { calcNearest } from "../helpers/CalcDistance";
import useWaterTemp from "../hooks/useWaterTemp";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { stations } from "../helpers/stations";

const LocationMarker = ({ currentPosition }) => {
  const [position, setPosition] = useState(currentPosition);
  const [coordUrl, setCoordUrl] = useState(currentPosition);

  console.log(coordUrl);

  const [station, setStation] = useState(null);

  const temp = useWaterTemp(station);

  useEffect(() => {
    if (position) {
      const result = calcNearest(stations, position);
      setStation(result.id);
    }
  }, [position]);

  const weatherData = useCoordinates(position);

  useMapEvent({
    click(e) {
      setPosition(e.latlng);
      setCoordUrl(parseToUrl(e.latlng));
    },
  });

  const showWeatherData = (geo, water) => {
    let content;

    if (geo.sys.country !== "SE")
      return (content = <p>This service is only available in sweden</p>);

    content = (
      <>
        <p>{geo.name}</p>
        <p>Wind speed: {geo.wind.speed} m/s</p>
        <p>Wind direction: {getWindDirection(geo.wind.deg)}</p>
        <p>
          {water.parameter.name} {water.parameter.key}
          {water.parameter.unit}
        </p>
        <Link component={RouterLink} to={`${coordUrl.lng}/${coordUrl.lat}`}>
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
        {weatherData.data && showWeatherData(weatherData.data, temp.data)}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
