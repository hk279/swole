import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  getAllExerciseTypes,
  getFavoriteExerciseTypes,
} from "../../../prisma/queries/exerciseTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const email = session?.user?.email;

  if (email == null) return res.status(401).redirect("/login");

  switch (req.method) {
    case "GET":
      const allExerciseTypes = await getAllExerciseTypes();
      const favoriteExerciseTypes = await getFavoriteExerciseTypes(email);

      const exerciseTypes = allExerciseTypes.map((exerciseType) => ({
        id: exerciseType.id,
        name: exerciseType.name,
        isFavorite:
          favoriteExerciseTypes.find(
            (favorite) => favorite.id == exerciseType.id
          ) != null,
      }));

      return res.status(200).json(exerciseTypes);
    default:
      return res.status(405).end();
  }
}
