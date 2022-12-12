import { gql } from "@apollo/client";

export const REFRESH_TOKEN_MUTATION = gql`
  mutation REFRESH_TOKEN {
    refreshTokenV2 {
      access_token
      refresh_token
      user {
        id
        username
      }
    }
  }
`;
