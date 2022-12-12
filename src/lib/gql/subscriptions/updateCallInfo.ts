import { gql } from "@apollo/client";

export const UPDATE_CALL_SUBSCRIPTION = gql`
  subscription onUpdatedCall($id: ID!) {
    onUpdatedCall(id: $id) {
      id
      direction
      from
      to
      duration
      via
      is_archived
      call_type
      created_at
    }
  }
`;
