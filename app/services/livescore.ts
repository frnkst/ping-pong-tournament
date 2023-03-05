import { find } from "lodash";
import type { GameWithPlayer } from "~/routes/components/GameCard";

export type LiveScore = {
  player: {
    id: string,
    name: string
  },
  wins: number,
  totalPointsWon: number,
  totalPointsLost: number
}

function getWinner(game: GameWithPlayer): LiveScore {
  if (game.scorePlayer1 > game.scorePlayer2) {
    return {
      player: game.player1,
      wins: 1,
      totalPointsWon: game.scorePlayer1,
      totalPointsLost: game.scorePlayer2
    }
  } else {
    return {
      player: game.player2,
      wins: 1,
      totalPointsWon: game.scorePlayer2,
      totalPointsLost: game.scorePlayer1
    }
  }
}

export function getLiveScore(games: GameWithPlayer[]): LiveScore[] {
  const liveScore: LiveScore[] = [];
  for (const game of games) {
   const winner = getWinner(game);
  }

   return liveScore;
 }




