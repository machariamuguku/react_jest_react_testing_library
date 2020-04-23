import React from "react";

export default function LoggedIn({ logInAndOut, loading }) {
  return (
    <div>
      <p>You are {loading ? "..." : "Logged In!"}</p>
      {/* invoke log out by calling the hook function with an "out" parameter */}
      <button onClick={() => logInAndOut("out")}>
        {/* show different button labels depending on the loading state */}
        {loading ? "Loading..." : "Log Out"}
      </button>
    </div>
  );
}
