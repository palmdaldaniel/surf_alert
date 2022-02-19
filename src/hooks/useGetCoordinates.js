import { useQuery } from "react-query";
import { getCoordinates } from "../services/OpenWeatherAPI";

const useGetCoordinates = (location) => {
  return useQuery(["location", location], () => getCoordinates(location));
};

export default useGetCoordinates;
