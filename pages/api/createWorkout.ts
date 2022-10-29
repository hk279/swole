// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

interface CreateWorkoutRequest extends NextApiRequest {
  body: {
    user_id: number;
    number_two: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  //const workout = await prisma.workout.create({data: {user_id: "1", workout_date: req.body.date}})

  res.status(200).json(
    req.body
  )
}
