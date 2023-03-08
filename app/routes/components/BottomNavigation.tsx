import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
