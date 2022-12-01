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
        // 30.10.2022 - Nested create not supported, thus having to create workout ad exercises separately.
        // TODO: Put in transaction
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

        exercises.forEach(async (exercise) => {
            await prisma.exercise.create({
                data: {
                    workout_id: workout.id,
                    exercise_type_id: exercise.exerciseType.id,
                    Set: { createMany: { data: exercise.sets.map(set => ({ weight: set.weight ?? 0, reps: set.reps ?? 0 })) } }
                }
            });
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
