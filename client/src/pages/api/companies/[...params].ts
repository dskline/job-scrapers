import { NextApiRequest, NextApiResponse } from 'next'

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
  fetch(`http://localhost:9000/api/v1/companies/${companyId}/requestUpdate`, {
    method: 'POST',
  })
}
