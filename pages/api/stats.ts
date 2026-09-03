import { NextApiRequest, NextApiResponse } from "next";
import {
  methodNotAllowed,
  requireUserEmail,
  withErrorHandling,
} from "../../lib/api";
import { getWorkoutCountsByMonth } from "../../prisma/queries/workouts";

/** How far back the stats page looks. */
const MONTHS_OF_HISTORY = 12;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = await requireUserEmail(req, res);
  if (email == null) return;

  switch (req.method) {
    case "GET": {
      const now = new Date();
      const since = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - MONTHS_OF_HISTORY, 1)
      );

      const workoutCountsPerMonth = await getWorkoutCountsByMonth(email, since);

      res.status(200).json({ workoutCountsPerMonth });
      return;
    }
    default:
      methodNotAllowed(res, ["GET"]);
      return;
  }
};

export default withErrorHandling(handler);
