import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const tournaments = await prisma.tournament.findMany();
  return json({ tournaments })
}
export default function AllPlayers() {
  const data = useLoaderData<typeof loader>();

  return <div>
    show all players
    { data.tournaments.map(t => (<div key={t.id}>{ t.name}</div>)) }
  </div>
}
