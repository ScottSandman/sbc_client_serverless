import React, { useState, useEffect } from "react";
import axios from "axios";
// import socketIOClient from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";

import Business from "./Business";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 325,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Ad = ({ ad, favorites, setFavorites, username, distance }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [business, setBusiness] = useState({});
  const [update, setUpdate] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        let response = await axios({
          method: "get",
          url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/business?_id=${ad.businessID}`,
          header: {
            "Content-Type": "application/json",
          },
        });
        setBusiness(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBusiness();
  }, [update]);

  // useEffect(() => {
  //   const socket = socketIOClient("http://localhost:4000");
  //   socket.on("updateSubscription", () => {
  //     setUpdate(!update);
  //   });
  //   return () => socket.disconnect();
  // }, [business]);

  const updateBusinessSubscription = async () => {
    try {
      await axios({
        method: "put",
        url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/business?_id=${business._id}`,
        data: { subscription_count: business.subscription_count },
        header: {
          "Content-Type": "application/json",
        },
      });
      // const socket = socketIOClient("http://localhost:4000");
      // await socket.emit("updateBusinessSubscription");
    } catch (error) {
      console.error(error);
    }
  };

  const submitFavorites = async () => {
    try {
      await axios({
        method: "put",
        url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/user?username=${username}`,
        data: {
          username: username,
          favorites: [],
        },
        header: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = (arr, id) => {
    const index = arr.indexOf(id);
    if (index > -1) arr.splice(index, 1);
    setFavorites(arr);
  };

  return (
    <Card
      className={classes.root}
      style={{ background: ad.background, color: ad.color, borderRadius: 10 }}
      raised={true}
    >
      <CardHeader
        avatar={
          <Badge
            badgeContent={distance + "mi"}
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Avatar aria-label="ad" className={classes.avatar} variant="square">
              <img src={business.logo} alt="logo" />
            </Avatar>
          </Badge>
        }
        action={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton aria-label="add to favorites">
              <Badge badgeContent={business.subscription_count} color="primary">
                <FavoriteIcon
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    isFavorite
                      ? business.subscription_count--
                      : business.subscription_count++;
                    isFavorite
                      ? removeFavorite(favorites, ad.businessID)
                      : favorites.includes(ad.businessID)
                      ? console.log("in favorites")
                      : setFavorites([...favorites, ad.businessID]);
                    updateBusinessSubscription();
                    submitFavorites();
                  }}
                  style={{
                    color:
                      favorites && favorites.includes(ad.businessID)
                        ? "red"
                        : "grey",
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        }
        title={ad.title}
        subheader={ad.brief}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Business business={business} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Ad;
