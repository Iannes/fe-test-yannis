import React, { useEffect } from "react";
import { ActionType as PaginationAction } from "lib/contexts/PaginationProvider";
import { ItemsList } from "components/shared/Calls/ItemsList";
import { CallsLayout } from "./CallsLayout.styled";
import { useCallsOperations } from "lib/hooks/useCallsOperations";

type Props = { [x: string]: any; subscribeToArchivedCalls?: any };
export type CallsDictionary = { [key: string]: Call[] };

export const CallsList = ({ subscribeToArchivedCalls, ...results }: Props) => {
  const {
    archiveCall,
    totalCount,
    groupedItems,
    groupedItemsArray,
    paginatedCalls,
    paginationDispatch,
  } = useCallsOperations();

  useEffect(() => {
    if (totalCount > 0) return;
    paginationDispatch({
      type: PaginationAction.SET_TOTAL_COUNT,
      payload: totalCount,
    });
  }, [totalCount, paginationDispatch, paginatedCalls]);

  const handleArchive = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    archiveCall({ variables: { archiveCallId: e.currentTarget.id } });
  };

  return (
    <CallsLayout>
      <ItemsList
        groupedItems={groupedItems}
        groupedItemsArray={groupedItemsArray}
        handleArchive={handleArchive}
      />
    </CallsLayout>
  );
};
