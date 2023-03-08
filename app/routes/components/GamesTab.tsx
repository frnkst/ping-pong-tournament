import type { GameWithPlayer } from "~/routes/components/GameCard";
import GameCard from "~/routes/components/GameCard";
import React from "react";
import { Grid } from "@mui/material";

export default function GamesTab({games}: {games: GameWithPlayer[] | undefined }) {
  return (
    <>
      <br />
      <br />
      <Grid container spacing={2}>
        { games?.map(game => (
          <GameCard key={game.id.toString()} game={game}></GameCard>))}
      </Grid>
    </>
  )
}
