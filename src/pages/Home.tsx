import React, { useEffect } from "react";
import {
  Flex,
  Icon,
  LogoMarkMono,
  Spacer,
  ToastItem,
  useToast,
} from "@aircall/tractor";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserData } from "lib/contexts/UserProvider";

import { LoginForm } from "components/shared/LoginForm";
import { APP_ROUTES } from "components/routing/AppRouter/AppRouter";

import toastCopy from "copy/toastCopy.json";

const Home = () => {
  const { state } = useUserData();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof state?.accessToken !== "undefined") {
      showToast(toastCopy.loginSuccess as ToastItem);
      return;
    }
  }, [state.accessToken, navigate, showToast]);

  if (typeof state?.accessToken !== "undefined") {
    return <Navigate to={APP_ROUTES.CALLS} replace />;
  }

  return (
    <div className="home-page-layout">
      <Spacer
        p={5}
        h="100%"
        direction="vertical"
        justifyContent="center"
        fluid
        space={5}
      >
        <Flex alignItems="center">
          <Icon component={LogoMarkMono} size={60} mx="auto" />
        </Flex>
        <LoginForm />
      </Spacer>
    </div>
  );
};

export default Home;
