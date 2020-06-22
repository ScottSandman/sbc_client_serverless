import React, { useState } from "react";
import { Router } from "@reach/router";

import UserContent from "./components/user/UserContent";
import BusinessContent from "./components/business/BusinessContent";
import SignIn from "./components/auth/SignIn";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import UserSignUp from "./components/auth/UserSignUp";
import ConfirmSignUp from "./components/auth/ConfirmSignUp";
import BusinessSignUp from "./components/auth/BusinessSignUp";
import BusinessConfirmSignUp from "./components/auth/BusinessConfirmSignUp";
import Header from "./components/auth/Header";
import NotFound from "./components/NotFound";

import "./App.css";

const App = () => {
  const [username, setUsername] = useState(null);
  const [group, setGroup] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        group === "business" ? (
          <BusinessContent username={username} setLoggedIn={setLoggedIn} />
        ) : (
          <UserContent username={username} setLoggedIn={setLoggedIn} />
        )
      ) : (
        <>
          <Header />
          <Router>
            <SignIn
              setLoggedIn={setLoggedIn}
              setGroup={setGroup}
              username={username}
              setUsername={setUsername}
              path="/"
            />
            <ForgotPassword path="forgot" />
            <ResetPassword path="resetPassword" />
            <UserSignUp path="userSignUp" />
            <ConfirmSignUp path="confirmSignUp" />
            <BusinessConfirmSignUp path="businessConfirm" />
            <BusinessSignUp path="businessSignUp" />
            <NotFound default />
          </Router>
        </>
      )}
    </div>
  );
};

export default App;
