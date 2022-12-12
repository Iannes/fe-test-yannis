import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { useFilter } from "lib/contexts/FiltersProvider";
import { usePagination } from "lib/contexts/PaginationProvider";
import { ARCHIVE_CALL_MUTATION } from "lib/gql/mutations/archiveCall";
import { PAGINATED_CALLS } from "lib/gql/queries";
import { useFilteredCalls } from "./useFilteredCalls";
import { usePageRedirect } from "./usePageRedirect";

export const useCallsOperations = () => {
  const { filterState } = useFilter();
  const { paginationState, paginationDispatch } = usePagination();
  const [search] = useSearchParams();
  const pageQueryParams = search.get("page");
  const activePage = !!pageQueryParams ? parseInt(pageQueryParams) : 1;

  const [archiveCall, { error }] = useMutation(ARCHIVE_CALL_MUTATION);
  const shouldRedirect =
    error?.message?.toLowerCase()?.includes("unauthorized") ?? false;

  const { data } = useQuery(PAGINATED_CALLS, {
    variables: {
      offset: (activePage - 1) * paginationState.callsPerPage,
      limit: paginationState.callsPerPage,
    },
  });

  const { totalCount, nodes: paginatedCalls } = data?.paginatedCalls ?? [];

  const { groupedItems, groupedItemsArray } = useFilteredCalls(
    filterState.filter,
    paginatedCalls
  );

  const { handleLogout } = usePageRedirect(shouldRedirect);

  return {
    data,
    paginationDispatch,
    archiveCall,
    totalCount,
    groupedItems,
    groupedItemsArray,
    paginatedCalls,
    handleLogout,
  };
};
