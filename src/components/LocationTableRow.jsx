import React from "react";

import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import { getWindDirection } from "../helpers/CalcWindDir.js";

import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import useWeatherData from "../hooks/useWeatherData.js";
import useWaterTemp from "../hooks/useWaterTemp";

const LocationTableRow = ({ spot }) => {
  const { lon, lat, name, area, waterTempStation } = spot;

  const weather = useWeatherData({ lon, lat });

  const waterTemp = useWaterTemp(waterTempStation);

  return (
    <TableRow
      key={spot.location}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Link component={RouterLink} to={`${lon}/${lat}`}>
          {name}
        </Link>
      </TableCell>
      <TableCell align="right">{area}</TableCell>
      <TableCell align="right">{weather?.data?.wind.speed} m/s</TableCell>
      <TableCell align="right">
        {getWindDirection(weather?.data?.wind.deg)}
      </TableCell>
      {waterTemp.data ? (
        <TableCell align="right">
          {waterTemp?.data?.value[0]?.value}&#176;C
        </TableCell>
      ) : (
        <TableCell align="right">No data</TableCell>
      )}
    </TableRow>
  );
};

export default LocationTableRow;
