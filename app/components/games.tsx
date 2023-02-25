import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const games = await prisma.game.findMany();
  return json({ games });
}

export default function Games() {
  const data = useLoaderData<typeof loader>();

  return (<>
    { data.games.map(g => (<>g.player1</>)) }
  </>)
}
