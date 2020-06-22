import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";
import axios from "axios";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ConfirmSignUp = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [code, setCode] = useState(null);
  const [location, setLocation] = useState({});

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const submitConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code);
      await createUserProfile();
      setUsername(null);
      setCode(null);
      navigate("/");
    } catch (error) {
      setUsername(null);
      setCode(null);
      console.error(error);
    }
  };

  const createUserProfile = async () => {
    try {
      await axios({
        method: "post",
        url: "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/user",
        data: {
          username: username,
          location: {
            latitude: location.lat,
            longitude: location.long,
          },
          radius: "10",
          subscriptions: {
            checkedRetail: true,
            checkedRestaurants: true,
            checkedAandE: true,
            checkedTechnology: true,
            checkedPersonal: true,
            checkedFarmers: true,
            checkedRecreation: true,
          },
        },
        header: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
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

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Confirm Sign Up
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Enter your username"
            name="username"
            autoFocus
            onChange={(e) => handleName(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Enter code"
            name="code"
            autoFocus
            onChange={(e) => handleCode(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => submitConfirmSignUp()}
          >
            Send Code
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ConfirmSignUp;
