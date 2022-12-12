import * as React from "react";
import { ReactFCC } from "types";
import { CallsPayload } from "types/contexts/CallsContext";

export type Action = {
  type: ActionType;
  payload: CallsPayload;
};

type Dispatch = (action: Action) => void;

export type State = {
  archivedId: any;
};

export enum ActionType {
  ARCHIVE_CALL = "archiveCall",
}

const initialState = {
  archivedId: undefined,
};

function callsReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.ARCHIVE_CALL: {
      return {
        ...state,
        archivedId: action.payload.archivedId,
      };
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

const CallsStateContext = React.createContext<
  { callsState: State; callsDispatch: Dispatch } | undefined
>(undefined);

const CallsProvider: ReactFCC = ({ children }) => {
  const [state, dispatch] = React.useReducer(callsReducer, initialState);

  const value = { callsState: state, callsDispatch: dispatch };
  return (
    <CallsStateContext.Provider value={value}>
      {children}
    </CallsStateContext.Provider>
  );
};

function useCalls() {
  const context = React.useContext(CallsStateContext);

  if (context === undefined) {
    throw new Error("useCalls must be used within a CallsProvider");
  }

  return context;
}

export { CallsProvider, useCalls };
