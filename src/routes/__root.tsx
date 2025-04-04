import {createRootRoute, Link, Outlet, redirect} from "@tanstack/react-router";
import {useProtocol} from "../features/protocol/context/protocolContext.tsx";
import {useMetrics} from "../features/metrics/context/MetricsProvider.tsx";

const RootRouteComponent = () => {
  const {connectionType, setConnectionType} = useProtocol();
  const {setMetrics} = useMetrics()

  return (
    <>
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <nav className="flex gap-4">
          <Link
            to="/rest"
            className={`nav-button ${connectionType === "rest" ? "active" : "inactive"}`}
            onClick={() => {
              setConnectionType("rest")
              setMetrics([])
            }}
          >
            REST
          </Link>
          <Link
            to="/graphql"
            className={`nav-button ${connectionType === "graphql" ? "active" : "inactive"}`}
            onClick={() => {
              setConnectionType("graphql")
              setMetrics([])
            }}
          >
            GraphQL
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
