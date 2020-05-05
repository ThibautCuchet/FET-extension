import React from "react";

import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";

import "./Classement.css";

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
  }))(TableRow);

function Classement(props) {
  const { data, theme } = props;
  return (
    <div className="root">
      <TableContainer style={{borderRadius: 5}}>
        <Table aria-label="classement">
          <TableHead>
            <TableRow>
              <StyledTableCell>Catégorie</StyledTableCell>
              <StyledTableCell align="right">Position</StyledTableCell>
              <StyledTableCell align="right">Points</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>Général</StyledTableCell>
              <StyledTableCell align="right">{data.general}</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Distance</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{data.distance} km</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Profit</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{data.profit}€</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Expérience</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{data.experience} xp</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Masse</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{data.masse} kg</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Infraction</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{data.infraction}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Montant infraction</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{data.MontantInfraction}€</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Classement;
