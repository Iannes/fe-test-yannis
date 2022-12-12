import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { SpinnerOutlined } from "@aircall/tractor";
import { ProtectedRoute } from "../ProtectedRoute";

const Home = React.lazy(() => import("../../../pages/Home"));
const NotFound = React.lazy(() => import("../../../pages/NotFound"));
const ProtectedLayout = React.lazy(() => import("../ProtectedLayout"));

export enum APP_ROUTES {
  HOME = "/",
  LOGIN = "/login",
  CALLS = "/calls",
}

export const AppRouter = () => {
  return (
    <React.Suspense fallback={<SpinnerOutlined />}>
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        <Route
          path={APP_ROUTES.CALLS}
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};
