import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import axios from "axios";

import Categories from "./Categories";
import ProfileDrawer from "./ProfileDrawer";
import Ad from "./Ad";
import Business from "./Business";
import NotFound from "../NotFound";

const UserContent = ({ username, setLoggedIn }) => {
  const [snack, setSnack] = useState(false);
  const [radius, setRadius] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [subscriptions, setSubscriptions] = useState({
    retail: true,
    restaurants: true,
    artandent: true,
    technical: true,
    personal: true,
    farm: true,
    recreation: true,
  });

  useEffect(() => {
    const getUserPreferences = async () => {
      try {
        let result = await axios({
          method: "get",
          url:
            "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/user",
          data: {
            username: username,
          },
          header: {
            "Content-Type": "application/json",
          },
        });
        await setRadius(result.data.radius);
        await setSubscriptions(result.data.subscriptions);
        await setFavorites(result.data.favorites);
      } catch (error) {
        console.error(error);
      }
    };
    getUserPreferences();
  }, [username]);

  return (
    <div className="App">
      <ProfileDrawer
        username={username}
        setLoggedIn={setLoggedIn}
        radius={radius}
        setRadius={setRadius}
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
        setSnack={setSnack}
      />
      <Router>
        <Ad path="ad" />
        <Business path="business" />
        <Categories
          path="/"
          snack={snack}
          setSnack={setSnack}
          radius={radius}
          subscriptions={subscriptions}
          favorites={favorites}
          setFavorites={setFavorites}
          username={username}
        />
        <NotFound default />
      </Router>
    </div>
  );
};

export default UserContent;
