import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

invariant(process.env.ADMIN_PASSWORD, "You must set ADMIN_PASSWORD in .env file");

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });
  const adminPassword = process.env.ADMIN_PASSWORD as string;
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const tournament = await prisma.tournament.create({
    data: {
      name: "All Stars Tournament",
      date: new Date()
    }
  })

  const player1 = await prisma.player.create({ data: {
      name: "Frank",
      avatar: "test"
    }})

  const player2 = await prisma.player.create({ data: {
    name: "Yves",
      avatar: "test"
    }})

  await prisma.game.create({
    data: {
      tournamentId: tournament.id,
      player1Id: player1.id,
      player2Id: player2.id,
      scorePlayer1: 21,
      scorePlayer2: 14
    }
    }
  );

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
