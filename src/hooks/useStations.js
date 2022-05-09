import { getAllStations } from "../services/SMHI_API";
import { useQuery } from "react-query";
const useStations = () => {
  const stations = useQuery("stations", getAllStations);

  return stations;
};

export default useStations;
