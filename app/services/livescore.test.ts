import { getLiveScore } from "~/services/livescore";
import type { GameWithPlayer } from "~/routes/components/GameCard";

it('should return player1 as the winner', () => {
  const score = getLiveScore(someGames());
  expect(score[0]).toBe({
    player: {
      id: 1,
      name: "player1"
    },
    wins: 1,
    totalPointsWon: 21,
    totalPointsLost: 4
  });
})

function someGames(): GameWithPlayer[] {
  return [
    {
      id: 1,
      tournamentId: "1",
      player1Id: "player1",
      player2Id: "player2",
      scorePlayer1: 21,
      scorePlayer2: 4,
      player1: {
        id: "1",
        name: "player1"
      },
      player2: {
        id: "2",
        name: "player2"
      }
    },
    {
     id: 2,
     tournamentId: "1",
     player1Id: "player3",
     player2Id: "player4",
      scorePlayer1: 21,
      scorePlayer2: 19,
      player1: {
       id: "3",
       name: "player3"
      },
      player2: {
       id: "4",
       name: "player4"
      }
    }
  ]
}
