import { NextApiRequest, NextApiResponse } from "next";
import {
  methodNotAllowed,
  requireUserEmail,
  withErrorHandling,
} from "../../../lib/api";
import {
  getAllExerciseTypes,
  getFavoriteExerciseTypes,
} from "../../../prisma/queries/exerciseTypes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = await requireUserEmail(req, res);
  if (email == null) return;

  switch (req.method) {
    case "GET": {
      const [allExerciseTypes, favoriteExerciseTypes] = await Promise.all([
        getAllExerciseTypes(),
        getFavoriteExerciseTypes(email),
      ]);

      const favoriteIds = new Set(
        favoriteExerciseTypes.map((favorite) => favorite.id)
      );

      const exerciseTypes = allExerciseTypes.map((exerciseType) => ({
        id: exerciseType.id,
        name: exerciseType.name,
        isFavorite: favoriteIds.has(exerciseType.id),
      }));

      res.status(200).json(exerciseTypes);
      return;
    }
    default:
      methodNotAllowed(res, ["GET"]);
      return;
  }
};

export default withErrorHandling(handler);
