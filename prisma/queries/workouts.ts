import { prisma } from "../../lib/prisma";

export const getSingleWorkout = (email: string, id: number) => {
    return prisma.workout.findFirst({
        where: {
            id,
            User: {
                email
            }
        },
        select: {
            id: true,
            workout_date: true,
            Exercise: {
                select: {
                    Set: {
                        select: {
                            weight: true,
                            reps: true
                        }
                    },
                    Exercise_type: true
                }
            }
        }
    });
};

export const getAllWorkouts = (email: string) => {
    return prisma.workout.findMany({
        where: {
            User: {
                email
            }
        },
        include: {
            Exercise: {
                include: {
                    Set: true,
                    Exercise_type: true
                }
            }
        }
    });
};
