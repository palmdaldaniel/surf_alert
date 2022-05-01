import WetherList from "./WetherList";

import { stations } from "../../helpers/stations";
import { useEffect, useState } from "react";
import { calcNearest } from "../../helpers/CalcDistance";

export default function BasicTable({ weatherData, locationData }) {
  const { coord } = weatherData;

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
    <WetherList
      weatherData={weatherData}
      locationName={locationData ? locationData[0].locationName : undefined}
      stationId={station}
    />
  );
}
