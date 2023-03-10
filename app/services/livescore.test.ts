import { getLiveScore } from "~/services/livescore";
import type { GameWithPlayer } from "~/routes/components/GameCard";

it('should return player1 as the winner', () => {
  const score = getLiveScore(someGames());
  expect(score[0]).toEqual({
    player: {
      id: "1",
      name: "player1"
    },
    wins: 2,
    totalPointsWon: 42,
    totalPointsLost: 4
  });
});

it('should return player3 as the second', () => {
  const score = getLiveScore(someGames());
  expect(score[1]).toEqual({
    player: {
      id: "3",
      name: "player3"
    },
    wins: 1,
    totalPointsWon: 21,
    totalPointsLost: 19
  });
})

it('should return player4 as the third', () => {
  const score = getLiveScore(someGames());
  expect(score[2]).toEqual({
    player: {
      id: "4",
      name: "player4"
    },
    wins: 0,
    totalPointsWon: 19,
    totalPointsLost: 42
  });
})

it('should return player2 as last', () => {
  const score = getLiveScore(someGames());
  expect(score[3]).toEqual({
    player: {
      id: "2",
      name: "player2"
    },
    wins: 0,
    totalPointsWon: 4,
    totalPointsLost: 21
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
     player1Id: "player4",
     player2Id: "player3",
      scorePlayer1: 19,
      scorePlayer2: 21,
      player1: {
       id: "4",
       name: "player4"
      },
      player2: {
       id: "3",
       name: "player3"
      }
    },
    {
      id: 3,
      tournamentId: "1",
      player1Id: "player1",
      player2Id: "player4",
      scorePlayer1: 21,
      scorePlayer2: 0,
      player1: {
        id: "1",
        name: "player1"
      },
      player2: {
        id: "4",
        name: "player4"
      }
    },
  ]
}
