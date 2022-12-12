import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

import { authLink } from "./link";

const httpLink = createHttpLink({
  uri: "https://frontend-test-api.aircall.dev/graphql",
});
const APOLLO_CLIENT = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default APOLLO_CLIENT;
