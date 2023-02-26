import type { ActionArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";

export async function action({ request }: ActionArgs) {
  const form = await request.formData();

  // Use zod to validate data
  const scorePlayer1 = parseInt(form.get("scorePlayer1") as string);
  const scorePlayer2 = parseInt(form.get("scorePlayer2") as string);
  const game = form.get("gameId") as string;

  try {
    await prisma.game.update({ where: { id: game}, data: { scorePlayer1, scorePlayer2}})
    return json({ error: null, ok: true });
  } catch (error) {
    return json({ error: "an error happened", ok: false });
  }
}
