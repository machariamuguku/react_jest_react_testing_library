import React, { useState } from "react";
import "./App.css";
// import the custom hook
import { useLogin } from "./utils/useLogin";

// import Logged in and Logged out components
import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";

// function that returns a random quote object
// {author:"foo", quote:"bar"}
import { getRandomQuote } from "./utils/getRandomQuote";

function App() {
  const [Quote, setQuote] = useState({});
  // de-structure to get the hook methods and objects
  const { loggedIn, loading, logInAndOut } = useLogin();

  return (
    <div className="App">
      <header className="App-header">
        {/* show the quote if available (object has size > 0) and a blank space if not */}
        <label>
          {Object.keys(Quote).length > 0
            ? `${Quote.quote} ~ ${Quote.author}`
            : ""}
        </label>
        {/* on click get a random quote from the random quote generator and set it to state */}
        <button
          style={{ marginTop: "10px" }}
          onClick={() => {
            // get random quote
            let randomQuote = getRandomQuote();
            // set to state
            setQuote(randomQuote);
          }}
        >
          Generate A Random Quote
        </button>

        {/* if logged in is true show logged in component else show logged out component */}
        {/* Read about the ternary operator here -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator */}
        {loggedIn === true ? (
          <LoggedIn logInAndOut={logInAndOut} loading={loading} />
        ) : (
          <LoggedOut logInAndOut={logInAndOut} loading={loading} />
        )}
      </header>
    </div>
  );
}

export default App;
