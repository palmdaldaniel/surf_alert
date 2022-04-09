import Container from "@mui/material/Container";

import Aside from "./Aside";

import { stations } from "../helpers/stations";
import { useEffect, useState } from "react";
import { calcNearest } from "../helpers/CalcDistance";

//import { favorites } from "../helpers/favoritesData";

/** properties
 * name
 * sys { sunrise, sunset, country}
 * visibilitiy
 * weather[0] {description, icon, main}
 * wind {speed, deg, gust}
 * main { temp, feels_like}
 */

const tableHead = [
  { name: "Location", position: "center" },
  { name: "Sunrise", position: "center" },
  { name: "Sunset", position: "center" },
  { name: "Wind Speed", position: "center" },
  { name: "Wind Direction", position: "center" },
  { name: "Water Temp", position: "center" },
  { name: "Temperature", position: "center" },
];

export default function BasicTable({ weatherData, locationData }) {
  const { coord } = weatherData;

  console.log(locationData);
  const [station, setStation] = useState(null);

  useEffect(() => {
    const { lat, lon: lng } = coord;
    const position = {
      lat,
      lng,
    };

    const result = calcNearest(stations, position);

    setStation(result.id);
  }, []);

  return (
    <Container
      sx={{
        marginTop: "20px",
      }}
    >
      <Aside
        weatherData={weatherData}
        locationName={locationData ? locationData[0].locationName : undefined}
        stationId={station}
      />
    </Container>
  );
}
