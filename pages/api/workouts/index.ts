import { NextApiRequest, NextApiResponse } from "next";
import { toDateString } from "../../../lib/dates";
import {
  methodNotAllowed,
  parseBody,
  parseQuery,
  requireUserEmail,
  withErrorHandling,
} from "../../../lib/api";
import {
  workoutListQuerySchema,
  workoutRequestSchema,
} from "../../../lib/schemas";
import {
  createWorkout,
  getWorkoutsPage,
} from "../../../prisma/queries/workouts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = await requireUserEmail(req, res);
  if (email == null) return;

  switch (req.method) {
    case "GET": {
      const query = parseQuery(res, workoutListQuerySchema, req.query);
      if (query == null) return;

      const { items, nextCursor } = await getWorkoutsPage(email, {
        cursor: query.cursor,
        take: query.limit,
      });

      res.status(200).json({
        items: items.map((workout) => ({
          ...workout,
          workout_date: toDateString(workout.workout_date),
        })),
        nextCursor,
      });
      return;
    }
    case "POST": {
      const body = parseBody(res, workoutRequestSchema, req.body);
      if (body == null) return;

      await createWorkout(email, body);
      res.status(201).end();
      return;
    }
    default:
      methodNotAllowed(res, ["GET", "POST"]);
      return;
  }
};

export default withErrorHandling(handler);
