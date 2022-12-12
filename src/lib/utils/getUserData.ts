import { User } from "types/contexts/AuthContext";

type LoginData = {
  access_token: string;
  refresh_token: string;
  user: User;
};
export const getUserData = (loginData: LoginData) => {
  const accessToken = loginData?.access_token ?? "";
  const refreshToken = loginData?.refresh_token ?? "";
  const user = loginData?.user ?? "";

  return {
    accessToken,
    refreshToken,
    user,
  };
};
