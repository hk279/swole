import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';
import { ExerciseData } from '../../types';

interface CreateWorkoutRequest extends NextApiRequest {
    body: {
        workout_date: Date;
        exercises: ExerciseData[];
    };
}

export default async function handler(
    req: CreateWorkoutRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    const { workout_date, exercises } = req.body;

    try {
        // 30.10.2022 - Nested create not supported, thus having to create workout and exercises separately.
        await prisma.$transaction(async (prisma) => {
            const workout = await prisma.workout.create({
                data: {
                    workout_date,
                    User: {
                        connect: {
                            email: session?.user?.email ?? ""
                        }
                    }
                }
            });

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
                        Set: { createMany: { data: exercise.Set.map(set => ({ weight: set.weight ?? 0, reps: set.reps ?? 0 })) } }
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
