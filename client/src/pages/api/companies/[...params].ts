import { NextApiRequest, NextApiResponse } from 'next'

import config from 'src/config'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST' && req.query.params[1] === 'requestUpdate') {
    requestFullScraperUpdate(req.query.params[0])
    res.status(200).json({ message: 'Request sent' })
  } else {
    res
      .status(401)
      .json({ message: 'Unknown query parameters for this request' })
  }
}

function requestFullScraperUpdate (companyId) {
  fetch(
    `${config.public.serverEndpoint}/companies/${companyId}/requestUpdate`,
    {
      method: 'POST',
    }
  )
}
