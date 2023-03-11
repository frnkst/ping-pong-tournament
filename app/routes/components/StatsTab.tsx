import * as React from "react";
import type { GameWithPlayer } from "~/routes/components/GameCard";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { getLiveScore } from "~/services/livescore";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} style={{ border: '1px solid black', height: 20, borderRadius: 8}} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function StatsTab({ games }: { games: GameWithPlayer[] | undefined }) {
  if (!games) {
    return <></>;
  }

  const liveScore = getLiveScore(games).map(f => ({...f, shortname: f.player.name.substring(0, 3)} ));
  const gamesCompleted = games.filter(game => game.scorePlayer1 !== 0 || game.scorePlayer2 !== 0).length
  const totalGames = games.length

  return (<>
      <br />
      <h1>Stats</h1>

      <h2>Games Completed</h2>
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={100 / totalGames * gamesCompleted} />
      </Box>

      <h2>Points Won/Points Lost</h2>
      <div style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={liveScore}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="shortname" />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalPointsWon" fill="#8884d8" />
            <Bar dataKey="totalPointsLost" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
