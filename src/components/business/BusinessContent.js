import React from "react";
import { Router } from "@reach/router";

import BusinessDrawer from "./BusinessDrawer";
import BusinessDashboard from "./BusinessDashboard";
import CreateBusiness from "./CreateBusiness";
import CreateBusinessGoogle from "./CreateBusinessGoogle";
import CreateAd from "./CreateAd";
import NotFound from "../NotFound";

const BusinessContent = ({ username, setLoggedIn }) => {
  return (
    <div>
      <BusinessDrawer setLoggedIn={setLoggedIn} />
      <Router>
        <BusinessDashboard path="/" username={username} />
        <CreateAd path="createAd" />
        <CreateBusiness path="createBusiness" />
        <CreateBusinessGoogle path="google" />
        <NotFound default />
      </Router>
    </div>
  );
};

export default BusinessContent;
