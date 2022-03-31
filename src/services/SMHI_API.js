import { API_SERVICE } from "./API_SERVICE";

const api = API_SERVICE("https://opendata-download-ocobs.smhi.se/api/");

export const getWaterTemp = async (stationId = null) => {
  if (!stationId) return;

  const { data } = await api.get(
    `version/latest/parameter/5/station/${stationId}/period/latest-hour/data.json`
  );

  return data;
};
