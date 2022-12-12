import * as React from "react";
import { ReactFCC } from "types";

export enum Filters {
  ALL = "all",
  ARCHIVED = "archived",
  ANSWERED = "answered",
  MISSED = "missed",
}

export type Action = {
  type: ActionType;
  payload: Filters;
};

type Dispatch = (action: Action) => void;

export type State = {
  filter: Filters;
};

export enum ActionType {
  SET_FILTER = "setFilter",
  RESET_FILTER = "resetFilter",
}

const initialState = {
  filter: Filters.ALL,
};

function filtersReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case ActionType.RESET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

const FilterStateContext = React.createContext<
  { filterState: State; filterDispatch: Dispatch } | undefined
>(undefined);

const FilterProvider: ReactFCC = ({ children }) => {
  const [state, dispatch] = React.useReducer(filtersReducer, initialState);

  const value = { filterState: state, filterDispatch: dispatch };
  return (
    <FilterStateContext.Provider value={value}>
      {children}
    </FilterStateContext.Provider>
  );
};

function useFilter() {
  const context = React.useContext(FilterStateContext);

  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context;
}

export { FilterProvider, useFilter };
