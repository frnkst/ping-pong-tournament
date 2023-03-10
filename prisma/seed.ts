import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

invariant(process.env.ADMIN_PASSWORD, "You must set ADMIN_PASSWORD in .env file");

async function seed() {
  const email = "frankyfresh@remix.com";

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
          hash: hashedPassword
        }
      }
    }
  });


  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id
    }
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id
    }
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
