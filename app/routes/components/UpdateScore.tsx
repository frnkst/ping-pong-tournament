import type { Game } from ".prisma/client";
import type { Player } from "@prisma/client";
import React, { useState } from "react";
import { Form, useSubmit } from "@remix-run/react";
import { Box, Button, Input, Modal, TextField, Typography } from "@mui/material";

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
  const handleCancel = () => setOpen(false);
  const handleSave = (event: any) => {
    submit(event.currentTarget, { replace: true });
    setOpen(false);
  };
  const submit = useSubmit();

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleSave}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Form method="post">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit score
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField name="scorePlayer1" variant="outlined" label={game.player1.name}
                                          placeholder={game.scorePlayer1.toString()}></TextField>
              <br />
              <br />
              <TextField name="scorePlayer2" variant="outlined" label={game.player2.name}
                                              placeholder={game.scorePlayer2.toString()}></TextField>
              <Input type="hidden" name="gameId" value={game.id}></Input>
            </Typography>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "space-between"}}>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={handleSave}>
                Save
              </Button>
            </div>
          </Box>
        </Form>
      </Modal>
    </div>
  );
}
