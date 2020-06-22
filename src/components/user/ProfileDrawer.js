import React, { useState } from "react";
import axios from "axios";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import SignOut from "../auth/SignOut";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 60,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    color: "white",
    textShadow: "2px 2px black",
    marginLeft: 32,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProfileDrawer = ({
  username,
  radius,
  subscriptions,
  setRadius,
  setSubscriptions,
  setLoggedIn,
  setSnack,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSubscriptions({
      ...subscriptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRadius = (e) => {
    console.log("handleRadius", e.target.value);
    setRadius(e.target.value);
  };

  const submitPreferences = async () => {
    try {
      await axios({
        method: "put",
        url: `https://n402wj0i52.execute-api.us-east-1.amazonaws.com/dev/user?username=${username}`,
        data: {
          username: username,
          radius: radius,
          subscriptions: subscriptions,
        },
        header: {
          "Content-Type": "application/json",
        },
      });
      await setSnack(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Small Business Connect
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* <ListItem>Latitude: {location.lat}</ListItem>
          <ListItem>Longitude: {location.long}</ListItem> */}
          <ListItem>Search Radius: {radius}</ListItem>
          <ListItem>
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Radius
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={radius && radius}
                onChange={(e) => handleRadius(e)}
                margin="dense"
                autoWidth={true}
                label="Radius"
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="15">15</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem button>
            <Switch
              checked={subscriptions.retail}
              onChange={handleChange}
              color="primary"
              size="small"
              name="retail"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Retail
          </ListItem>
          <ListItem button>
            <Switch
              checked={subscriptions.restaurants}
              onChange={handleChange}
              color="primary"
              size="small"
              name="restaurants"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Restaurants
          </ListItem>
          <ListItem button>
            <Switch
              checked={subscriptions.artandent}
              onChange={handleChange}
              color="primary"
              size="small"
              name="artandent"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Arts &amp; Entertainment
          </ListItem>
          <ListItem button>
            <Switch
              checked={subscriptions.technical}
              onChange={handleChange}
              color="primary"
              size="small"
              name="technical"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Technical Services
          </ListItem>
          <ListItem button>
            <Switch
              checked={subscriptions.personal}
              onChange={handleChange}
              color="primary"
              size="small"
              name="personal"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Personal Services
          </ListItem>
          <ListItem button>
            <Switch
              checked={subscriptions.farm}
              onChange={handleChange}
              color="primary"
              size="small"
              name="farm"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Farmer's Market
          </ListItem>
          <ListItem button>
            <Switch
              checked={subscriptions.recreation}
              onChange={handleChange}
              color="primary"
              size="small"
              name="recreation"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
            Recreation
          </ListItem>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              submitPreferences();
              handleDrawerClose();
            }}
            size="small"
            className={classes.button}
          >
            Set Preferences
          </Button>
        </List>
        <Divider />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SignOut setLoggedIn={setLoggedIn} />
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileDrawer;
