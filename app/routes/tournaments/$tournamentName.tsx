import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { ActionArgs, json, redirect } from "@remix-run/node";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure
} from "@chakra-ui/react";
import { prisma } from "~/db.server";

export async function loader({ params }: LoaderArgs) {
  const tournamentName = params.tournamentName;
  const tournament = await prisma.tournament.findFirst({ where: { name: tournamentName}, include: { games: { include: { player1: true, player2: true}},  }})
  return json({ tournament });
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  console.log("bla", form);

  // Use zod to validate data
  const scorePlayer1 = parseInt(form.get("scorePlayer1") as string);
  const scorePlayer2 = parseInt(form.get("scorePlayer2") as string);
  const game = form.get("gameId") as string;

  try {
    await prisma.game.update({ where: { id: game}, data: { scorePlayer1, scorePlayer2}})
    return null;
  } catch (error) {
    console.log("frank", error);
    return null;
  }
}
export default function Tournament() {
  const data = useLoaderData<typeof loader>();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                    {game.scorePlayer1.toString()}
                    :
                    {game.scorePlayer2.toString()}
                  </Center>
                </CardBody>
                <CardFooter>
                  <Button colorScheme='blue' onClick={onOpen}>Edit</Button>
                </CardFooter>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <Form method="post">
                    <ModalHeader>Edit score</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      { game.player1.name }: <Input name="scorePlayer1" placeholder={game.scorePlayer1.toString()}></Input>
                      <br />
                      { game.player2.name }: <Input name="scorePlayer2" placeholder={game.scorePlayer2.toString()}></Input>
                    </ModalBody>
                      <Input type="hidden" name="gameId" value={game.id}></Input>

                    <ModalFooter>
                      <Button onClick={onClose} variant='ghost'>
                        Cancel
                      </Button>
                      <Button colorScheme='blue' mr={3} type="submit" onClick={() => onClose()}>Save</Button>
                    </ModalFooter>
                    </Form>
                  </ModalContent>
                </Modal>
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
