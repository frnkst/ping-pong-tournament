import { prisma } from "~/db.server";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import React, { useCallback, useEffect, useState } from "react";
import ButtonAppBar from "~/routes/components/ButtonAppBar";
import LeaderBoardTab from "~/routes/components/LeaderBoardTab";
import { SimpleBottomNavigation } from "~/routes/components/SimpleBottomNavigation";
import GamesTab from "./components/GamesTab";
import StatsTab from "~/routes/components/StatsTab";
import { useOptionalUser } from "~/utils";
import { requireUser } from "~/session.server";

export async function loader() {
  const tournament = await prisma.tournament.findFirst({
    where: { name: "All Stars Tournament" },
    include: { games: { include: { player1: true, player2: true }, orderBy: { id: "asc" } } }
  });
  return json({ tournament });
}

export async function action({ request }: ActionArgs) {
  await requireUser(request);

  const form = await request.formData();

  // Use zod to validate data
  const scorePlayer1 = parseInt(form.get("scorePlayer1") as string);
  const scorePlayer2 = parseInt(form.get("scorePlayer2") as string);
  const gameId = parseInt(form.get("gameId") as string);

  try {
    await prisma.game.update({ where: { id: gameId }, data: { scorePlayer1, scorePlayer2 } });
    return null;
  } catch (error) {
    return null;
  }
}

const classes = {
  root: {
    flexGrow: 1
  },
  frank: {
    paddingTop: 30
  },
  paper: {
    padding: 20,
    textAlign: "center",
    backgroundColor: "black",
    color: "white"
  }
};

interface IntervallOptions {
  enabled?: boolean;
  interval?: number;
}

export default function Index() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelection = (selection: any) => {
    setSelectedTab(selection);
  };

  const user = useOptionalUser();

  function useRevalidate() {
    let navigate = useNavigate();
    return useCallback(function revalidate() {
      navigate(".", { replace: true, preventScrollReset: true });
    }, [navigate]);
  }

  function useRevalidateOnInterval({ enabled = false, interval = 1000 }: IntervallOptions) {
    let revalidate = useRevalidate();
    useEffect(function revalidateOnInterval() {
      if (!enabled) return;
      let intervalId = setInterval(revalidate, interval);
      return () => clearInterval(intervalId);
    }, [revalidate, enabled, interval]);
  }

  useRevalidateOnInterval({ enabled: true, interval: 10000 });
  const data = useLoaderData<typeof loader>();
  const games = data.tournament?.games;

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <SimpleBottomNavigation onSelection={handleSelection}></SimpleBottomNavigation>
      <div style={classes.root}>
        {selectedTab === 0 && (<GamesTab games={games} user={user}></GamesTab>)}
        {selectedTab === 1 && (<><LeaderBoardTab games={games}></LeaderBoardTab></>)}
        {selectedTab === 2 && (<><StatsTab games={games}></StatsTab></>)}
      </div>
    </>);
}
