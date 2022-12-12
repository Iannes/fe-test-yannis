import { Tractor } from "@aircall/tractor";

import { ApolloProvider } from "@apollo/client/react/context";
import { FormProvider } from "lib/contexts/FormProvider";
import { AuthProvider } from "./lib/contexts/AuthProvider";
import { UserProvider } from "lib/contexts/UserProvider";
import { CallsProvider } from "lib/contexts/CallsProvider";
import { StatusProvider } from "lib/contexts/StatusProvider";
import { FilterProvider } from "lib/contexts/FiltersProvider";
import { PaginationProvider } from "lib/contexts/PaginationProvider";

import APOLLO_CLIENT from "lib/gql/client";

import { AppRouter } from "components/routing/AppRouter";

import { darkTheme } from "./style/theme/darkTheme";
import { GlobalAppStyle } from "./style/global";
import "./App.css";

function App() {
  return (
    <Tractor injectStyle theme={darkTheme}>
      <ApolloProvider client={APOLLO_CLIENT}>
        <StatusProvider>
          <FormProvider>
            <FilterProvider>
              <PaginationProvider>
                <CallsProvider>
                  <UserProvider>
                    <AuthProvider>
                      <AppRouter />
                    </AuthProvider>
                  </UserProvider>
                </CallsProvider>
              </PaginationProvider>
            </FilterProvider>
          </FormProvider>
          <GlobalAppStyle />
        </StatusProvider>
      </ApolloProvider>
    </Tractor>
  );
}

export default App;
