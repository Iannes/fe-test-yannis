import { Box, Flex, Grid } from "@aircall/tractor";
import { Header } from "components/shared/Header";
import {
  HeaderContainer,
  CallsListContainer,
  CallsListTitle,
} from "./ProtectedLayout.styled";
import { CallsPagination } from "components/shared/CallsPagination";
import { useFilter } from "lib/contexts/FiltersProvider";

import CallsListPage from "pages/CallsListPage";

export const ProtectedLayout = () => {
  const { filterState } = useFilter();
  return (
    <Box className="protected-layout">
      <Grid rowGap={6}>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Grid
          gridTemplateColumns="auto"
          rowGap={6}
          minH={{
            _: 300,
            md: 400,
            xl: 700,
          }}
        >
          <Box>
            <Flex
              p={3}
              minWidth="100%"
              overflow="scroll"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <CallsListContainer>
                <CallsListTitle>{`${filterState.filter} calls`}</CallsListTitle>
                <CallsListPage />
              </CallsListContainer>
              <CallsPagination />
            </Flex>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
