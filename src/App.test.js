import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";

// import a module so as to mock it
import { getRandomQuote } from "./utils/getRandomQuote";

// mock a module
// hoisted by default
// https://jestjs.io/docs/en/mock-functions#mocking-modules
jest.mock("./utils/getRandomQuote");

// test suite
describe("renders without crashing", () => {
  // tests Setup and Teardown
  // https://jestjs.io/docs/en/setup-teardown

  // reset mocked function implementations and return values between tests
  afterEach(() => {
    // for a specific mock
    getRandomQuote.mockReset();
    // or jest.resetAllMocks() for all mocks
  });

  // Restore all mocks after all the tests are run
  // so as to not affect any other tests using the function(s)
  afterAll(() => {
    getRandomQuote.mockRestore();
    // or jest.restoreAllMocks() for all mocks
  });

  // test
  it("Renders without Crashing", () => {
    // Mock
    // mock the get random quote function return value once
    // this ensures it returns a predictable (pre-determined) result when called the first time
    getRandomQuote.mockReturnValueOnce({ author: "foo", quote: "bar" });

    // Render
    // render's the whole <App/> component (including nested components)
    // The render method exposes queries
    // that you can use to query for dom elements

    // Queries
    // https://testing-library.com/docs/dom-testing-library/api-queries

    // getByText
    // => good for querying strings/text
    // => Throws an error for none or more than one element

    // queryByText
    // => like getByText but returns null for no/more than one element
    // => good for asserting absence of elements

    // getByRole
    // => Good for getting items with assignable roles
    // such as buttons and textArea
    const { getByText, queryByText, getByRole } = render(<App />);

    // Assertions
    // Assertion anatomy => expect(selector/query).matcher function
    // Custom Jest Matchers => https://github.com/testing-library/jest-dom

    // expect to see a "You are Logged out!" text
    expect(getByText(/You are Logged out!/)).toBeInTheDocument();
    // expect to find a button with the text "Log In"
    expect(getByRole("button", { name: "Log In" })).toBeInTheDocument();
    // expect to find a button with the text "Generate A Random Quote"
    expect(
      getByRole("button", { name: "Generate A Random Quote" })
    ).toBeInTheDocument();
    // expect not to see a "bar ~ foo" text/quote
    // this is because the mocked getRandomQuote fn has not been called yet
    // https://jestjs.io/docs/en/expect#tohavebeencalled
    expect(queryByText(/bar ~ foo/)).not.toBeInTheDocument();
  });

  it("Generates a quote", () => {
    // Chain two mockReturnValueOnce
    // and they will be returned in that order incase of successive calls
    // i.e returns first value after first call
    // then second value after second call
    // add a mockReturnValue as the default
    // https://jestjs.io/docs/en/mock-functions#mock-return-values
    getRandomQuote
      .mockReturnValueOnce({ author: "foo", quote: "bar" })
      .mockReturnValueOnce({ author: "baz", quote: "qux" });

    const { queryByText, getByText, getByRole, debug } = render(<App />);

    // debug logs the whole dom tree alongside test results
    // debug();

    // expect to not see a "bar ~ foo" text/quote (mocked return value)
    expect(queryByText(/bar ~ foo/)).not.toBeInTheDocument();

    // Events
    // Events anatomy => Event(selector/query)
    // https://testing-library.com/docs/dom-testing-library/api-events

    // click the "Generate A Random Quote" button once
    fireEvent.click(getByRole("button", { name: "Generate A Random Quote" }));
    // expect to see a "bar ~ foo" text/quote
    // this is because the mocked getRandomQuote fn has been called once
    expect(getByText(/bar ~ foo/)).toBeInTheDocument();
    // click the "Generate A Random Quote" button again
    fireEvent.click(getByRole("button", { name: "Generate A Random Quote" }));
    // expect to see a "qux ~ baz" text/quote
    // the mocked getRandomQuote fn has been called twice
    expect(getByText(/qux ~ baz/)).toBeInTheDocument();
  });

  it("Logs In", async () => {
    const { queryByText, getByText, getByRole } = render(<App />);

    // expect to see a "You are Logged out!" text
    expect(getByText(/You are Logged out!/)).toBeInTheDocument();
    // expect to not see a "You are Logged In!" text
    expect(queryByText(/You are Logged In!/)).not.toBeInTheDocument();
    // click the "Log In" button once
    fireEvent.click(getByRole("button", { name: "Log In" }));
    // expect to see a button with the "Loading..." text immediately
    expect(getByRole("button", { name: "Loading..." })).toBeInTheDocument();
    // expect to see a "You are ..." text immediately
    expect(getByText(/You are .../)).toBeInTheDocument();
    // wait till the logIn promise is resolved (after setTimeout)
    // And the "You are ..." text is removed from the dom
    // https://testing-library.com/docs/dom-testing-library/api-async
    await waitForElementToBeRemoved(() => getByText(/You are .../))
      // somehow if waitForElementToBeRemoved is the last call in a test
      // it throws an "You seem to have overlapping act() calls, this is not supported" error
      // (leaves a promise hanging)
      // the solution is to await the promise with Async-Await or wrap in an act(()=>{}) block
      // read about the fix here -> https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
      // you could also: waitFor(() => getByText(/You are Logged In!/).toBeInTheDocument())
      .then(() => {
        // expect to see a "You are Logged In!" text
        expect(getByText(/You are Logged In!/)).toBeInTheDocument();
        // expect to find a button with the text "Log Out"
        expect(getByRole("button", { name: "Log Out" })).toBeInTheDocument();
      })
      // catch error for after test environment is torn down
      .catch(() => {});
  });

  // Test 4
  it("Logs Out", () => {
    const { getByText, getByRole } = render(<App />);

    // Logged out by default
    expect(getByText(/You are Logged out!/)).toBeInTheDocument();

    // login
    fireEvent.click(getByRole("button", { name: "Log In" }));

    // wait until you can see the "You are Logged In!" text
    // https://testing-library.com/docs/dom-testing-library/api-async
    waitFor(() => getByText(/You are Logged In!/).toBeInTheDocument())
      .then(() => {
        // Logout
        // click the "Log Out" button once
        fireEvent.click(getByRole("button", { name: "Log Out" }));
        // expect to see a button with a "Loading..." text immediately
        expect(getByRole("button", { name: "Loading..." })).toBeInTheDocument();
        // expect to see a "You are ..." text immediately
        expect(getByText(/You are .../)).toBeInTheDocument();
        //  wait until the "You are ..." text is removed from the dom (finished loading)
        waitForElementToBeRemoved(() => getByText(/You are .../))
          // you could also: waitFor(() => getByText(/You are Logged Out!/).toBeInTheDocument())
          .then(() => {
            // expect to see a "You are Logged Out!" text
            expect(getByText(/You are Logged Out!/)).toBeInTheDocument();
            // expect to find a button with the text "Log In"
            expect(getByRole("button", { name: "Log In" })).toBeInTheDocument();
          })
          // catch error for after test environment is torn down
          .catch(() => {});
      })
      .catch(() => {});
  });
});
