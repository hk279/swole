import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export const getAllExerciseTypes = () => {
  return prisma.exercise_type.findMany();
};

export const getFavoriteExerciseTypes = (email: string) => {
  return prisma.exercise_type.findMany({
    where: {
      User: {
        some: {
          User: {
            email,
          },
        },
      },
    },
  });
};

/**
 * Idempotent: favouriting something already favourited is a no-op rather than
 * an error. The (user_id, exercise_type_id) unique constraint now rejects the
 * duplicate row that a double-click used to create.
 *
 * The existence check keeps the common repeat-click case off the error path;
 * the P2002 catch is the backstop for two requests racing each other.
 */
export const addFavoriteExerciseType = async (email: string, id: number) => {
  const existing = await prisma.favorite.findFirst({
    where: {
      User: { email },
      ExerciseType: { id },
    },
    select: { id: true },
  });

  if (existing != null) return;

  try {
    await prisma.favorite.create({
      data: {
        User: {
          connect: {
            email,
          },
        },
        ExerciseType: {
          connect: {
            id,
          },
        },
      },
    });
  } catch (error) {
    const isDuplicate =
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002";

    if (!isDuplicate) throw error;
  }
};

export const removeFavoriteExerciseType = async (email: string, id: number) => {
  // Using delete many to get access to relational where-parameters
  await prisma.favorite.deleteMany({
    where: {
      User: {
        email,
      },
      ExerciseType: {
        id,
      },
    },
  });
};
