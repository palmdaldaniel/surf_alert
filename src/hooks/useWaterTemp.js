import { useQuery } from "react-query";
import { getWaterTemp } from "../services/SMHI_API";

const useLocationWeather = (stationId) => {
  const waterTemp = useQuery(["watertemp", stationId], () =>
    getWaterTemp(stationId)
  );

  return waterTemp;
};

export default useLocationWeather;
