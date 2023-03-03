import { prisma } from "~/db.server";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";

export async function loader() {
  const tournaments = await prisma.tournament.findMany();
  return json({ tournaments });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <>
      {data.tournaments.map(tournament => (
        <Card sx={{ maxWidth: 345 }} key={tournament.id}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {tournament.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Edit</Button>
              <Button size="small" onClick={() => navigate(`/tournaments/${tournament.name}`)}>Show games</Button>
          </CardActions>
        </Card>
      ))}
    </>)
}
