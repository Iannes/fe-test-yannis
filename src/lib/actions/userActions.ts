import { Action, UserActionType } from "lib/contexts/UserProvider";
import { User } from "types/contexts/AuthContext";

export const setUser = (
  user: User,
  accessToken: string,
  refreshToken: string
): Action => ({
  type: UserActionType.SET_USER,
  payload: {
    user,
    accessToken,
    refreshToken,
  },
});

export const resetUser = (): Action => ({
  type: UserActionType.SET_USER,
  payload: {
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined,
  },
});
