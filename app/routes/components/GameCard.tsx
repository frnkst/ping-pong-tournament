import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import UpdateScore from "~/routes/components/UpdateScore";
import React from "react";
import type { Game, Player } from "@prisma/client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export type GameWithPlayer = Game & { player1: Player, player2: Player }

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
        <Typography align="center">
          {game.player1.name} - {game.player2.name}
        </Typography>
        <Typography align="center">
          {game.scorePlayer1.toString()}
          :
          {game.scorePlayer2.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <UpdateScore game={game}></UpdateScore>
      </CardActions>
    </Card>
  </Grid>);
}
