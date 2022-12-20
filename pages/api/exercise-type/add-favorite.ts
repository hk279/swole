import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

interface AddFavoriteExerciseRequest extends NextApiRequest {
  body: {
    exerciseTypeId: number;
  };
}

export default async function handler(
  req: AddFavoriteExerciseRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { exerciseTypeId } = req.body;

  try {
    await prisma.favorite.create({
      data: {
        User: {
          connect: {
            email: session?.user?.email ?? ""
          }
        },
        ExerciseType: {
          connect: {
            id: exerciseTypeId
          }
        },
      },
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
