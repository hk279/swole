import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

interface RemoveFavoriteExerciseRequest extends NextApiRequest {
    body: {
        exerciseTypeId: number;
    };
}

export default async function handler(
    req: RemoveFavoriteExerciseRequest,
    res: NextApiResponse
) {
    const { exerciseTypeId } = req.body;
    const session = await getSession({ req });
    const sessionEmail = session?.user?.email;

    // TODO: Put in a middleware
    if (sessionEmail == null) return { redirect: { destination: '/login', permanent: false } };

    try {
        // Using delete many to get access to relational where-parameters
        await prisma.favorite.deleteMany({
            where: {
                User: {
                    email: sessionEmail
                },
                ExerciseType: {
                    id: exerciseTypeId
                }
            }
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
