import { NextApiRequest, NextApiResponse } from "next";
import { toDateString } from "../../../lib/dates";
import {
  methodNotAllowed,
  parseBody,
  requireUserEmail,
  withErrorHandling,
} from "../../../lib/api";
import { workoutRequestSchema } from "../../../lib/schemas";
import {
  deleteWorkout,
  getSingleWorkout,
  updateWorkout,
} from "../../../prisma/queries/workouts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = await requireUserEmail(req, res);
  if (email == null) return;

  const id = Number(req.query?.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid workout id" });
    return;
  }

  switch (req.method) {
    case "GET": {
      const workout = await getSingleWorkout(email, id);

      if (workout == null) {
        res.status(404).json({ error: "Workout not found" });
        return;
      }

      res.status(200).json({
        ...workout,
        workout_date: toDateString(workout.workout_date),
      });
      return;
    }
    case "PUT": {
      const body = parseBody(res, workoutRequestSchema, req.body);
      if (body == null) return;

      // Throws NotFoundError (-> 404) when the workout is not the user's.
      await updateWorkout(email, id, body);
      res.status(200).end();
      return;
    }
    case "DELETE":
      await deleteWorkout(email, id);
      res.status(200).end();
      return;
    default:
      methodNotAllowed(res, ["GET", "PUT", "DELETE"]);
      return;
  }
};

export default withErrorHandling(handler);
