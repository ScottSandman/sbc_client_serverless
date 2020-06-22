import React from "react";
import TextField from "@material-ui/core/TextField";

const StepZero = ({ setNewBusiness, newBusiness }) => {
  const handleName = (e) => {
    setNewBusiness({ ...newBusiness, name: e.target.value });
  };

  const handleDescription = (e) => {
    setNewBusiness({ ...newBusiness, description: e.target.value });
  };

  return (
    <div>
      <div>
        <TextField
          id="business-name"
          label="Business Name"
          type="text"
          variant="outlined"
          onChange={(e) => handleName(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="business-description"
          label="Business Description"
          type="text"
          variant="outlined"
          onChange={(e) => handleDescription(e)}
          margin="dense"
          required
        />
      </div>
    </div>
  );
};

export default StepZero;
