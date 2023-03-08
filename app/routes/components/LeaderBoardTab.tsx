import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { GameWithPlayer } from "~/routes/components/GameCard";
import { getLiveScore } from "~/services/livescore";

export default function LeaderBoardTab({ games }: { games: GameWithPlayer[] | undefined }) {
  if (!games) {
    return <></>;
  }
  const liveScore = getLiveScore(games);

  return (<>
      <br />
      <h1>Leaderboard</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Wins</TableCell>
              <TableCell align="right">Points Won</TableCell>
              <TableCell align="right">Points Lost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {liveScore.map((liveScore, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{liveScore.player.name}</TableCell>
                <TableCell align="right">{liveScore.wins}</TableCell>
                <TableCell align="right">{liveScore.totalPointsWon}</TableCell>
                <TableCell align="right">{liveScore.totalPointsLost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>;
    </>
  )
    ;
}
