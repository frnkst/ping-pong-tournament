import type { Game } from ".prisma/client";
import type { Player } from "@prisma/client";
import React, { useState } from "react";
import { Form, useSubmit } from "@remix-run/react";
import { Box, Button, Input, Modal, Typography } from "@mui/material";

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

export default function UpdateScore({ game }: { game: Game & { player1: Player, player2: Player } }) {
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
