import { useState } from "react";

// this is a custom hook to mimic a network request for login or logout
// read about building your custom components here -> https://reactjs.org/docs/hooks-custom.html
export function useLogin() {
  const [loggedIn, setLoggedIn] = useState(false); // by default the user is logged out
  const [loading, setLoading] = useState(false); // and the loading state is false

  // this is the function to either log in or out
  // depending on the parameter it has been passed
  function logInAndOut(logWhere) {
    setLoading(true); // start loading

    // fake a 2 second lag network call
    // by using a setTimeout that executes a
    // self-invoking anonymous function after 3 seconds
    // read about setTimeout here -> https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
    // and self invoked arrow functions here -> https://flaviocopes.com/javascript-iife/
    setTimeout(() => {
      (() => {
        if (logWhere === "out") {
          setLoggedIn(false); // log out
          setLoading(false); // stop loading
        } else if (logWhere === "in") {
          setLoggedIn(true); // log in
          setLoading(false); // stop loading
        } else {
          setLoading(false);
          throw new console.error(
            "You must pass something when calling the logInAndOut function!"
          );
        }
      })(logWhere);
    }, 2000); // two seconds in milliseconds
  }

  return { loggedIn, loading, logInAndOut };
}
