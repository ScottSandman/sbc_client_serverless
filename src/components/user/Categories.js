import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

import Category from "./Category";
import Alert from "../Alert";

const useStyles = makeStyles((theme) => ({
  snack: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Categories = ({
  snack,
  setSnack,
  radius,
  subscriptions,
  favorites,
  setFavorites,
  username,
}) => {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [slide, setSlide] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  useEffect(() => {
    try {
      const fetchCategoryList = async () => {
        let response = await axios({
          method: "get",
          url:
            "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/categories",
          header: {
            "Content-Type": "application/json",
          },
        });
        await setCategoryList(response.data);
      };
      fetchCategoryList();
      setSlide(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Slide direction="up" in={slide} mountOnEnter unmountOnExit timeout={1000}>
      <header
        className="App-header"
        style={{
          paddingBottom: 10,
          marginTop: 10,
        }}
      >
        {categoryList.map((category, index) =>
          subscriptions[category.tag] ? (
            <Category
              key={category._id}
              category={category}
              radius={radius}
              index={index}
              favorites={favorites}
              setFavorites={setFavorites}
              username={username}
            />
          ) : (
            <></>
          )
        )}
        <div className={classes.snack}>
          <Snackbar
            open={snack}
            autoHideDuration={3000}
            onClose={() => {
              handleClose();
            }}
          >
            <Alert severity="success">Profile updated successfully!</Alert>
          </Snackbar>
        </div>
      </header>
    </Slide>
  );
};

export default Categories;
