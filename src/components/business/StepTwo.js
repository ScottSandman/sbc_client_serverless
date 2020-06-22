import React from "react";
import TextField from "@material-ui/core/TextField";

const StepTwo = ({ setNewBusiness, newBusiness }) => {
  const handleStreetNumber = (e) => {
    newBusiness.contact.address.street_number = e.target.value;
  };

  const handleStreetName = (e) => {
    newBusiness.contact.address.street = e.target.value;
  };

  const handleCity = (e) => {
    newBusiness.contact.address.city = e.target.value;
  };

  const handleState = (e) => {
    newBusiness.contact.address.state = e.target.value;
  };

  const handleZipCode = (e) => {
    newBusiness.contact.address.zipcode = e.target.value;
  };

  return (
    <div>
      <div>
        <TextField
          id="street-number"
          label="Street Number"
          type="text"
          variant="outlined"
          onChange={(e) => handleStreetNumber(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="street name"
          label="Street Name"
          type="text"
          variant="outlined"
          onChange={(e) => handleStreetName(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="city"
          label="City"
          type="text"
          variant="outlined"
          onChange={(e) => handleCity(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="state"
          label="State"
          type="text"
          variant="outlined"
          onChange={(e) => handleState(e)}
          margin="dense"
          required
        />
      </div>
      <div>
        <TextField
          id="zipcode"
          label="Zip Code"
          type="text"
          variant="outlined"
          onChange={(e) => handleZipCode(e)}
          margin="dense"
          required
        />
      </div>
    </div>
  );
};

export default StepTwo;
