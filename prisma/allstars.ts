import { PrismaClient } from "@prisma/client";
import { shuffle } from 'lodash';
const prisma = new PrismaClient();

async function seed() {
  const tournament = await prisma.tournament.create({
    data: {
      name: "All Stars Tournament",
      description: "The first all stars tournament held in LAA featuring all the famous players.",
      image: "allstars",
      date: new Date()
    }
  });

  const players = ["Frank", "Yves", "Stibzn", "Dän", "Kuri", "Trevi"];
  for (const player of players) {
    await prisma.player.create({
      data: {
        name: player
      }
    });
  }

  const allPlayers = await prisma.player.findMany();
  const allGames = allPlayers.flatMap(
    (v, i) => allPlayers.slice(i+1).map( w => [v,w])
  );

  console.log(allGames);
  for (const game of shuffle(allGames)) {
    await prisma.game.create({
        data: {
          tournamentId: tournament.id,
          player1Id: game[0].id,
          player2Id: game[1].id,
          scorePlayer1: 0,
          scorePlayer2: 0
        }
      }
    );
  }
}

seed()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async () => {
  await prisma.$disconnect();
});
