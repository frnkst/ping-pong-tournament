import { prisma } from "~/db.server";
import type { ActionArgs} from "@remix-run/node";
import { json  } from "@remix-run/node";
import { Form, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import {
  BottomNavigation,
  BottomNavigationAction, Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  Modal,
  Grid,
  Typography,
  Paper
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Game } from ".prisma/client";
import type { Player } from "@prisma/client";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

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

function EditModal({ game }: { game: Game & { player1: Player, player2: Player } }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (event: any) => {
    submit(event.currentTarget, { replace: true });
    setOpen(false);
  };
  const submit = useSubmit();

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Form method="post">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Edit score
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {game.player1.name}: <Input name="scorePlayer1"
                                          placeholder={game.scorePlayer1.toString()}></Input>
              <br />
              {game.player2.name}: <Input name="scorePlayer2"
                                          placeholder={game.scorePlayer2.toString()}></Input>
              <Input type="hidden" name="gameId" value={game.id}></Input>
            </Typography>
            <Button onClick={handleClose}>Submit</Button>
          </Box>
        </Form>
      </Modal>
    </div>
  );
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
            <EditModal game={game}></EditModal>
          </CardActions>
        </Card>
        </Grid>
      ))}
      </Grid>
      </div>
    </>)
}
