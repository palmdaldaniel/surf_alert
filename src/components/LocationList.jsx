import { getWindDirection } from "../helpers/CalcWindDir";

const LocationList = ({ data }) => {
  return (
    <ul>
      {data && (
        <li>
          {data.name} | {data.weather[0].description} |{" "}
          {getWindDirection(data.wind.deg)} | {data.wind.speed} m/s
        </li>
      )}
    </ul>
  );
};

export default LocationList;
