// import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';
import { ExerciseData } from '../../../types';

// interface UpdateWorkoutRequest extends NextApiRequest {
//     query: {
//         id: string;
//     },
//     body: {
//         workout_date: Date;
//         exercises: ExerciseData[];
//     };
// }

export default async function handler(
    req,
    res
) {
    const { workout_date, exercises } = req.body;
    const { id } = req.query;
    const session = await getSession({ req });
    const sessionEmail = session?.user?.email;

    // TODO: Put in a middleware
    if (sessionEmail == null) return { redirect: { destination: '/login', permanent: false } };

    const numericId = parseInt(id);

    if (isNaN(numericId)) return { redirect: { destination: '/404', permanent: false } };

    try {
        await prisma.$transaction(async (prisma) => {
            // Update workout date
            const workout = await prisma.workout.update({
                where: {
                    id: numericId,
                    User: {
                        email: sessionEmail
                    }
                },
                data: {
                    workout_date
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
                                id: workout.id
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
