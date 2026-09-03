import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../lib/errors";
import { WorkoutRequestBody } from "../../lib/schemas";

type PrismaTransaction = Parameters<
  Parameters<typeof prisma.$transaction>[0]
>[0];

/** Page size cap for the workout list. */
export const MAX_WORKOUT_PAGE_SIZE = 50;
export const DEFAULT_WORKOUT_PAGE_SIZE = 20;

/**
 * Resolves a workout id to one the user actually owns, throwing otherwise.
 * Every write must go through this before touching related rows — scoping only
 * the top-level update is not enough, because exercises and sets are addressed
 * by workout id alone.
 */
const assertWorkoutOwnedBy = async (
  tx: PrismaTransaction,
  email: string,
  id: number
) => {
  const workout = await tx.workout.findFirst({
    where: { id, User: { email } },
    select: { id: true },
  });

  if (workout == null) throw new NotFoundError("Workout not found");

  return workout.id;
};

/**
 * Builds the nested-write payload for a workout's exercises. Prisma supports
 * creating the whole exercise/set tree in one nested write, so this replaces
 * the previous loop that issued a separate round trip per exercise.
 */
const nestedExerciseCreate = (exercises: WorkoutRequestBody["exercises"]) => ({
  create: exercises.map((exercise) => ({
    Exercise_type: {
      connect: {
        id: exercise.Exercise_type.id,
      },
    },
    Set: {
      createMany: {
        data: exercise.Set.map((set) => ({
          weight: set.weight,
          reps: set.reps,
        })),
      },
    },
  })),
});

const workoutWithExercises = {
  Exercise: {
    include: {
      Set: true,
      Exercise_type: true,
    },
  },
} as const;

export const getSingleWorkout = (email: string, id: number) => {
  return prisma.workout.findFirst({
    where: {
      id,
      User: {
        email,
      },
    },
    select: {
      id: true,
      workout_date: true,
      Exercise: {
        select: {
          Set: {
            select: {
              weight: true,
              reps: true,
            },
          },
          Exercise_type: true,
        },
      },
    },
  });
};

/**
 * One page of the user's workouts, newest first.
 *
 * Cursor-based rather than offset-based so that adding or deleting a workout
 * while paging cannot duplicate or skip rows. `id` breaks ties between workouts
 * recorded on the same date, which also makes the ordering stable.
 */
export const getWorkoutsPage = async (
  email: string,
  { cursor, take }: { cursor?: number; take?: number } = {}
) => {
  const pageSize = Math.min(take ?? DEFAULT_WORKOUT_PAGE_SIZE, MAX_WORKOUT_PAGE_SIZE);

  const workouts = await prisma.workout.findMany({
    where: {
      User: {
        email,
      },
    },
    include: workoutWithExercises,
    orderBy: [{ workout_date: "desc" }, { id: "desc" }],
    // Fetch one extra row to find out whether another page exists.
    take: pageSize + 1,
    ...(cursor != null ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = workouts.length > pageSize;
  const items = hasMore ? workouts.slice(0, pageSize) : workouts;

  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
  };
};

/**
 * Workout counts grouped by calendar month, computed in the database.
 *
 * The stats page previously downloaded every workout with every set just to
 * count them client-side; this returns one small row per month instead.
 */
export const getWorkoutCountsByMonth = async (email: string, since: Date) => {
  const rows = await prisma.$queryRaw<{ month: string; count: number }[]>`
    SELECT to_char(w.workout_date, 'YYYY-MM') AS month,
           COUNT(*)::int AS count
    FROM "Workout" w
    JOIN "User" u ON u.id = w.user_id
    WHERE u.email = ${email}
      AND w.workout_date >= ${since}
    GROUP BY 1
    ORDER BY 1
  `;

  return rows;
};

export const createWorkout = async (
  email: string,
  { workoutDate, exercises }: WorkoutRequestBody
) => {
  // A single nested write; Prisma runs it in one implicit transaction.
  await prisma.workout.create({
    data: {
      workout_date: workoutDate,
      User: {
        connect: {
          email,
        },
      },
      Exercise: nestedExerciseCreate(exercises),
    },
  });
};

export const deleteWorkout = async (email: string, id: number) => {
  await prisma.$transaction(async (tx) => {
    const workoutId = await assertWorkoutOwnedBy(tx, email, id);

    await tx.workout.delete({ where: { id: workoutId } });
  });
};

export const updateWorkout = async (
  email: string,
  id: number,
  { workoutDate, exercises }: WorkoutRequestBody
) => {
  await prisma.$transaction(async (tx) => {
    const workoutId = await assertWorkoutOwnedBy(tx, email, id);

    // Replace the exercise list wholesale. Safe to key on the workout id alone
    // now that ownership has been verified above. Deleted first so the delete
    // and the re-create cannot interleave.
    await tx.exercise.deleteMany({
      where: {
        Workout: {
          id: workoutId,
        },
      },
    });

    await tx.workout.update({
      where: { id: workoutId },
      data: {
        workout_date: workoutDate,
        Exercise: nestedExerciseCreate(exercises),
      },
    });
  });
};
