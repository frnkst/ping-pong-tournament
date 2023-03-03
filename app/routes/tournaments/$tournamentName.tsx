import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import {
  Box, Button,
  Card,
  CardActions,
  CardContent,
  CardMedia, Grid, Input,
  Modal,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import type { SyntheticEvent } from "react";
import React, { useState } from "react";
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

export async function loader({ params }: LoaderArgs) {
  const tournamentName = params.tournamentName;
  const tournament = await prisma.tournament.findFirst({
    where: { name: tournamentName },
    include: { games: { include: { player1: true, player2: true } } }
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
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

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Tournament() {
  const data = useLoaderData<typeof loader>();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Games" {...a11yProps(0)} />
          <Tab label="Live Scoreboard" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {data.tournament?.games.map(game => (
              <Card sx={{ maxWidth: 200, minWidth: 50 }} key={game.id.toString()}>
                <CardMedia
                  sx={{ height: 50 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {game.player1.name} vs {game.player2.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {game.scorePlayer1.toString()}
                    :
                    {game.scorePlayer2.toString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <EditModal game={game}></EditModal>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Grid>
  );
}

