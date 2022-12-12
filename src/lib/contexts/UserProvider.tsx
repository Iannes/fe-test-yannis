import Cookies from "js-cookie";
import { safeJSONParse } from "lib/utils/safeJsonparse";
import * as React from "react";
import { ReactFCC } from "types";
import { CookieData, User } from "types/contexts/AuthContext";

type Payload = {
  user: User | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export type Action = {
  type: UserActionType;
  payload: Payload;
};

type Dispatch = (action: Action) => void;

export type State = {
  user: User | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export enum UserActionType {
  SET_USER = "setUser",
}

const initialState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case UserActionType.SET_USER: {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }

    default: {
      console.error(`Unhandled action type: ${action.type}`);
      return state;
    }
  }
}

const UserStateContext = React.createContext<
  { state: State; userDispatch: Dispatch } | undefined
>(undefined);

const UserProvider: ReactFCC = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);

  React.useEffect(() => {
    const user = Cookies.get("user");
    const accessToken = Cookies.get(CookieData.ACCESS_TOKEN);
    const refreshToken = Cookies.get(CookieData.REFRESH_TOKEN);
    const payload = {
      user: safeJSONParse(user),
      accessToken,
      refreshToken,
    };
    if (user) {
      dispatch({ type: UserActionType.SET_USER, payload });
    }
  }, []);

  const value = { state, userDispatch: dispatch };
  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
};

function useUserData() {
  const context = React.useContext(UserStateContext);

  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }

  return context;
}

export { UserProvider, useUserData };
