import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../AppRouter/AppRouter";
import { useUserData } from "lib/contexts/UserProvider";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { state } = useUserData();

  if (typeof state?.accessToken === "undefined") {
    return <Navigate to={APP_ROUTES.HOME} replace state={{ from: location }} />;
  }

  return children;
};
