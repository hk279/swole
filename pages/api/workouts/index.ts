import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  createWorkout,
  getAllWorkouts,
} from "../../../prisma/queries/workouts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const email = session?.user?.email;

  if (email == null) return res.status(401).redirect("/login");

  switch (req.method) {
    case "GET":
      return res.status(200).json(await getAllWorkouts(email));
    case "POST":
      await createWorkout(email, req.body);
      return res.status(201).end();
    default:
      return res.status(405).end();
  }
}
