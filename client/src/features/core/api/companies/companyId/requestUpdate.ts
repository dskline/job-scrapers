import { NextApiResponse } from 'next'

import config from 'src/config'

export default (res: NextApiResponse, companyId: string): void => {
  fetch(
    `${config.public.serverEndpoint}/companies/${companyId}/requestUpdate`,
    {
      method: 'POST',
    }
  )
  res.status(200).json({ message: 'Request sent' })
}
