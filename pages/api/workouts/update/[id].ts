import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/prisma';
import { Exercise } from '../../../../queries/workout';

interface UpdateWorkoutRequest extends NextApiRequest {
    query: {
        id: string;
    },
    body: {
        workoutDate: Date;
        exercises: Exercise[];
    };
}

export default async function handler(
    req: UpdateWorkoutRequest,
    res: NextApiResponse
) {
    const { workoutDate, exercises } = req.body;
    const { id } = req.query;
    const session = await getSession({ req });
    const sessionEmail = session?.user?.email;

    if (sessionEmail == null) return { redirect: { destination: '/login', permanent: false } };

    const numericId = parseInt(id);

    if (isNaN(numericId)) return { redirect: { destination: '/404', permanent: false } };

    try {
        await prisma.$transaction(async (prisma) => {
            // Update workout date
            // 19.12.2022 - Using updateMany since the experimental feature "extendedWhereUnique" doesnt seem to work
            await prisma.workout.updateMany({
                where: {
                    id: numericId,
                    User: {
                        email: sessionEmail
                    }
                },
                data: {
                    workout_date: workoutDate
                }
            });

            // Delete all exercises from the workout
            await prisma.exercise.deleteMany({
                where: {
                    Workout: {
                        id: numericId
                    }
                }
            });

            // Add new list of exercises
            for (const exercise of exercises) {
                await prisma.exercise.create({
                    data: {
                        Workout: {
                            connect: {
                                id: numericId
                            }
                        },
                        Exercise_type: {
                            connect: {
                                id: exercise.Exercise_type.id
                            }
                        },
                        Set: {
                            createMany: {
                                data: exercise.Set.map(set => ({ weight: set.weight ?? 0, reps: set.reps ?? 0 }))
                            }
                        }
                    }
                });
            };
        });

        res.status(200).send(null);
    } catch (error) {
        // TODO: Proper error handling in a middleware
        console.log(error);
        res.status(500).json(
            { message: error }
        );
    }
}