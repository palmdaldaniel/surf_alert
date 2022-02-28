import axios from "axios";

export const getWaterTemp = async (stationId) => {
  const result = await axios.get(
    `https://opendata-download-ocobs.smhi.se/api/version/latest/parameter/5/station/${stationId}/period/latest-hour/data.json`
  );

  return result.data;
};
