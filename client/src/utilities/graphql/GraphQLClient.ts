import { GraphQLClient } from 'graphql-request'

import config from 'src/config'

const client = new GraphQLClient(config.public.gqlEndpoint)

export default client
