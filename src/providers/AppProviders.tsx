import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {MetricsProvider} from "../features/metrics/context/MetricsProvider.tsx";
import React from "react";
import {GRAPHQL_PORT, SERVER_URL} from "../lib/constants/env.ts";

const client = new ApolloClient({
  uri: `${SERVER_URL}:${GRAPHQL_PORT}`,
  cache: new InMemoryCache(),
});

export const AppProviders = ({children}: {
  children: React.ReactNode;
}) => (
  <ApolloProvider client={client}>
    <MetricsProvider>
      {children}
    </MetricsProvider>
  </ApolloProvider>
);
