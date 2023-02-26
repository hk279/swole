import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  deleteWorkout,
  getSingleWorkout,
  updateWorkout,
} from "../../../prisma/queries/workouts";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const email = session?.user?.email;
  const id = Number(req.query?.id);

  if (email == null) return res.status(401).redirect("/login");

  if (isNaN(id)) return res.status(404).redirect("/404");

  switch (req.method) {
    case "GET":
      return res.status(200).json(await getSingleWorkout(email, id));
    case "PUT":
      await updateWorkout(email, id, req.body);
      return res.status(200).end();
    case "DELETE":
      await deleteWorkout(email, id);
      return res.status(200).end();
    default:
      return res.status(405).end();
  }
}
