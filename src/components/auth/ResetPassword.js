import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { navigate } from "@reach/router";

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

const ResetPassword = () => {
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [code, setCode] = useState(null);
  const [password, setPassword] = useState(null);

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handleCode = (e) => {
    setCode(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const resetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, password);
      setUsername(null);
      setCode(null);
      setPassword(null);
      navigate("/");
    } catch (error) {
      setUsername(null);
      setCode(null);
      setPassword(null);
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Enter new password"
            type="password"
            name="password"
            autoFocus
            onChange={(e) => handlePassword(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => resetPassword()}
          >
            Send Code
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
