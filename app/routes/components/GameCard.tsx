import { Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import UpdateScore from "~/routes/components/UpdateScore";
import React from "react";
import type { Game, Player } from "@prisma/client";

export type GameWithPlayer = Game & {player1: Player, player2: Player}

export default function GameCard({ game }: { game: GameWithPlayer }) {
  return (<Grid item xs={6}>
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Game: {game.id}
        </Typography>
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
