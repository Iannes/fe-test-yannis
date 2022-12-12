import React from "react";
import { useQuery } from "@apollo/client";
import { UPDATE_CALL_SUBSCRIPTION } from "lib/gql/subscriptions";
import { useCalls } from "lib/contexts/CallsProvider";
import { GET_CALL_DETAILS } from "lib/gql/queries/getCallDetails";
import { CallsList } from "./CallsList";

const CallsListPage = () => {
  const { callsState } = useCalls();

  const { subscribeToMore, ...result } = useQuery(GET_CALL_DETAILS, {
    variables: {
      id: "",
    },
  });

  const handleArchiveSubscription = () => {
    subscribeToMore({
      document: UPDATE_CALL_SUBSCRIPTION,
      variables: { id: callsState?.archivedId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedCalls = subscriptionData?.data?.call?.nodes;

        return Object.assign({}, prev, {
          call: {
            nodes: [...updatedCalls],
          },
        });
      },
    });
  };

  return (
    <CallsList
      {...result}
      subscribeToArchivedCalls={handleArchiveSubscription}
    />
  );
};

export default CallsListPage;
