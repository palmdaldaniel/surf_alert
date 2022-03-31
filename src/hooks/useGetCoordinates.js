import { useQuery } from "react-query";
import { getCoordinates } from "../services/OPEN_WEATHER_API";

const useGetCoordinates = (location) => {
  return useQuery(["location", location], () => getCoordinates(location));
};

export default useGetCoordinates;
