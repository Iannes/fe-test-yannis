import Cookies from "js-cookie";
import { CookieData } from "types/contexts/AuthContext";

const IN_ONE_HOUR = new Date(new Date().getTime() + 60 * 60 * 1000);
const IN_NINE_MINUTES = new Date(new Date().getTime() + 9 * 60 * 1000);

const setAuthCookies = (
  accessToken: string,
  refreshToken: string,
  user: string,
  expires: Date = IN_NINE_MINUTES
) => {
  Cookies.set(CookieData.ACCESS_TOKEN, accessToken, { expires });
  Cookies.set(CookieData.REFRESH_TOKEN, refreshToken, { expires });
  Cookies.set(CookieData.USER, user, { expires: IN_ONE_HOUR });
};

const removeAuthCookies = () => {
  Cookies.remove(CookieData.ACCESS_TOKEN);
  Cookies.remove(CookieData.REFRESH_TOKEN);
  Cookies.remove(CookieData.USER);
};

const cookieService = {
  set: setAuthCookies,
  removeAuthCookies,
};

export default cookieService;
