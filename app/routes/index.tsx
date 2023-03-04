import { prisma } from "~/db.server";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ButtonAppBar from "~/routes/components/ButtonAppBar";
import UpdateScore from "~/routes/components/UpdateScore";

export async function loader() {
  const tournament = await prisma.tournament.findFirst({
    where: { name: 'All Stars Tournament' },
    include: { games: { include: { player1: true, player2: true }, orderBy:  {id: 'asc'}} }
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

export  function SimpleBottomNavigation({onSelection}: { onSelection: (value: string) => void}) {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
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

export default function Index() {
  //const data = useLoaderData<typeof loader>();
  const [selectedTab, setSelectedTab ]= useState(0);
  const handleSelection = (selection: any) => {
    setSelectedTab(selection);
  };

  const loaderData = useLoaderData<typeof loader>();
  const [data, setData] = useState(loaderData);

  // Whenever the loader gives us new data
  // (for example, after a form submission),
  // update our `data` state.
  useEffect(() => setData(loaderData), [loaderData]);

  const fetcher = useFetcher();

  // Get fresh data every 30 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("frank");
        fetcher.load("/");
    }, 3 * 1000);

    return () => clearInterval(interval);
  }, )

  // When the fetcher comes back with new data,
  // update our `data` state.
  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
    }
  }, [fetcher.data]);

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <SimpleBottomNavigation onSelection={handleSelection}></SimpleBottomNavigation>
      <div style={classes.root}>
      <Grid container spacing={2}>
      { selectedTab === 0 && data.tournament?.games.map(game => (
        <Grid key={game.id.toString()} item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Game: { game.id}
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
        </Grid>
      ))}
      </Grid>
      </div>
    </>)
}
