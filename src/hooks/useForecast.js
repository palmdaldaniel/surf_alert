import { useQuery } from "react-query";
import { getForecast } from "../services/OPEN_WEATHER_API";
const useForecast = (coordinates) => {
  const weatherData = useQuery(["forecast", coordinates], () =>
    getForecast(coordinates)
  );

  return weatherData;
};

export default useForecast;
