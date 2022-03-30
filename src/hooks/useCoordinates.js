import { useQuery } from "react-query";
import { getLocationWeatherData } from "../services/OpenWeatherAPI";
const useCordinates = (coordinates = null) => {
  const weatherData = useQuery(["coordinates", coordinates], () =>
    getLocationWeatherData(coordinates)
  );

  return weatherData;
};

export default useCordinates;
