import * as React from "react";
import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { z } from "zod";
import { prisma } from "~/db.server";

const validateFormData = (inputs: unknown) => {
  const FormData = z.object({
    name: z.string().min(1).max(18),
    avatar: z.string().min(1).max(18),
  });

  const parsed = FormData.safeParse(inputs);
  if (!parsed.success) {
    throw new Error("Not a valid user provided");
  }
  return parsed.data;
};

export async function action({ request }: ActionArgs) {

  const formData = await request.formData();
  const a = formData.get("name");
  const b = formData.get("avatar");
  const player = validateFormData({ name: a, avatar: b});
  console.log("frank", player)
  await prisma.player.create({ data: player})

  return null;
}

export default function NewPlayer() {
  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Name: </span>
          <input
            name="name"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Avatar: </span>
          <input
            name="avatar"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          />
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  )
}
