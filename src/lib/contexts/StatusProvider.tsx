import * as React from "react";
import { ReactFCC } from "types";

export enum AppStatus {
  IDLE = "idle",
  LOADING = "loading",
}

export type Action = {
  type: ActionType;
  payload: boolean;
};

type Dispatch = (action: Action) => void;

export type State = {
  status: AppStatus;
};

export enum ActionType {
  SET_APP_STATUS = "setAppStatus",
}

const initialState = {
  status: AppStatus.IDLE,
};

function statusReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_APP_STATUS: {
      return {
        ...state,
        status: action.payload === true ? AppStatus.LOADING : AppStatus.IDLE,
      };
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

const StatusStateContext = React.createContext<
  { statusState: State; statusDispatch: Dispatch } | undefined
>(undefined);

const StatusProvider: ReactFCC = ({ children }) => {
  const [state, dispatch] = React.useReducer(statusReducer, initialState);

  const value = { statusState: state, statusDispatch: dispatch };
  return (
    <StatusStateContext.Provider value={value}>
      {children}
    </StatusStateContext.Provider>
  );
};

function useAppStatus() {
  const context = React.useContext(StatusStateContext);

  if (context === undefined) {
    throw new Error("useAppStatus must be used within a StatusProvider");
  }

  return context;
}

export { StatusProvider, useAppStatus };
