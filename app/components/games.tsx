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

export async function loader() {
  const games = await prisma.game.findMany({ include: { player1: true, player2: true } });
  return json({ games });
}

// maybe I should use https://remix.run/docs/en/v1/hooks/use-fetcher
async function updateGame(value: string, game: Game) {
  await prisma.game.update({ where: { id: game.id }, data: { ...game } });
}

type AllGamesProps = {
  games: (Game & { player1: Player, player2: Player })[]
}

export default function AllGames(props: AllGamesProps) {
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
                          onSubmit={value => updateGame(value, game)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                :
                <Editable defaultValue={game.scorePlayer2.toString()}>
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
