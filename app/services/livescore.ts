import type { GameWithPlayer } from "~/routes/components/GameCard";
import { find, indexOf, orderBy, sortBy } from "lodash";

export type LiveScore = {
  player: {
    id: string,
    name: string
  },
  wins: number,
  totalPointsWon: number,
  totalPointsLost: number
}

function getNewScores(game: GameWithPlayer): LiveScore[] {
  if (game.scorePlayer1 === 0 && game.scorePlayer2 === 0) {
    return [];
  }

  const player1IsWinner = game.scorePlayer1 > game.scorePlayer2;
  return [
    {
      player: game.player1,
      wins: player1IsWinner ? 1 : -1,
      totalPointsWon: game.scorePlayer1,
      totalPointsLost: game.scorePlayer2
    },
    {
      player: game.player2,
      wins: player1IsWinner ? -1 : 1,
      totalPointsWon: game.scorePlayer2,
      totalPointsLost: game.scorePlayer1
    }
  ];
}

function updateLiveScore(liveScore: LiveScore[], newScores: LiveScore[]) {
  for (const score of newScores) {
    let existingPlayer = find(liveScore, (liveScore) => liveScore.player.id === score.player.id);
    if (existingPlayer) {
      const updatedScore = {
        ...existingPlayer,
        wins: existingPlayer.wins + score.wins,
        totalPointsWon: existingPlayer.totalPointsWon + score.totalPointsWon,
        totalPointsLost: existingPlayer.totalPointsLost + score.totalPointsLost
      };
      updatedScore.wins = updatedScore.wins < 0 ? 0 : updatedScore.wins;
      const index = indexOf(liveScore, find(liveScore, (liveScore) => liveScore.player.id === score.player.id));
      liveScore.splice(index, 1, updatedScore);
    } else {
      score.wins = score.wins < 0 ? 0 : score.wins;
      liveScore.push(score);
    }
  }
}

export function getLiveScore(games: GameWithPlayer[]): LiveScore[] {
  const liveScore: LiveScore[] = [];
  for (const game of games) {
    const newScores = getNewScores(game);
    updateLiveScore(liveScore, newScores);
  }

  return orderBy(liveScore, ["wins", "totalPointsWon", "totalPointsLost"], ['asc', 'asc', 'desc']).reverse();
}




