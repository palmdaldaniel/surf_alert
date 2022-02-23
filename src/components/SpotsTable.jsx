import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
function createData(location, area, wind, direction, temp) {
  return { location, area, wind, direction, temp };
}

const rows = [
  createData("Kåseberga", "Scania", "10ms", "sw", 3),
  createData("Torö", "Stockholm", "5ms", "ne", 10),
  createData("Apelviken", "Göteborg", "15ms", "n", 4),
  createData("Mölle", "Kullaberg", "2ms", "s", 8),
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
          {rows.map((row) => (
            <TableRow
              key={row.location}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link component={RouterLink} to="/to-specific-spot">
                  {row.location}
                </Link>
              </TableCell>
              <TableCell align="right">{row.area}</TableCell>
              <TableCell align="right">{row.wind}</TableCell>
              <TableCell align="right">{row.direction}</TableCell>
              <TableCell align="right">{row.temp}&#176;C</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
