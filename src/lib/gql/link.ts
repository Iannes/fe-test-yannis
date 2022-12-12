import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

enum Operations {
  LOGIN = "LOGIN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

export const authLink = setContext((request, { headers }) => {
  if (request.operationName === Operations.REFRESH_TOKEN) {
    return {
      headers: {
        ...headers,
        authorization: request.variables?.refreshToken
          ? `Bearer ${request.variables?.refreshToken}`
          : "",
      },
    };
  }
  const accessToken = Cookies.get("access_token");

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});
