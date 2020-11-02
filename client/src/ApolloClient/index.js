import ApolloClient from "apollo-boost";
import { STORAGE_JWT } from "constants/index";

const client = new ApolloClient({
  uri: "/graphql",
  request: (operation) => {
    const token = localStorage.getItem(STORAGE_JWT);
    token &&
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
  },
});
export default client;
