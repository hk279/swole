import type { NextApiRequest, NextApiResponse } from "next";
import {
  methodNotAllowed,
  parseBody,
  requireUserEmail,
  withErrorHandling,
} from "../../../lib/api";
import { favoriteRequestSchema } from "../../../lib/schemas";
import { addFavoriteExerciseType } from "../../../prisma/queries/exerciseTypes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = await requireUserEmail(req, res);
  if (email == null) return;

  switch (req.method) {
    case "POST": {
      const body = parseBody(res, favoriteRequestSchema, req.body);
      if (body == null) return;

      await addFavoriteExerciseType(email, body.exerciseTypeId);
      res.status(200).end();
      return;
    }
    default:
      methodNotAllowed(res, ["POST"]);
      return;
  }
};

export default withErrorHandling(handler);
