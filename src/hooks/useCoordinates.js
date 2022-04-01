import { useQuery } from "react-query";
import { getLocationWeatherData } from "../services/OPEN_WEATHER_API";
const useCordinates = (coordinates) => {
  const weatherData = useQuery(["coordinates", coordinates], () =>
    getLocationWeatherData(coordinates)
  );

  return weatherData;
};

export default useCordinates;
