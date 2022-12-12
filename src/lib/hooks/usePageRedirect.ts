import { useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ToastItem, useToast } from "@aircall/tractor";

import { useAuth } from "lib/contexts/AuthProvider";
import { GET_ME_QUERY } from "lib/gql/queries";
import toastCopy from "copy/toastCopy.json";
import { useNavigate } from "react-router-dom";
import { ActionType, usePagination } from "lib/contexts/PaginationProvider";

export const usePageRedirect = (condition: boolean) => {
  const { paginationDispatch } = usePagination();
  const navigate = useNavigate();
  const auth = useAuth();
  const { showToast } = useToast();
  const { client } = useQuery(GET_ME_QUERY);

  const handleLogout = useCallback(() => {
    client.resetStore();
    auth?.logout();
  }, [auth, client]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (condition) {
        navigate(0);
        paginationDispatch({ type: ActionType.RESET_PAGINATION, payload: 0 });
        handleLogout();
      }
    }, 800);
    condition && showToast(toastCopy.notAuthenticated as ToastItem);

    return () => clearTimeout(timeout);
  }, [condition, handleLogout, navigate, paginationDispatch, showToast]);

  return { handleLogout };
};
