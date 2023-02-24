import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const players = await prisma.player.findMany();
  return json({ players })
}
export default function AllPlayers() {
  const data = useLoaderData<typeof loader>();

  return <div>
    show all players
    { data.players.map(player => (<div key={player.id}>{ player.name}</div>)) }
  </div>
}
