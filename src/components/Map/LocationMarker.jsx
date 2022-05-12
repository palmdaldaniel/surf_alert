import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

//map
import { Icon } from "leaflet";
import { useMapEvent, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

// hooks
import useCoordinates from "../../hooks/useCoordinates";
import useWaterTemp from "../../hooks/useWaterTemp";

// helpers
import { parseToUrl } from "../../helpers";
import { calcNearest } from "../../helpers/CalcDistance";
//import { stations } from "../../helpers/stations";

// mui
import Link from "@mui/material/Link";

// components
import WindDirectionArrow from "../Utils/WindDirectionArrow";

const LocationMarker = ({ currentPosition, onLocationPage, stations }) => {
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

  const map = useMapEvent({
    click(e) {
      if (!onLocationPage) {
        setPosition(e.latlng);
        setCoordUrl(parseToUrl(e.latlng));
      } else {
        console.log("not on location");
      }
    },
  });

  const showWeatherData = (geo, water) => {
    const { tempValue, tempUnit } = water;
    let content;

    if (geo.sys.country !== "SE")
      return (content = <p>This service is only available in sweden</p>);

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
          <WindDirectionArrow degree={geo.wind.deg} />
        </div>
        <p>
          Sea temperature: {tempValue}
          {tempUnit}
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
        {weatherData.isError || (temp.isError && <p>No info available</p>)}
        {weatherData.data &&
          temp.data &&
          showWeatherData(weatherData.data, temp.data)}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
