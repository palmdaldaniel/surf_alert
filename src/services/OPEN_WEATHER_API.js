import { API_SERVICE } from "./API_SERVICE";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

const api = API_SERVICE("https://api.openweathermap.org");

export const getLocationWeatherData = async (coordinates = null) => {
  if (!coordinates) return;

  const { lat, lng } = coordinates;

  const { data } = await api.get(
    `/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
  );

  return data;
};

export const getCoordinates = async (location) => {
  if (!location) return;

  const { data } = await api.get(
    `/geo/1.0/direct?q=${location},SE&limit=1&appid=${apiKey}`
  );

  return data[0];
};
