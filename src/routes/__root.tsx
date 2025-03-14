import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useProtocol } from "../hooks/useProtocol";

const RootRouteComponent = () => {
  const { connectionType, setConnectionType } = useProtocol();

  return (
    <>
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <nav className="flex gap-4">
          <Link
            to="/rest"
            className={`nav-button ${connectionType === "rest" ? "active" : "inactive"}`}
            onClick={() => setConnectionType("rest")}
          >
            REST
          </Link>
          <Link
            to="/graphql"
            className={`nav-button ${connectionType === "graphql" ? "active" : "inactive"}`}
            onClick={() => setConnectionType("graphql")}
          >
            GraphQL
          </Link>
        </nav>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootRouteComponent,
});
