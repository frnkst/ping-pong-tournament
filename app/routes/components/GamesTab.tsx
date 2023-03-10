import type { GameWithPlayer } from "~/routes/components/GameCard";
import GameCard from "~/routes/components/GameCard";
import React from "react";
import { Grid } from "@mui/material";
import type { User } from "~/models/user.server";

export default function GamesTab({games, user}: {games: GameWithPlayer[] | undefined, user: User | undefined }) {
  return (
    <>
      <br />
      <h1>Games</h1>
      <Grid container spacing={2}>
        { games?.map(game => (
          <GameCard key={game.id.toString()} game={game} user={user}></GameCard>))}
      </Grid>
    </>
  )
}
