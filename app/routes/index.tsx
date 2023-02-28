import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";

export async function loader() {
  //const games = await prisma.game.findMany({ include: { player1: true, player2: true } });
  const tournaments = await prisma.tournament.findMany();
  return json({ tournaments });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      {/*<Games games={data.games}></Games>*/}

      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {data.tournaments.map(tournament => (
          <Link to={"/tournaments/" + tournament.name} key={tournament.id}>
            <Card>
              <CardHeader>
                <Heading size="md">
                  <Center color="blue">{tournament.name}</Center>
                </Heading>
              </CardHeader>
              <CardBody>
                <Center>
                </Center>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Link>
          )
        )}
      </SimpleGrid>
     </>

  );
}
