import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createRoot } from "react-dom/client";
import { ProtocolProvider } from "./context/protocolContext.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {GRAPHQL_PORT, SERVER_URL} from "./consts.ts";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const client = new ApolloClient({
  uri: `${SERVER_URL}:${GRAPHQL_PORT}`,
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
      <ProtocolProvider>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </ProtocolProvider>
  );
}
