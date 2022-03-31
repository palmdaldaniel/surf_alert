import { useQuery } from "react-query";
import { getLocationWeatherData } from "../services/OPEN_WEATHER_API";
const useLocationWeather = (coordinates = null) => {
  const weatherData = useQuery(["favorites", "weather", coordinates], () =>
    getLocationWeatherData(coordinates)
  );

  return weatherData;
};

export default useLocationWeather;
