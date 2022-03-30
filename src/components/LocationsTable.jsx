import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LocationTableRow from "./LocationTableRow.jsx";
import { favorites } from "../helpers/favoritesData";

export default function BasicTable() {
  return (
    <TableContainer
      sx={{
        marginRight: "10px",
        flex: "1",
      }}
      component={Paper}
    >
      <Table size="medium" aria-label="simple table">
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
            return <LocationTableRow spot={favorite} key={i} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
