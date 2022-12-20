import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../../lib/prisma';

interface DeleteWorkoutRequest extends NextApiRequest {
    query: {
        id: string;
    };
}

export default async function handler(
    req: DeleteWorkoutRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    const session = await getSession({ req });
    const sessionEmail = session?.user?.email;

    // TODO: Put in a middleware
    if (sessionEmail == null) return { redirect: { destination: '/login', permanent: false } };

    const numericId = parseInt(id);

    if (isNaN(numericId)) return { redirect: { destination: '/404', permanent: false } };

    try {
        // 19.12.2022 - Using deleteMany since the experimental feature "extendedWhereUnique" doesnt seem to work
        await prisma.workout.deleteMany({
            where: {
                id: numericId,
                User: {
                    email: sessionEmail
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
