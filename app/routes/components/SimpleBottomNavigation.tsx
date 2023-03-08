import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Leaderboard, QueryStats, SportsTennis } from "@mui/icons-material";

export function SimpleBottomNavigation({ onSelection }: { onSelection: (value: string) => void }) {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          onSelection(newValue);
        }}
      >
        <BottomNavigationAction label="Games" icon={<SportsTennis />} />
        <BottomNavigationAction label="Leaderboard" icon={<Leaderboard />} />
        <BottomNavigationAction label="Stats" icon={<QueryStats />} />
      </BottomNavigation>
    </Paper>
  );
}
