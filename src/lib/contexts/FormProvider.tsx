import * as React from "react";
import { ReactFCC } from "types";
import { FormStatus } from "types/Form";

export type Action = {
  type: ActionType;
  payload: FormStatus;
};

type Dispatch = (action: Action) => void;

export type State = {
  status: FormStatus;
};

export enum ActionType {
  SET_FORM_STATUS = "setFormStatus",
}

const initialState = {
  status: FormStatus.Idle,
};

function formReducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SET_FORM_STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

const FormStateContext = React.createContext<
  { state: State; formDispatch: Dispatch } | undefined
>(undefined);

const FormProvider: ReactFCC = ({ children }) => {
  const [state, dispatch] = React.useReducer(formReducer, initialState);

  const value = { state, formDispatch: dispatch };
  return (
    <FormStateContext.Provider value={value}>
      {children}
    </FormStateContext.Provider>
  );
};

function useFormStatus() {
  const context = React.useContext(FormStateContext);

  if (context === undefined) {
    throw new Error("useFormStatus must be used within a FormProvider");
  }

  return context;
}

export { FormProvider, useFormStatus };
