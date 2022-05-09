import { useQuery } from "react-query";
import { getWaterTemp } from "../services/SMHI_API";

const useWaterTemp = (stationId = null) => {
  const temp = useQuery(["watertemp", stationId], () =>
    getWaterTemp(stationId)
  );

  return temp;
};

export default useWaterTemp;
