import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
// import socketIOClient from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import Ad from "../user/Ad";
import Alert from "../Alert";
import ConfirmDeleteModal from "../business/ConfirmDeleteModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 325,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  snack: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  margin: {
    margin: theme.spacing(1),
  },
  fab: {
    position: "relative",
    bottom: theme.spacing(0),
    right: theme.spacing(-15.5),
    zIndex: 10,
  },
  icon: {
    position: "relative",
    top: theme.spacing(16.5),
    right: theme.spacing(-16.5),
    zIndex: 1,
  },
}));

const BusinessDashboard = ({ username }) => {
  const classes = useStyles();
  const [business, setBusiness] = useState({});
  const [ads, setAds] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleModalOpen = (id) => {
    setId(id);
    setModal(true);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        let response = await axios({
          method: "get",
          url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/business?username=${username}`,
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
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        let response = await axios({
          method: "get",
          url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/adsByBusiness?businessID=${business._id}`,
          header: {
            "Content-Type": "application/json",
          },
        });
        await setAds(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAds();
  }, [business, update]);

  const deleteAd = async (id) => {
    try {
      await axios({
        method: "delete",
        url: "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/ad",
        data: {
          _id: id,
        },
        header: {
          "Content-Type": "application/json",
        },
      });
      // const socket = socketIOClient("http://localhost:4000");
      // await socket.emit("deleteAd");
      await setUpdate(!update);
      setModal(false);
      setOpen(true);
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
        marginBottom: 20,
      }}
    >
      <Card
        className={classes.root}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 20,
        }}
        raised={true}
      >
        <Avatar aria-label="recipe" className={classes.avatar} variant="square">
          <img src={business.logo} alt="logo" />
        </Avatar>
        <Typography>{business.name}</Typography>
        <Typography>{business.description}</Typography>
        <Typography>Likes: {business.subscription_count}</Typography>
        <Tooltip title="create ad" placement="left" disableFocusListener>
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            className={classes.fab}
            onClick={() => navigate("createAd", { state: business })}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Card>
      <div>
        {ads.map((ad) => {
          return (
            <div key={ad._id}>
              <CardContent>
                <IconButton aria-label="add to favorites" style={{ height: 0 }}>
                  <DeleteIcon
                    onClick={() => {
                      handleModalOpen(ad._id);
                    }}
                    color="primary"
                    fontSize="large"
                    className={classes.icon}
                  />
                </IconButton>
                <Ad key={ad._id} ad={ad} />
              </CardContent>
            </div>
          );
        })}
      </div>
      <div className={classes.snack}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => {
            handleClose();
            navigate("/");
          }}
        >
          <Alert severity="success">Ad successfully deleted!</Alert>
        </Snackbar>
      </div>
      <ConfirmDeleteModal
        modal={modal}
        deleteAd={deleteAd}
        id={id}
        setModal={setModal}
      />
    </div>
  );
};

export default BusinessDashboard;
