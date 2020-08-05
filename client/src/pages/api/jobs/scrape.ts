import { NextApiRequest, NextApiResponse } from 'next'

import config from 'src/config'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  fetch(`${config.public.serverEndpoint}/jobs/scrape`, {
    method: 'POST',
  })
  res.status(200).json({ message: 'Request sent' })
}
