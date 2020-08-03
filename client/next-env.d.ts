/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  export default typeof DocumentNode
}
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
