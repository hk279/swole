import { z } from "zod";
import { DATE_STRING_PATTERN, toStoredDate } from "./dates";

/**
 * Server-side shape of the workout write payload.
 *
 * Note this is stricter than the client-side `WorkoutRequest` type: the form
 * allows partially filled sets while editing, but only complete exercises may
 * reach the API. In particular `Exercise_type` is required here — previously a
 * user with no favourited exercise types could submit an exercise without one,
 * which reached Prisma as `connect: { id: undefined }` and threw a 500.
 */
export const setSchema = z.object({
  weight: z.number().nonnegative(),
  reps: z.number().int().positive(),
});

export const exerciseSchema = z.object({
  Exercise_type: z.object({
    id: z.number().int().positive(),
  }),
  Set: z.array(setSchema).min(1),
});

export const workoutRequestSchema = z.object({
  // A calendar date, not an instant. Accepted as `YYYY-MM-DD` and stored at
  // UTC midnight so it round-trips regardless of server or client timezone.
  workoutDate: z
    .string()
    .regex(DATE_STRING_PATTERN, "Expected a YYYY-MM-DD date")
    .transform(toStoredDate)
    .refine((date) => !Number.isNaN(date.getTime()), "Invalid calendar date"),
  exercises: z.array(exerciseSchema).min(1),
});

export type WorkoutRequestBody = z.infer<typeof workoutRequestSchema>;

export const favoriteRequestSchema = z.object({
  exerciseTypeId: z.number().int().positive(),
});

export type FavoriteRequestBody = z.infer<typeof favoriteRequestSchema>;

/**
 * Query parameters for the paginated workout list. Values arrive as strings, so
 * they are coerced and bounded before reaching the database.
 */
export const workoutListQuerySchema = z.object({
  cursor: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(50).optional(),
});

export type WorkoutListQuery = z.infer<typeof workoutListQuerySchema>;
