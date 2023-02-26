import type {
  FetcherWithComponents} from "@remix-run/react";
import {
  Link,
  useFetcher,
  useLoaderData,
  useParams
} from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { ActionArgs, json } from "@remix-run/node";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Card,
  CardHeader, Heading, Center, CardBody, CardFooter, Editable, EditablePreview, EditableInput
} from "@chakra-ui/react";
import { prisma } from "~/db.server";
import type { Game, Player } from "@prisma/client";

export async function loader({ params }: LoaderArgs) {
  const tournamentName = params.tournamentName;
  const tournament = await prisma.tournament.findFirst({ where: { name: tournamentName}, include: { games: { include: { player1: true, player2: true}},  }})
  return json({ tournament });
}

function updateScore(scorePlayer1: string, scorePlayer2: string, fetcher: FetcherWithComponents<any>, game: Game & { player1: Player; player2: Player; }) {
  fetcher.submit(
    { scorePlayer1, scorePlayer2, gameId: game.id },
    { method: "post", action: "/games/update" }
  );
}

export default function Tournament() {
  const fetcher = useFetcher();
  const data = useLoaderData<typeof loader>();

  return (<Tabs>
    <TabList>
      <Tab>Games</Tab>
      <Tab>Stats</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
          <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            {data.tournament?.games.map(game => (
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
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
    </TabPanels>
  </Tabs>)
}
