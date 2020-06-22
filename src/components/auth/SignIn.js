import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link, navigate } from "@reach/router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";

import Alert from "../Alert";

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

const SignIn = ({ setLoggedIn, setGroup, setUsername, username }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  const attemptSignIn = async () => {
    try {
      await Auth.signIn(username, password);
      setPassword("");
      let session = await Auth.currentSession();
      let userGroup = session.accessToken.payload[`cognito:groups`][0];
      setLoggedIn(true);
      setGroup(userGroup);
    } catch (error) {
      setSnack(true);
      console.error(error);
    }
  };

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          onChange={(e) => handleName(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) => handlePassword(e)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => attemptSignIn()}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              to="forgot"
              style={{
                textDecoration: "none",
                color: theme.palette.primary.dark,
              }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="userSignUp"
              style={{
                textDecoration: "none",
                color: theme.palette.primary.dark,
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          color="primary"
          className={classes.submit}
          onClick={() => navigate("businessSignUp")}
        >
          Create Business Account
        </Button>
      </div>
      <div className={classes.snack}>
        <Snackbar
          open={snack}
          autoHideDuration={3000}
          onClose={() => {
            handleClose();
          }}
        >
          <Alert severity="error">Invalid username or password.</Alert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default SignIn;
