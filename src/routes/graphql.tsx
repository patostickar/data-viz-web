import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/graphql')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/graphql"!</div>
}
