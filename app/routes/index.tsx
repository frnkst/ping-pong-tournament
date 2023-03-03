import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";

export async function loader() {
  const tournaments = await prisma.tournament.findMany();
  return json({ tournaments });
}

export  function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <>
      <SimpleBottomNavigation></SimpleBottomNavigation>
      {data.tournaments.map(tournament => (
        <Card sx={{ maxWidth: 345 }} key={tournament.id}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {tournament.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
              <Button size="small" onClick={() => navigate(`/tournaments/${tournament.name}`)}>Show games</Button>
          </CardActions>
        </Card>
      ))}
    </>)
}
