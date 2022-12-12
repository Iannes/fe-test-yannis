import * as React from "react";
import Cookies from "js-cookie";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ReactFCC } from "types";
import { ApolloProvider } from "@apollo/client";
import { AppRouter } from "components/routing/AppRouter";
import { AuthProvider } from "lib/contexts/AuthProvider";
import { CallsProvider } from "lib/contexts/CallsProvider";
import { FilterProvider } from "lib/contexts/FiltersProvider";
import { FormProvider } from "lib/contexts/FormProvider";
import { PaginationProvider } from "lib/contexts/PaginationProvider";
import { StatusProvider } from "lib/contexts/StatusProvider";
import { UserProvider } from "lib/contexts/UserProvider";
import APOLLO_CLIENT from "lib/gql/client";
import { GlobalAppStyle } from "style/global";

export const MockedOutboundCall: Call = {
  id: "123",
  duration: 59566,
  is_archived: false,
  from: "+33171451698",
  to: "+33128210740",
  direction: "outbound",
  call_type: "missed",
  via: "+33120801106",
  created_at: "2022-12-08T06:52:17.368Z",
  notes: [],
};

export const MockedInboundCall: Call = {
  id: "123",
  duration: 59566,
  is_archived: false,
  from: "+33171451698",
  to: "+33128210740",
  direction: "inbound",
  call_type: "missed",
  via: "+33120801106",
  created_at: "2022-12-09T06:52:17.368Z",
  notes: [],
};

export const mockedUsername = "a-user@mail.com";
export const mockedPassword = "a-password";

export const LoginMockData = {
  access_token: "access_token",
  refresh_token: "refresh_token",
  user: { id: "an-id", username: mockedUsername },
};

export const mockFetch = <T,>(mockData: T) => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  ) as jest.Mock;
};

// Next, use the jest.mock function to mock the Cookies object
jest.mock("js-cookie", () => {
  // Return a mocked version of the Cookies object
  return {
    get: jest.fn(), // Mock the get method
    set: jest.fn(), // Mock the set method
  };
});

// Create a spy for the get method
const getSpy = jest.spyOn(Cookies, "get");

// Create a spy for the set method
const setSpy = jest.spyOn(Cookies, "set");

const AllProviders: ReactFCC = ({ children }) => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

const Wrapper: ReactFCC = ({ children }) => {
  return <AllProviders>{children}</AllProviders>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
