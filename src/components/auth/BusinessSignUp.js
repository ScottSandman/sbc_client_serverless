import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link, navigate } from "@reach/router";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 330,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BusinessSignUp = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [business, setBusiness] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const signUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          "custom:group": "business",
        },
      });
      setPassword(null);
      navigate("businessConfirm", {
        state: {
          username: username,
          business: business,
          category: category,
        },
      });
    } catch (error) {
      setUsername(null);
      setPassword(null);
      setEmail(null);
      console.error("Sign Up Error", error);
    }
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
        setCategoryList(response.data);
      };
      fetchCategoryList();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleName = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleBusiness = (e) => {
    setBusiness(e.target.value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <BusinessCenterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="username"
              variant="outlined"
              required
              fullWidth
              margin="dense"
              id="username"
              label="Username"
              autoFocus
              onChange={(e) => handleName(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => handleEmail(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              id="business_name"
              label="Business Name"
              name="email"
              onChange={(e) => handleBusiness(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => handlePassword(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleChange}
                margin="dense"
                label="Category"
              >
                {categoryList.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          disabled={
            username === null ||
            password === null ||
            email === null ||
            business === null ||
            category === ""
          }
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => signUp()}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link
              to="/"
              variant="body2"
              style={{
                textDecoration: "none",
                color: theme.palette.primary.dark,
              }}
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default BusinessSignUp;
