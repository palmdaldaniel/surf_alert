import { useEffect } from "react";
import { useQuery } from "react-query";
import { getLocationWeatherData } from "../services/OpenWeatherAPI";
const useLocationWeather = () => {
  return useQuery("weather", getLocationWeatherData);
};

export default useLocationWeather;
