// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Exercise from "../../types/exercise"

type ExercisesResponse = {
  data: Exercise[]
}

export default function getExcercises(
  req: NextApiRequest,
  res: NextApiResponse<ExercisesResponse>
) {
  res.status(200).json(
    { data: [{ id: "1", userId: "1", name: "Bench press", categories: ["chest"] }] }
  )
}
