import React, { useEffect } from "react";
import { navigate } from "@reach/router";

const NotFound = () => {
  useEffect(() => {
    setTimeout(() => navigate("/"), 5000);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Sorry, you don't have access or that pages doesn't exist</p>
      </div>
    </>
  );
};

export default NotFound;
