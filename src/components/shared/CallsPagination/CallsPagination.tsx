import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Flex, Pagination } from "@aircall/tractor";
import { usePagination, ActionType } from "lib/contexts/PaginationProvider";
import { PAGINATED_CALLS } from "lib/gql/queries/paginatedCalls";

export const CallsPagination = () => {
  const { paginationState, paginationDispatch } = usePagination();
  const navigate = useNavigate();

  useQuery(PAGINATED_CALLS, {
    variables: {
      offset: paginationState?.page * paginationState?.callsPerPage,
      limit: paginationState?.callsPerPage,
    },
  });

  const handlePageChange = (page: number) => {
    navigate(`/calls/?page=${page}`);
    paginationDispatch({ type: ActionType.SET_PAGINATION, payload: page });
  };
  const handlePageSizeChange = (page: number) => {
    paginationDispatch({ type: ActionType.SET_CALLS_PER_PAGE, payload: page });
  };

  return (
    <PaginationWrapper>
      <Flex justifyContent="center">
        <Pagination
          activePage={paginationState?.page ?? 0}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={paginationState?.callsPerPage}
          pageSizeOptions={[
            {
              label: "5",
              value: 5,
            },
            {
              label: "10",
              value: 10,
            },
            {
              label: "20",
              value: 20,
            },
          ]}
          recordsTotalCount={paginationState?.totalCount ?? 50}
        />
      </Flex>
    </PaginationWrapper>
  );
};

export const PaginationWrapper = styled.article`
   {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
