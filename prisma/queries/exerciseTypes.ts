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

export const addFavoriteExerciseType = async (email: string, id: number) => {
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
