import { API_SERVICE } from "./API_SERVICE";
import { stationIds } from "../helpers/stations";

const api = API_SERVICE("https://opendata-download-ocobs.smhi.se/api/");

export const getWaterTemp = async (stationId = null) => {
  if (!stationId) return;

  const { data } = await api.get(
    `version/latest/parameter/5/station/${stationId}/period/latest-day/data.json`
  );

  const tempValue = data.value[0].value;
  const tempUnit = data.parameter.unit;
  return { tempValue, tempUnit };
};

export const getAllStations = async () => {
  const result = await api.get("version/1.0/parameter/5.json");

  const { station } = result.data;

  const formattedStations = station
    .filter((item) => {
      if (stationIds.find((stationId) => stationId === item.id)) {
        return item;
      }
    })
    .map((item) => {
      return {
        name: item.name,
        lat: item.latitude,
        lon: item.longitude,
        stationId: item.id,
      };
    });

  return formattedStations;
};
