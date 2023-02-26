import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { removeFavoriteExerciseType } from "../../../prisma/queries/exerciseTypes";

interface RemoveFavoriteExerciseRequest extends NextApiRequest {
  body: {
    exerciseTypeId: number;
  };
}

export default async function handler(
  req: RemoveFavoriteExerciseRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const email = session?.user?.email;

  if (email == null) return res.status(401).redirect("/login");

  const { exerciseTypeId } = req.body;

  switch (req.method) {
    case "POST":
      await removeFavoriteExerciseType(email, exerciseTypeId);
      return res.status(200).end();
    default:
      return res.status(405).end();
  }
}
