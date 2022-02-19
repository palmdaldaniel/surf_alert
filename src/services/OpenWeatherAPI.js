import axios from "axios";

axios.defaults.baseURL = "http://api.openweathermap.org";

const apiKey = "cb61efeb4972c2a180bb7178dfc31903";

const get = async (endpoint) => {
  const result = await axios.get(endpoint);
  return result;
};

// harcoded with kåseberga for now
export const getLocationWeatherData = async (coordinates = null) => {
  if (!coordinates) return;

  const { lat, lon } = coordinates;

  const result = await get(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  return result;
};

export const getCoordinates = async (location) => {
  if (!location) return;

  const result = await get(
    `/geo/1.0/direct?q=${location},SE&limit=1&appid=${apiKey}`
  );

  return result.data[0];
};

export const getSeaTemperature = async () => {};
