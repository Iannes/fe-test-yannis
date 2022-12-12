export type User = {
  id: string;
  username: string;
  __typename: string;
};

export enum CookieData {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER = "user",
}
