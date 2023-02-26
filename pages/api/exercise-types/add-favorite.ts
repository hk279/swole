import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { addFavoriteExerciseType } from "../../../prisma/queries/exerciseTypes";

interface AddFavoriteExerciseRequest extends NextApiRequest {
  body: {
    exerciseTypeId: number;
  };
}

export default async function handler(
  req: AddFavoriteExerciseRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const email = session?.user?.email;

  if (email == null) return res.status(401).redirect("/login");

  const { exerciseTypeId } = req.body;

  console.log(exerciseTypeId);

  switch (req.method) {
    case "POST":
      await addFavoriteExerciseType(email, exerciseTypeId);
      return res.status(200).end();
    default:
      return res.status(405).end();
  }
}
