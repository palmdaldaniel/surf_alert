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
  const [coordUrl, setCoordUrl] = useState(parseToUrl(currentPosition));

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

    const styles = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px",
      height: "10px",
      width: "10px",
      transform: `rotate(${180 + geo.wind.deg}deg)`,
    };

    content = (
      <>
        <p>{geo.name}</p>
        <p>Wind speed: {geo.wind.speed} m/s</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Wind direction:
          <div style={styles}>
            <span>&#5169;</span>
          </div>
        </div>
        <p>
          {water.parameter.name} {water.parameter.key}
          {water.parameter.unit}
        </p>
        {coordUrl && (
          <Link component={RouterLink} to={`${coordUrl.lng}/${coordUrl.lat}`}>
            Find out more
          </Link>
        )}
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
        {weatherData.data &&
          temp.data &&
          showWeatherData(weatherData.data, temp.data)}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
