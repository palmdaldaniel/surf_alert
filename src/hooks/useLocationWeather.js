import { useQuery } from "react-query";
import {
  getLocationWeatherData,
  getCoordinates,
} from "../services/OPEN_WEATHER_API";
const useLocationWeather = (location = null) => {
  const coordinates = useQuery(["location", location], () =>
    getCoordinates(location)
  );

  const weatherData = useQuery(
    ["location", coordinates.data],
    () => getLocationWeatherData(coordinates.data),
    {
      enabled: !!coordinates.data,
    }
  );

  return { coordinates, weatherData };
};

export default useLocationWeather;
