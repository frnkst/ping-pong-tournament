import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  SimpleGrid,
  Text
} from "@chakra-ui/react";

export async function loader() {
  const players = await prisma.player.findMany();
  return json({ players });
}

export default function AllPlayers() {
  const data = useLoaderData<typeof loader>();

  return <div>
    <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
      {data.players.map(player => (
          <Card key={player.id}>
            <CardHeader>
              <Heading size="md"> {player.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        )
      )}
    </SimpleGrid>
  </div>;
}
