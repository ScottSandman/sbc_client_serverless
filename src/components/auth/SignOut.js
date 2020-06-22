import React from "react";
import { Auth } from "aws-amplify";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const SignOut = ({ setLoggedIn }) => {
  const classes = useStyles();
  const signOut = async () => {
    try {
      setLoggedIn(false);
      await Auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => signOut()}
        className={classes.button}
        variant="contained"
        color="primary"
        size="small"
        style={{ width: 150 }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
