import { NextApiRequest, NextApiResponse } from 'next'

import ignoreCompany from 'src/features/core/api/companies/companyId/ignore'
import requestUpdate from 'src/features/core/api/companies/companyId/requestUpdate'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    switch (req.query.params[1]) {
      case 'requestUpdate': {
        requestUpdate(res, req.query.params[0])
        break
      }
      case 'setIgnoreFlag': {
        ignoreCompany(res, req.query.params[0])
        break
      }
      default: {
        res
          .status(401)
          .json({ message: 'Unknown query parameters for this request' })
      }
    }
  }
}
