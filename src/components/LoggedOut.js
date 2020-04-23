import React from "react";

export default function LoggedOut({ logInAndOut, loading }) {
  return (
    <div>
      <p>You are {loading ? "..." : "Logged out!"} </p>
      {/* invoke log in by calling the hook function with an "in" parameter */}
      <button onClick={() => logInAndOut("in")}>
        {/* show different button labels depending on the loading state */}
        {loading ? "Loading..." : "Log In"}
      </button>
    </div>
  );
}
