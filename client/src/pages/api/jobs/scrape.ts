import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  fetch('http://localhost:9000/api/v1/jobs/scrape', {
    method: 'POST',
  })
  res.status(200).json({ message: 'Request sent' })
}
