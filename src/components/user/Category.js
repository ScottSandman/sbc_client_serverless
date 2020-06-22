import React, { useState, useEffect } from "react";
import axios from "axios";
// import socketIOClient from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Ad from "./Ad";

import Retail from "../../assets/city-market-07.jpg";
import Restaurant from "../../assets/JTsandwiches.jpg";
import Farm from "../../assets/farmers-market.jpg";
import Recreation from "../../assets/recreation.jpg";
import Art from "../../assets/art.jpg";
import Technical from "../../assets/technical.jpg";
import Personal from "../../assets/personal.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100vw",
    maxWidth: 900,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 0,
    position: "relative",
  },
  header: {
    color: "white",
    textShadow: "2px 2px black",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100vw",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 0,
    position: "absolute",
    top: 102,
    left: 0,
    textAlign: "left",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    color: "white",
    borderRadius: 0,
    position: "absolute",
    top: 102,
    right: 0,
  },
  expandOpen: {
    transform: "rotate(180deg)",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 0,
    top: 102,
    right: 0,
  },
}));

const Category = ({
  category,
  radius,
  index,
  favorites,
  setFavorites,
  username,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [listAds, setListAds] = useState([]);
  const [update, setUpdate] = useState(false);
  const [location, setLocation] = useState({});
  const [distance, setDistance] = useState("");

  const images = [
    Farm,
    Retail,
    Restaurant,
    Technical,
    Personal,
    Art,
    Recreation,
  ];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ lat: latitude, long: longitude });
    };

    const error = (err) => {
      console.error("There was an error retrieving location data", err);
    };

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(success, error);
    };
    getLocation();
  }, []);

  const filterAdsByRadius = async (ad) => {
    try {
      let lat = location && location.lat;
      let long = location && location.long;
      let response = await axios({
        method: "get",
        url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/businessById?_id=${ad.businessID}`,
      });
      let busLat = response.data.location.latitude;
      let busLong = response.data.location.longitude;
      let distanceBetween = calcDistance(lat, long, busLat, busLong, "M");
      setDistance(distanceBetween.toFixed(1));
      return distanceBetween <= radius;
    } catch (error) {
      console.error(error);
    }
  };

  // function courtesy of GeoDataSource.com
  function calcDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  // function provided by Gabe Rogan via https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise/53508547
  const filter = async (arr, callback) => {
    const fail = Symbol();
    return (
      await Promise.all(
        arr.map(async (item) => ((await callback(item)) ? item : fail))
      )
    ).filter((i) => i !== fail);
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        let response = await axios({
          method: "get",
          url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/adsByCategory?category=${category._id}`,
          header: {
            "Content-Type": "application/json",
          },
        });
        const results = await filter(response.data, filterAdsByRadius);
        setListAds(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAds();
  }, [radius, location, update, category._id]);

  // useEffect(() => {
  //   const socket = socketIOClient("http://localhost:4000");
  //   socket.on("createdAd", () => {
  //     setUpdate(!update);
  //   });
  //   socket.on("deleteAd", () => {
  //     setUpdate(!update);
  //   });
  //   return () => socket.disconnect();
  // }, [listAds]);

  return (
    <Card
      className={classes.root}
      raised={true}
      style={{
        marginTop: 10,
        width: "95vw",
        borderRadius: 12,
      }}
    >
      <CardActions
        disableSpacing
        style={{
          height: 150,
          width: "100%",
          backgroundImage: `url(${images[index]})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          padding: 0,
        }}
      >
        <CardHeader
          title={category.name}
          className={classes.header}
          titleTypographyProps={{ variant: "h5" }}
        ></CardHeader>
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
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        style={{
          // backgroundColor: "lightgrey",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {listAds.map((ad) => {
          return (
            <CardContent key={ad._id}>
              <Ad
                ad={ad}
                favorites={favorites}
                setFavorites={setFavorites}
                username={username}
                distance={distance}
              />
            </CardContent>
          );
        })}
      </Collapse>
    </Card>
  );
};

export default Category;
