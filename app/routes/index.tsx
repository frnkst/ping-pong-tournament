import { prisma } from "~/db.server";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ButtonAppBar from "~/routes/components/ButtonAppBar";
import GameCard from "./components/GameCard";
import { Scoreboard } from "@mui/icons-material";
import ScoreBoardTab from "~/routes/components/ScoreBoardTab";

export async function loader() {
  const tournament = await prisma.tournament.findFirst({
    where: { name: "All Stars Tournament" },
    include: { games: { include: { player1: true, player2: true }, orderBy: { id: "asc" } } }
  });
  return json({ tournament });
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  // Use zod to validate data
  const scorePlayer1 = parseInt(form.get("scorePlayer1") as string);
  const scorePlayer2 = parseInt(form.get("scorePlayer2") as string);
  const gameId = parseInt(form.get("gameId") as string);

  try {
    await prisma.game.update({ where: { id: gameId }, data: { scorePlayer1, scorePlayer2 } });
    return null;
  } catch (error) {
    return null;
  }
}

export function SimpleBottomNavigation({ onSelection }: { onSelection: (value: string) => void }) {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          onSelection(newValue);
        }}
      >
        <BottomNavigationAction label="Games" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Scoreboard" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Stats" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

const classes = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20,
    textAlign: "center",
    backgroundColor: "black",
    color: "white"
  }
};

interface Options {
  enabled?: boolean;
  interval?: number;
}

export default function Index() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelection = (selection: any) => {
    setSelectedTab(selection);
  };

  function useRevalidate() {
    // We get the navigate function from React Rotuer
    let navigate = useNavigate();
    // And return a function which will navigate to `.` (same URL) and replace it
    return useCallback(function revalidate() {
      navigate(".", { replace: true });
    }, [navigate]);
  }

  function useRevalidateOnInterval({ enabled = false, interval = 1000 }: Options) {
    let revalidate = useRevalidate();
    useEffect(function revalidateOnInterval() {
      if (!enabled) return;
      let intervalId = setInterval(revalidate, interval);
      return () => clearInterval(intervalId);
    }, [revalidate, enabled, interval]);
  }

  useRevalidateOnInterval({ enabled: true, interval: 10000 });
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <SimpleBottomNavigation onSelection={handleSelection}></SimpleBottomNavigation>
      <div style={classes.root}>
        <Grid container spacing={2}>
          {selectedTab === 0 && data.tournament?.games.map(game => (
            <GameCard key={game.id.toString()} game={game}></GameCard>))}
          {selectedTab === 1 && (
            <ScoreBoardTab></ScoreBoardTab>)}
        </Grid>
      </div>
    </>);
}
