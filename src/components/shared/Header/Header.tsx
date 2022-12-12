import Cookies from "js-cookie";
import {
  Box,
  Flex,
  Spacer,
  Button,
  LogoutOutlined,
  Icon,
} from "@aircall/tractor";
import { StyledHeader, StyledUserName } from "./Header.styled";
import { Filters } from "components/shared/Filters";

import { useUserData } from "lib/contexts/UserProvider";
import { CookieData } from "types/contexts/AuthContext";
import { usePageRedirect } from "lib/hooks/usePageRedirect";

import logo from "../../../logo.png";
import copy from "copy/user.json";

export const Header = () => {
  const { state } = useUserData();
  const accessToken = Cookies.get(CookieData.ACCESS_TOKEN);
  const shouldRedirect = typeof accessToken === "undefined";
  const { handleLogout } = usePageRedirect(shouldRedirect);

  return (
    <StyledHeader>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxWidth="75%"
        margin="auto"
      >
        <Flex alignItems="center" justifyContent="space-around">
          <img src={logo} alt="Aircall" width="32px" height="32px" />
          <Flex marginLeft={4}>
            <Box marginRight={1}>{copy.welcomeMessage}</Box>
            <StyledUserName>{state?.user?.username ?? ""}</StyledUserName>
          </Flex>
        </Flex>
        <Spacer space="m" alignItems="center">
          <Filters />
          <Button mode="link" onClick={handleLogout}>
            {copy.logoutButtonText}
            <Icon color="green" component={LogoutOutlined} />
          </Button>
        </Spacer>
      </Flex>
    </StyledHeader>
  );
};
