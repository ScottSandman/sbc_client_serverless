import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import StepZero from "./StepZero";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

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

function getSteps() {
  return [
    "Input Business Name and Description",
    "Select a Category",
    "Input Address Information",
    "Input Contact Details",
    "Upload Business Logo",
    "Review",
  ];
}

const initialState = {
  name: "",
  description: "",
  category: "",
  contact: {
    address: {
      street_number: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    phone: "",
    email: "",
    social: [],
  },
  location: {
    latitude: "",
    longitude: "",
  },
  logo: "",
  radius: "",
  subscription_count: 0,
  ads: [],
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CreateBusiness = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [newBusiness, setNewBusiness] = useState(initialState);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    console.log("newBusiness before submit", newBusiness);
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
      await setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <StepZero setNewBusiness={setNewBusiness} newBusiness={newBusiness} />
        );
      case 1:
        return (
          <StepOne setNewBusiness={setNewBusiness} newBusiness={newBusiness} />
        );
      case 2:
        return (
          <StepTwo setNewBusiness={setNewBusiness} newBusiness={newBusiness} />
        );
      case 3:
        return (
          <StepThree
            setNewBusiness={setNewBusiness}
            newBusiness={newBusiness}
          />
        );
      case 4:
        return "input"; //step4 create a file input component
      case 5:
        return "review";
      default:
        return "Unknown step";
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>{getStepContent(index)}</div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    size="small"
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={
                      newBusiness.name === "" || newBusiness.description === ""
                    }
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    size="small"
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button} size="small">
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            className={classes.button}
            size="small"
          >
            Submit
          </Button>
          <div className={classes.snack}>
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => {
                handleClose();
                navigate("dashboard");
              }}
            >
              <Alert severity="success">
                Business Profile successfully created!
              </Alert>
            </Snackbar>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default CreateBusiness;
