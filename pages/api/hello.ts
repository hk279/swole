// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function getExcercises(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  res.status(200).json(
    "hello"
  )
}
