import axios from "axios";

//axios.defaults.baseURL = 'api.openweathermap.org/'

const apiKey = "cb61efeb4972c2a180bb7178dfc31903";
const url = `api.openweathermap.org/data/2.5/weather?q=ystad&appid=${apiKey}&units=metric`;

const get = async (endpoint) => {
  const result = await axios.get(endpoint);
  return result;
};

// harcoded with kåseberga for now
export const getLocationWeatherData = async () => {
  const result = await get(
    "http://api.openweathermap.org/data/2.5/weather?lat=55.3870958&lon=14.0656814&appid=cb61efeb4972c2a180bb7178dfc31903"
  );
  console.log(result.data);
};

export const getSeaTemperature = async () => {};
