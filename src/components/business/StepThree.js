import React from "react";
import TextField from "@material-ui/core/TextField";

const StepThree = ({ setNewBusiness, newBusiness }) => {
  const handleEmail = (e) => {
    newBusiness.contact.email = e.target.value;
  };

  const handlePhoneNumber = (e) => {
    newBusiness.contact.phone = e.target.value;
  };

  const handleSocial = (e) => {
    newBusiness.contact.social[0] = e.target.value;
  };

  return (
    <div>
      <div>
        <TextField
          id="email"
          label="Email"
          type="text"
          variant="outlined"
          onChange={(e) => handleEmail(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="Phone Number"
          label="Phone Number"
          type="text"
          variant="outlined"
          onChange={(e) => handlePhoneNumber(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="Social"
          label="Social"
          type="text"
          variant="outlined"
          onChange={(e) => handleSocial(e)}
          margin="dense"
          require
        />
      </div>
    </div>
  );
};

export default StepThree;
