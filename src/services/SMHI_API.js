import axios from "axios";

const get = async (endpoint) => {
  const result = await axios.get(endpoint);
  return result;
};

export const getWaterTemp = async (stationId) => {
  const result = await get(
    `https://opendata-download-ocobs.smhi.se/api/version/latest/parameter/5/station/${stationId}/period/latest-hour/data.json`
  );

  return result.data;
};
