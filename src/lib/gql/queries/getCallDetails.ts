import { gql } from "@apollo/client";

export const GET_CALL_DETAILS = gql`
  query Call($id: ID!) {
    call(id: $id) {
      id
      direction
      from
      to
      duration
      is_archived
      call_type
      via
      created_at
      notes {
        id
        content
      }
    }
  }
`;
