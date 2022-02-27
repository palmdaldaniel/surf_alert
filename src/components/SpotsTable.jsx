import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SpotTableRow from "./SpotTableRow.jsx";

const favorites = [
  {
    name: "kåseberga",
    area: "scania",
    lon: 14.0657,
    lat: 55.3871,
    waterTempStation: 2088,
  },
  {
    name: "mölle",
    area: "scania",
    lon: 12.4983,
    lat: 56.2827,
    waterTempStation: 33084,
  },
  {
    name: "torö",
    area: "uppland",
    lon: 17.8414,
    lat: 58.8246,
    waterTempStation: 2507,
  },
  {
    name: "varberg",
    area: "västra götaland",
    lon: 12.2503,
    lat: 57.1057,
    waterTempStation: 33084,
  },
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="right">Area</TableCell>
            <TableCell align="right">Wind</TableCell>
            <TableCell align="right">Direction</TableCell>
            <TableCell align="right">Water temp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((favorite, i) => {
            return <SpotTableRow spot={favorite} key={i} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
