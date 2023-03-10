import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import UpdateScore from "~/routes/components/UpdateScore";
import React from "react";
import type { Game, Player } from "@prisma/client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export type GameWithPlayer = Game & { player1: Player, player2: Player }

const container = {
  margin: "30px auto",
  display: "grid",
  gridTemplateColumns: "50px 10px 50px",
  columnGap: "5px",
  gridGap: "30",
  justifyContent: "center"
}
export default function GameCard({ game }: { game: GameWithPlayer }) {
  const gameCompleted = (game.scorePlayer1 >= 21 || game.scorePlayer2 >= 21);
  return (<Grid item xs={6}>
    <Card>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            Game: {game.id}
          </Typography>
          {gameCompleted && <><CheckCircleIcon style={{ color: "green" }}></CheckCircleIcon></>}
        </div>
        <br />
        <div style={container}>
          <div style={{ textAlign: "right"}}>{game.player1.name}</div>
          <div style={{ textAlign: "center"}}>-</div>
          <div>{game.player2.name}</div>
          <div style={{ textAlign: "right"}}>{game.scorePlayer1.toString()}</div>
          <div style={{ textAlign: "center"}}>:</div>
          <div>{game.scorePlayer2.toString()}</div>
        </div>
      </CardContent>
      <CardActions>
        <UpdateScore game={game}></UpdateScore>
      </CardActions>
    </Card>
  </Grid>);
}
