import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Center, Editable, EditablePreview, EditableInput
} from "@chakra-ui/react";
import type { Game, Player } from "@prisma/client";
import { FetcherWithComponents, FormProps, SubmitFunction, useFetcher } from "@remix-run/react";
import { useRef } from "react";
import { ActionSubmission, LoaderSubmission } from "@remix-run/react/dist/transition";

export async function loader() {
  const games = await prisma.game.findMany({ include: { player1: true, player2: true } });
  return json({ games });
}

type AllGamesProps = {
  games: (Game & { player1: Player, player2: Player })[]
}

function updateScore(scorePlayer1: string, scorePlayer2: string, fetcher: FetcherWithComponents<any>, game: Game & { player1: Player; player2: Player; }) {
  fetcher.submit(
    { scorePlayer1, scorePlayer2, gameId: game.id },
    { method: "post", action: "/games/update" }
  );
}

export default function AllGames(props: AllGamesProps) {
  const fetcher = useFetcher();

  return <div>
    <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
      {props.games.map(game => (
          <Card key={game.id}>
            <CardHeader>
              <Heading size="md">
                <Center>{game.player1.name} vs {game.player2.name}</Center>
              </Heading>
            </CardHeader>
            <CardBody>
              <Center>
                <Editable defaultValue={game.scorePlayer1.toString()}
                          onSubmit={newScore => updateScore(newScore, game.scorePlayer2.toString(), fetcher, game)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                :
                <Editable defaultValue={game.scorePlayer2.toString()}
                          onSubmit={newScore => updateScore(game.scorePlayer1.toString(), newScore, fetcher, game)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Center>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        )
      )}
    </SimpleGrid>
  </div>;
}
