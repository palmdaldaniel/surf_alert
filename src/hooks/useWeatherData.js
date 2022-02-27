import { useQuery } from "react-query";
import { getLocationWeatherData } from "../services/OpenWeatherAPI";
const useLocationWeather = (coordinates = null) => {
  const weatherData = useQuery(["favorites", "weather", coordinates], () =>
    getLocationWeatherData(coordinates)
  );

  return weatherData;
};

export default useLocationWeather;
