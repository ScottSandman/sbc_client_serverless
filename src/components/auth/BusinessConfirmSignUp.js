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

const initialState = {
  username: "",
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

const BusinessConfirmSignUp = (props) => {
  const classes = useStyles();
  const [code, setCode] = useState(null);
  const [username, setUsername] = useState(null);
  const [newBusiness, setNewBusiness] = useState(initialState);

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const submitConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code);
      await handleSubmit();
      setUsername(null);
      setCode(null);
      navigate("/");
    } catch (error) {
      setUsername(null);
      setCode(null);
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios({
        method: "post",
        url:
          "https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/business",
        data: newBusiness,
        header: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
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
        username: props.location.state.username,
        name: data.name,
        category: props.location.state.category,
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const businessData = async () => {
      try {
        await fetchBusinessData(props.location.state.business);
      } catch (error) {
        console.error(error);
      }
    };
    businessData();
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
            value={username}
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

export default BusinessConfirmSignUp;
