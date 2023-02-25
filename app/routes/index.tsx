import Games from "~/components/games";
import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Game } from "@prisma/client";

export async function loader() {
  const games = await prisma.game.findMany({ include: { player1: true, player2: true } });
  return json({ games });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Games games={data.games}></Games>
    </>
  );
}
