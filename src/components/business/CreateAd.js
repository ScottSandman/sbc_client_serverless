import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
// import socketIOClient from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import Business from "../user/Business";
import Alert from "../Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 325,
    marginTop: 20,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  snack: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
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

const CreateAd = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [adTitle, setAdTitle] = useState("Title");
  const [adBrief, setAdBrief] = useState("Brief Description");
  const [adTextColor, setAdTextColor] = useState("blue");
  const [adBackgroundColor, setAdBackgroundColor] = useState("white");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleTitle = (e) => {
    setAdTitle(e.target.value);
  };

  const handleBriefDescription = (e) => {
    setAdBrief(e.target.value);
  };

  const handleTextColor = (e) => {
    setAdTextColor(e.target.value);
  };

  const handleBackgroundColor = (e) => {
    setAdBackgroundColor(e.target.value);
  };

  const createAdOnclick = () => {
    try {
      let ad = {
        title: adTitle,
        brief: adBrief,
        color: adTextColor,
        background: adBackgroundColor,
        category: props.location.state.category,
        businessID: props.location.state._id,
      };
      const createAd = async () => {
        console.log(
          "props.location.state.category",
          props.location.state.category
        );
        await axios({
          method: "post",
          url: "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/ad",
          data: ad,
          header: {
            "Content-Type": "application/json",
          },
        });
        // const socket = socketIOClient("http://localhost:4000");
        // await socket.emit("createAd");
        await setOpen(true);
      };
      createAd();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        className={classes.root}
        style={{ background: adBackgroundColor, color: adTextColor }}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              variant="square"
            >
              <img src={props.location.state.logo} alt="logo" />
            </Avatar>
          }
          action={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton aria-label="add to favorites">
                <Badge badgeContent={1} color="primary">
                  <FavoriteIcon />
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
          title={adTitle}
          subheader={adBrief}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Business business={props.location.state} />
          </CardContent>
        </Collapse>
      </Card>
      <br />
      <div>
        <TextField
          id="title"
          label="Title"
          type="text"
          variant="outlined"
          onChange={(e) => handleTitle(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="brief-description"
          label="Brief Description"
          type="text"
          variant="outlined"
          onChange={(e) => handleBriefDescription(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="text-color"
          label="Text Color"
          type="text"
          variant="outlined"
          onChange={(e) => handleTextColor(e)}
          margin="dense"
        />
      </div>
      <div>
        <TextField
          id="background-color"
          label="Background Color"
          type="text"
          variant="outlined"
          onChange={(e) => handleBackgroundColor(e)}
          margin="dense"
        />
      </div>
      <Button
        disabled={adTitle === "Title" || adBrief === "Brief Description"}
        variant="contained"
        color="primary"
        onClick={() => createAdOnclick()}
        size="small"
        className={classes.button}
      >
        Create Ad
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        size="small"
        className={classes.button}
      >
        Cancel
      </Button>
      <div className={classes.snack}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => {
            handleClose();
            navigate("/");
          }}
        >
          <Alert severity="success">Ad successfully created!</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default CreateAd;
