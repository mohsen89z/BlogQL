import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const link = createHttpLink({
  uri: "http://localhost:4000/"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
