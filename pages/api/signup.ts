import { NextApiRequest, NextApiResponse } from 'next'

// simulating a signup
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body
    res.status(200).json({ fullName: body.fullName, email: body.email })
  }
}
