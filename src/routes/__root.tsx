import {createRootRoute, Link, Outlet, redirect, useMatchRoute} from "@tanstack/react-router";
import {useMetrics} from "../features/metrics/context/MetricsProvider.tsx";

const RootRouteComponent = () => {
  const {setMetrics} = useMetrics()
  const matchRoute = useMatchRoute();

  return (
    <>
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <nav className="flex gap-4">
          <Link
            to="/rest"
            className={`nav-button ${matchRoute({to: "/rest"}) ? "active" : "inactive"}`}
            onClick={() => {
              setMetrics([])
            }}
          >
            REST
          </Link>
          <Link
            to="/graphql"
            className={`nav-button ${matchRoute({to: "/graphql"}) ? "active" : "inactive"}`}
            onClick={() => {
              setMetrics([])
            }}
          >
            GraphQL
          </Link>
          <Link
            to="/grpc"
            className={`nav-button ${matchRoute({to: "/grpc"}) ? "active" : "inactive"}`}
            onClick={() => {
              setMetrics([])
            }}
          >
            gRPC
          </Link>
        </nav>
      </div>
      <Outlet/>
    </>
  );
};

export const Route = createRootRoute({
  beforeLoad: ({location}) => {
    if (location.pathname === '/') {
      throw redirect({
        to: '/rest',
        replace: true
      })
    }
  },
  component: RootRouteComponent
})
