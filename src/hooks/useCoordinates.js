import { useQuery } from "react-query";
import { getLocationWeatherData } from "../services/OPEN_WEATHER_API";
const useCordinates = (coordinates = null) => {
  const weatherData = useQuery(["coordinates", coordinates], () =>
    getLocationWeatherData(coordinates)
  );

  return weatherData;
};

export default useCordinates;
