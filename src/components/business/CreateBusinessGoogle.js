import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

import StepZero from "./StepZero";
import StepOne from "./StepOne";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const initialState = {
  name: "",
  description: "",
  category: "",
  contact: {
    address: "",
    phone: "",
    website: "",
    url: "",
  },
  location: {
    latitude: "",
    longitude: "",
  },
  logo: "",
  subscription_count: 0,
  ads: [],
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CreateBusinessGoogle = () => {
  const classes = useStyles();
  const [newBusiness, setNewBusiness] = useState(initialState);
  const [businessName, setBusinessName] = useState("");
  const [open, setOpen] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      let response = await axios({
        method: "post",
        url:
          "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/business",
        data: newBusiness,
        header: {
          "Content-Type": "application/json",
        },
      });
      console.log("did i get an id back", await response);
      await setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleName = (e) => {
    setBusinessName(e.target.value);
  };

  const fetchBusinessData = async (name) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/businessData?name=${name}`,
        header: {
          "Content-Type": "application/json",
        },
      });
      let data = response.data.result;
      setNewBusiness({
        ...newBusiness,
        name: data.name,
        contact: {
          address: data.formatted_address,
          phone: data.formatted_phone_number,
          website: data.website,
          url: data.url,
        },
        location: {
          latitude: data.geometry.location.lat,
          longitude: data.geometry.location.lng,
        },
        logo: data.icon,
        subscription_count: 0,
        ads: [],
      });
      setIsFetched(!isFetched);
    } catch (error) {
      console.error(error);
    }
  };

  return isFetched ? (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.resetContainer}>
        <Typography>All steps completed - you&apos;re finished</Typography>
        <Button
          onClick={handleSubmit}
          className={classes.button}
          size="small"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <div className={classes.snack}>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => {
              handleClose();
              navigate("dashboard", { state: newBusiness });
            }}
          >
            <Alert severity="success">
              Business Profile successfully created!
            </Alert>
          </Snackbar>
        </div>
      </Paper>
    </div>
  ) : (
    <div style={{ margin: 30 }}>
      <div>
        <Typography variant="h6">
          Figure out some text to go here!!!!
        </Typography>
        <TextField
          id="business-name"
          label="Business Name"
          type="text"
          variant="outlined"
          onChange={(e) => handleName(e)}
          margin="dense"
          required
        />
        <StepZero setNewBusiness={setNewBusiness} newBusiness={newBusiness} />
        <StepOne setNewBusiness={setNewBusiness} newBusiness={newBusiness} />
      </div>
      <Button
        onClick={() => fetchBusinessData(businessName)}
        className={classes.button}
        size="small"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </div>
  );
};

export default CreateBusinessGoogle;
