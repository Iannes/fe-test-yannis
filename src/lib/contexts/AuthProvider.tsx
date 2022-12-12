import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ToastItem, useToast } from "@aircall/tractor";
import { ReactFCC } from "types";
import { APP_ROUTES } from "components/routing/AppRouter/AppRouter";
import { LOGIN_MUTATION, REFRESH_TOKEN_MUTATION } from "lib/gql/mutations";
import cookieService from "lib/services/cookies";
import { useFormStatus } from "./FormProvider";
import { FormStatus } from "types/Form";
import { useUserData } from "./UserProvider";
import { resetUser, setUser } from "lib/actions/userActions";
import { setFormStatus } from "lib/actions/setFormStatus";
import { getUserData } from "lib/utils/getUserData";
import { getCookieExpiration } from "lib/utils/getCookieExpiration";
import { resetFilters } from "lib/actions/filterActions";
import { useFilter } from "./FiltersProvider";
import toastCopy from "copy/toastCopy.json";

const AuthContext = React.createContext<{
  login: (username: string, password: string) => void;
  logout: () => void;
  error: any;
} | null>(null);

const AuthProvider: ReactFCC = ({ children }) => {
  const { showToast } = useToast();
  const [loginUser, { reset }] = useMutation(LOGIN_MUTATION);
  const [fetchRefreshToken, { reset: resetRefreshMutation }] = useMutation(
    REFRESH_TOKEN_MUTATION
  );
  const [error, setError] = useState<any>(null);

  const { formDispatch } = useFormStatus();
  const { state, userDispatch } = useUserData();
  const { filterDispatch } = useFilter();

  const navigate = useNavigate();

  useEffect(() => {
    const NINE_MINUTES = Number(getCookieExpiration(9));
    const ONE_HOUR = getCookieExpiration(60);
    const timeOut = setTimeout(() => {
      fetchRefreshToken({
        onCompleted: (data) => {
          if (data?.refreshTokenV2) {
            const { accessToken, refreshToken, user } = getUserData(
              data.refreshTokenV2
            );
            cookieService.set(
              accessToken,
              refreshToken,
              JSON.stringify(user),
              ONE_HOUR
            );
            userDispatch(setUser(user, accessToken, refreshToken));
          }
          resetRefreshMutation();
        },
        onError: (err) => {
          console.error(`There was an error with the refreshToken: ${err}`);
          showToast(toastCopy.notAuthenticated as ToastItem);
          navigate(APP_ROUTES.HOME);
          resetRefreshMutation();
        },
        variables: { refreshToken: state?.refreshToken },
      });
    }, NINE_MINUTES);
    return () => clearTimeout(timeOut);
  }, [
    fetchRefreshToken,
    formDispatch,
    navigate,
    resetRefreshMutation,
    showToast,
    state?.refreshToken,
    userDispatch,
  ]);

  const handleLogin = (username: string, password: string) => {
    formDispatch(setFormStatus(FormStatus.Pending));
    loginUser({
      onCompleted: (data) => {
        if (data?.login) {
          const { accessToken, refreshToken, user } = getUserData(data.login);
          cookieService.set(accessToken, refreshToken, JSON.stringify(user));
          userDispatch(setUser(user, accessToken, refreshToken));
          formDispatch(setFormStatus(FormStatus.Idle));
        }
      },
      onError: (err) => {
        console.error("In error", err);
        showToast(toastCopy.loginRejected as ToastItem);
        setError(err);
        reset();
      },
      variables: {
        input: {
          username,
          password,
        },
      },
    });
    formDispatch(setFormStatus(FormStatus.Idle));
  };

  const handleLogout = () => {
    cookieService.removeAuthCookies();
    userDispatch(resetUser());
    filterDispatch(resetFilters());
    navigate(APP_ROUTES.HOME, { replace: true });
  };

  const value = {
    login: handleLogin,
    logout: handleLogout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
