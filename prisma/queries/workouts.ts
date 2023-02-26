import { prisma } from "../../lib/prisma";
import { WorkoutRequest } from "../../queries/workout";

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

export const getAllWorkouts = (email: string) => {
  return prisma.workout.findMany({
    where: {
      User: {
        email,
      },
    },
    include: {
      Exercise: {
        include: {
          Set: true,
          Exercise_type: true,
        },
      },
    },
    orderBy: [{ workout_date: "desc" }],
  });
};

export const createWorkout = async (
  email: string,
  { workoutDate, exercises }: WorkoutRequest
) => {
  // 30.10.2022 - Nested create not supported, thus having to create workout and exercises separately.
  await prisma.$transaction(async (prisma) => {
    const workout = await prisma.workout.create({
      data: {
        workout_date: workoutDate,
        User: {
          connect: {
            email,
          },
        },
      },
    });

    for (const exercise of exercises) {
      await prisma.exercise.create({
        data: {
          Workout: {
            connect: {
              id: workout.id,
            },
          },
          Exercise_type: {
            connect: {
              id: exercise.Exercise_type.id,
            },
          },
          Set: {
            createMany: {
              data: exercise.Set.map((set) => ({
                weight: set.weight ?? 0,
                reps: set.reps ?? 0,
              })),
            },
          },
        },
      });
    }
  });
};

export const deleteWorkout = async (email: string, id: number) => {
  // 19.12.2022 - Using deleteMany since the experimental feature "extendedWhereUnique" doesnt seem to work
  await prisma.workout.deleteMany({
    where: {
      id,
      User: {
        email,
      },
    },
  });
};

export const updateWorkout = async (
  email: string,
  id: number,
  { workoutDate, exercises }: WorkoutRequest
) => {
  await prisma.$transaction(async (prisma) => {
    // Update workout date
    // 19.12.2022 - Using updateMany since the experimental feature "extendedWhereUnique" doesnt seem to work
    await prisma.workout.updateMany({
      where: {
        id,
        User: {
          email,
        },
      },
      data: {
        workout_date: workoutDate,
      },
    });

    // Delete all exercises from the workout
    await prisma.exercise.deleteMany({
      where: {
        Workout: {
          id,
        },
      },
    });

    // Add new list of exercises
    for (const exercise of exercises) {
      await prisma.exercise.create({
        data: {
          Workout: {
            connect: {
              id,
            },
          },
          Exercise_type: {
            connect: {
              id: exercise.Exercise_type.id,
            },
          },
          Set: {
            createMany: {
              data: exercise.Set.map((set) => ({
                weight: set.weight ?? 0,
                reps: set.reps ?? 0,
              })),
            },
          },
        },
      });
    }
  });
};
