import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link, navigate } from "@reach/router";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

const ForgotPassword = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [username, setUsername] = useState(null);

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const sendReset = async () => {
    try {
      await Auth.forgotPassword(username);
      navigate("resetPassword");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Reset your password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => sendReset()}
          >
            Send Code
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="/"
                variant="body2"
                style={{
                  textDecoration: "none",
                  color: theme.palette.primary.dark,
                }}
              >
                Back to Sign In
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
