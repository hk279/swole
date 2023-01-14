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
                        email
                    }
                }
            }
        }
    });
};
