import * as React from "react";
import { ReactFCC } from "types";

export type Action = {
  type: ActionType;
  payload: number;
};

type Dispatch = (action: Action) => void;

export type State = {
  page: number;
  callsPerPage: number;
  totalCount: number;
};

export enum ActionType {
  SET_PAGINATION = "setPagination",
  RESET_PAGINATION = "resetPagination",
  SET_CALLS_PER_PAGE = "setCallsPerPage",
  SET_TOTAL_COUNT = "setTotalCount",
}

const initialState = {
  page: 1,
  callsPerPage: 10,
  totalCount: 0,
};

function paginationReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_PAGINATION: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case ActionType.SET_CALLS_PER_PAGE: {
      return {
        ...state,
        callsPerPage: action.payload,
      };
    }
    case ActionType.SET_TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.payload,
      };
    }
    case ActionType.RESET_PAGINATION: {
      return initialState;
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

const PaginationStateContext = React.createContext<
  { paginationState: State; paginationDispatch: Dispatch } | undefined
>(undefined);

const PaginationProvider: ReactFCC = ({ children }) => {
  const [state, dispatch] = React.useReducer(paginationReducer, initialState);

  const value = { paginationState: state, paginationDispatch: dispatch };
  return (
    <PaginationStateContext.Provider value={value}>
      {children}
    </PaginationStateContext.Provider>
  );
};

function usePagination() {
  const context = React.useContext(PaginationStateContext);

  if (context === undefined) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }

  return context;
}

export { PaginationProvider, usePagination };
